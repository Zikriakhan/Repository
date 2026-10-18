// Direct Client-Side Cloudinary Upload Utility
// Bypasses Vercel's 4.5MB serverless payload limit for high-definition videos and images.

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env?.VITE_CLOUDINARY_CLOUD_NAME || 'um3irlrh',
  apiKey: import.meta.env?.VITE_CLOUDINARY_API_KEY || '388751712454411',
  apiSecret: import.meta.env?.VITE_CLOUDINARY_API_SECRET || 'xuhXlH3ebiPmlaCiFWdzOWCoqaw',
  videoFolder: 'cheesecake_factory/videos',
  imageFolder: 'cheesecake_factory',
};

/**
 * Computes a Cloudinary SHA-1 signature in the browser using the Web Crypto API
 * @param {Record<string, any>} params - Parameters to sign
 * @param {string} apiSecret - Cloudinary API Secret
 * @returns {Promise<string>} Hexadecimal SHA-1 signature
 */
export async function computeCloudinarySignature(params, apiSecret) {
  const toSign = Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join(',') : v}`)
    .sort()
    .join('&');

  const encoder = new TextEncoder();
  const data = encoder.encode(toSign + apiSecret);
  const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Directly uploads a video or image file to Cloudinary with real-time upload progress.
 * @param {File} file - File object to upload
 * @param {Object} options
 * @param {boolean} [options.isVideo=false] - True if file is a video
 * @param {string} [options.folder] - Custom Cloudinary folder
 * @param {(percent: number) => void} [options.onProgress] - Progress callback (0-100)
 * @returns {Promise<{ secure_url: string, public_id: string, format: string, duration?: number }>}
 */
export async function uploadToCloudinaryDirect(file, { isVideo = false, folder, onProgress } = {}) {
  const isVideoFile = isVideo || file.type?.startsWith('video/') || /\.(mp4|mov|webm|mkv|avi|m4v|ogv)$/i.test(file.name || '');
  const targetFolder = folder || (isVideoFile ? CLOUDINARY_CONFIG.videoFolder : CLOUDINARY_CONFIG.imageFolder);
  const resourceType = isVideoFile ? 'video' : 'image';
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = await computeCloudinarySignature(
    { folder: targetFolder, timestamp },
    CLOUDINARY_CONFIG.apiSecret
  );

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
  formData.append('timestamp', timestamp);
  formData.append('folder', targetFolder);
  formData.append('signature', signature);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`;
    xhr.open('POST', endpoint);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      try {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && response.secure_url) {
          resolve(response);
        } else {
          const errMsg = response.error?.message || `Cloudinary rejected upload with HTTP ${xhr.status}`;
          reject(new Error(errMsg));
        }
      } catch (err) {
        reject(new Error(`Invalid response from Cloudinary (${xhr.status}): ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network connection error while uploading to Cloudinary CDN'));
    xhr.ontimeout = () => reject(new Error('Upload connection to Cloudinary CDN timed out'));
    xhr.send(formData);
  });
}
