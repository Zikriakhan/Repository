const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype?.startsWith('video/') ||
      /\.(mp4|mov|webm|mkv|avi|m4v|ogv)$/i.test(file.originalname || '');

    if (isVideo) {
      return {
        folder: 'cheesecake_factory/videos',
        resource_type: 'video',
      };
    }

    return {
      folder: 'cheesecake_factory',
      resource_type: 'image',
      allowed_formats: ['jpeg', 'png', 'jpg', 'webp', 'gif', 'svg'],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

const handleUpload = (req, res) => {
  const file = (req.files && req.files[0]) || req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Cloudinary returns the URL in req.file.path or req.file.secure_url
  const fileUrl = file.path || file.secure_url;
  res.status(200).json({
    url: fileUrl,
    secure_url: fileUrl,
    public_id: file.filename,
    mimetype: file.mimetype,
    size: file.size
  });
};

// POST endpoint for file upload (supports image, video, file fields)
router.post('/', (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      console.error('Upload middleware error:', err);
      return res.status(500).json({ message: err.message || 'File upload failed' });
    }
    handleUpload(req, res);
  });
});

// Dedicated POST endpoint for video upload
router.post('/video', (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      console.error('Video upload error:', err);
      return res.status(500).json({ message: err.message || 'Video upload failed' });
    }
    handleUpload(req, res);
  });
});

module.exports = router;
