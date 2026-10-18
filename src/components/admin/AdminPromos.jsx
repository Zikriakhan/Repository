import React, { useState, useEffect } from 'react';
import { useAdminData, API_URL } from '../../context/AdminDataContext';
import { uploadToCloudinaryDirect } from '../../utils/cloudinaryUpload';
import { Save, Image as ImageIcon, Video, Plus, Trash2, Film, CheckCircle2, Play, ExternalLink } from 'lucide-react';

const PROMO_COMPONENTS = [
  { id: 'Hero', label: 'Hero Section (with Video & Playlist)' },
  { id: 'BrowniePromo', label: 'Classic Italian Pizza Promo' },
  { id: 'PizzaPromo', label: 'Specialty Desserts & Cheesecake Promo' },
  { id: 'FriedMacCheesePromo', label: 'Fried Mac & Cheese Promo' },
  { id: 'FreshlyPrepared', label: 'Freshly Prepared' },
];

const DEFAULT_HERO_PLAYLIST = [
  {
    id: 1,
    label: 'Clip 1',
    name: 'Artisan Wood-Fired Oven',
    src: 'https://res.cloudinary.com/um3irlrh/video/upload/v1792044052/Screen_Recording_10-15-2026_10-37-29_AM_yijxxi_audbr6.mp4'
  }
];

export default function AdminPromos() {
  const { data, updatePromo } = useAdminData();
  const [activeTab, setActiveTab] = useState(PROMO_COMPONENTS[0].id);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingClipIndex, setUploadingClipIndex] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Find the promo data or use defaults
  const currentPromo = data.promos?.find(p => p.name === activeTab) || {};

  const [formData, setFormData] = useState({
    title: currentPromo.title || '',
    subtitle: currentPromo.subtitle || '',
    description: currentPromo.description || '',
    imageUrl: currentPromo.imageUrl || '',
    videoUrl: currentPromo.videoUrl || '',
    playlist: (Array.isArray(currentPromo.playlist) && currentPromo.playlist.length > 0)
      ? currentPromo.playlist
      : (activeTab === 'Hero' ? DEFAULT_HERO_PLAYLIST : []),
    price: currentPromo.price || '',
    buttonText: currentPromo.buttonText || '',
    buttonLink: currentPromo.buttonLink || '',
  });

  // Update formData when switching tabs or when backend data is loaded
  useEffect(() => {
    const promo = data.promos?.find(p => p.name === activeTab) || {};
    setFormData({
      title: promo.title || '',
      subtitle: promo.subtitle || '',
      description: promo.description || '',
      imageUrl: promo.imageUrl || '',
      videoUrl: promo.videoUrl || (activeTab === 'Hero' ? DEFAULT_HERO_PLAYLIST[0].src : ''),
      playlist: (Array.isArray(promo.playlist) && promo.playlist.length > 0)
        ? promo.playlist
        : (activeTab === 'Hero' ? DEFAULT_HERO_PLAYLIST : []),
      price: promo.price || '',
      buttonText: promo.buttonText || '',
      buttonLink: promo.buttonLink || '',
    });
    setFeedback(null);
  }, [activeTab, data.promos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainVideoChange = (e) => {
    const url = e.target.value;
    setFormData(prev => {
      const updatedPlaylist = [...(prev.playlist || [])];
      if (updatedPlaylist.length > 0) {
        updatedPlaylist[0] = { ...updatedPlaylist[0], src: url };
      } else {
        updatedPlaylist.push({
          id: 1,
          label: 'Clip 1',
          name: 'Main Video',
          src: url
        });
      }
      return {
        ...prev,
        videoUrl: url,
        playlist: updatedPlaylist
      };
    });
  };

  const handlePlaylistChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...(prev.playlist || [])];
      updated[index] = { ...updated[index], [field]: value };
      const nextState = { ...prev, playlist: updated };
      if (index === 0 && field === 'src') {
        nextState.videoUrl = value;
      }
      return nextState;
    });
  };

  const handleAddClip = () => {
    const nextIdx = (formData.playlist?.length || 0) + 1;
    const newClip = {
      id: Date.now(),
      label: `Clip ${nextIdx}`,
      name: `Artisan Scene ${nextIdx}`,
      src: ''
    };
    setFormData(prev => ({
      ...prev,
      playlist: [...(prev.playlist || []), newClip]
    }));
  };

  const handleRemoveClip = (index) => {
    if ((formData.playlist || []).length <= 1) {
      if (!window.confirm('Removing all clips will leave the hero without a sequence. Continue?')) {
        return;
      }
    }
    setFormData(prev => ({
      ...prev,
      playlist: prev.playlist.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadProgress(0);

    try {
      // Direct signed Cloudinary upload (bypasses serverless payload limit)
      const result = await uploadToCloudinaryDirect(file, {
        isVideo: false,
        onProgress: (percent) => setUploadProgress(percent),
      });

      if (result.secure_url) {
        setFormData(prev => ({ ...prev, imageUrl: result.secure_url }));
        setFeedback({ type: 'success', message: 'Image uploaded to Cloudinary successfully!' });
      }
    } catch (err) {
      console.warn('Direct Cloudinary image upload failed, attempting fallback API:', err.message);
      try {
        const uploadData = new FormData();
        uploadData.append('image', file);
        const res = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          body: uploadData,
        });
        const resData = await res.json();
        if (resData.url) {
          setFormData(prev => ({ ...prev, imageUrl: resData.url }));
          setFeedback({ type: 'success', message: 'Image uploaded via fallback server successfully!' });
          return;
        }
      } catch (fallbackErr) {
        // Fallback also failed
      }
      alert('Image upload failed: ' + err.message);
      setFeedback({ type: 'error', message: 'Image upload failed: ' + err.message });
    } finally {
      setUploadingImage(false);
      setUploadProgress(0);
      e.target.value = '';
    }
  };

  const handleVideoUpload = async (e, clipIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;

    if (clipIndex !== null) {
      setUploadingClipIndex(clipIndex);
    } else {
      setUploadingVideo(true);
    }
    setUploadProgress(0);

    try {
      // Direct signed Cloudinary upload: handles large HD videos directly without 4.5MB Vercel limit!
      const result = await uploadToCloudinaryDirect(file, {
        isVideo: true,
        onProgress: (percent) => setUploadProgress(percent),
      });

      if (result.secure_url) {
        if (clipIndex !== null) {
          handlePlaylistChange(clipIndex, 'src', result.secure_url);
          if (clipIndex === 0) {
            setFormData(prev => ({ ...prev, videoUrl: result.secure_url }));
          }
          setFeedback({ type: 'success', message: `Clip #${clipIndex + 1} video uploaded to Cloudinary successfully!` });
        } else {
          setFormData(prev => {
            const updatedPlaylist = [...(prev.playlist || [])];
            if (updatedPlaylist.length > 0) {
              updatedPlaylist[0] = { ...updatedPlaylist[0], src: result.secure_url };
            } else {
              updatedPlaylist.push({
                id: 1,
                label: 'Clip 1',
                name: 'Main Video',
                src: result.secure_url
              });
            }
            return {
              ...prev,
              videoUrl: result.secure_url,
              playlist: updatedPlaylist
            };
          });
          setFeedback({ type: 'success', message: 'Main Hero video uploaded to Cloudinary successfully!' });
        }
      }
    } catch (err) {
      console.warn('Direct Cloudinary video upload failed, attempting fallback API:', err.message);
      try {
        const uploadData = new FormData();
        uploadData.append('video', file);
        const res = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          body: uploadData,
        });
        const resData = await res.json();
        if (resData.url) {
          if (clipIndex !== null) {
            handlePlaylistChange(clipIndex, 'src', resData.url);
            if (clipIndex === 0) {
              setFormData(prev => ({ ...prev, videoUrl: resData.url }));
            }
          } else {
            setFormData(prev => {
              const updatedPlaylist = [...(prev.playlist || [])];
              if (updatedPlaylist.length > 0) {
                updatedPlaylist[0] = { ...updatedPlaylist[0], src: resData.url };
              } else {
                updatedPlaylist.push({
                  id: 1,
                  label: 'Clip 1',
                  name: 'Main Video',
                  src: resData.url
                });
              }
              return {
                ...prev,
                videoUrl: resData.url,
                playlist: updatedPlaylist
              };
            });
          }
          setFeedback({ type: 'success', message: 'Video uploaded via server successfully!' });
          return;
        }
      } catch (fallbackErr) {
        // Fallback also failed
      }
      alert('Video upload to Cloudinary failed: ' + err.message);
      setFeedback({ type: 'error', message: 'Video upload failed: ' + err.message });
    } finally {
      if (clipIndex !== null) {
        setUploadingClipIndex(null);
      } else {
        setUploadingVideo(false);
      }
      setUploadProgress(0);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    // If activeTab is Hero, ensure primary videoUrl syncs with first playlist clip
    const payload = { ...formData };
    if (activeTab === 'Hero') {
      if (payload.videoUrl) {
        if (!payload.playlist || payload.playlist.length === 0) {
          payload.playlist = [{ id: 1, label: 'Clip 1', name: payload.title || 'Artisan Wood-Fired Oven', src: payload.videoUrl }];
        } else {
          const nextPlaylist = [...payload.playlist];
          nextPlaylist[0] = { ...nextPlaylist[0], src: payload.videoUrl };
          payload.playlist = nextPlaylist;
        }
      } else if (payload.playlist?.[0]?.src) {
        payload.videoUrl = payload.playlist[0].src;
      }
    }

    const result = await updatePromo(activeTab, payload);
    setSaving(false);

    if (result?.success !== false) {
      setFeedback({ type: 'success', message: 'Promo section updated & synced with API successfully!' });
    } else {
      setFeedback({ type: 'error', message: 'Saved locally. Backend sync issue: ' + (result?.error || 'Unknown error') });
    }
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 16px 40px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 800, color: '#1a0a10', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Home Page Promos &amp; Video Manager</span>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#eef2ff', color: '#4338ca', letterSpacing: '0.05em' }}>
            API READY
          </span>
        </h1>
        <p style={{ margin: 0, color: '#666', fontSize: '15px' }}>
          Manage your homepage promotional banners, hero background video, and Cloudinary video playlists directly connected to the backend API.
        </p>
      </div>

      {feedback && (
        <div style={{
          padding: '14px 20px',
          borderRadius: '10px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '14px',
          fontWeight: 600,
          background: feedback.type === 'success' ? '#f0fdf4' : '#fef2f2',
          border: feedback.type === 'success' ? '1px solid #bbf7d0' : '1px solid #fecaca',
          color: feedback.type === 'success' ? '#166534' : '#991b1b',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <CheckCircle2 size={18} />
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', overflowX: 'auto', paddingBottom: '8px' }}>
        {PROMO_COMPONENTS.map(comp => {
          const isActive = activeTab === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => setActiveTab(comp.id)}
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                border: isActive ? '1px solid #92141f' : '1px solid #e5e7eb',
                background: isActive ? '#92141f' : '#fff',
                color: isActive ? '#fff' : '#374151',
                fontWeight: isActive ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 14px rgba(146, 20, 31, 0.25)' : '0 2px 4px rgba(0,0,0,0.02)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {comp.id === 'Hero' && <Video size={16} />}
              {comp.label}
            </button>
          );
        })}
      </div>

      {/* Edit Form */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 800, color: '#1a0a10' }}>
              Edit {PROMO_COMPONENTS.find(c => c.id === activeTab)?.label}
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>
              Changes are saved to the MongoDB backend database and updated in real-time.
            </p>
          </div>
          <span style={{ fontSize: '12px', color: '#999', background: '#f8fafc', padding: '4px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontFamily: 'monospace' }}>
            ID: {activeTab}
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>

          {/* Titles & Headlines */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>Main Title / Headline</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={activeTab === 'Hero' ? 'Welcome To Italian Pizza Kawkab' : 'e.g. Super Supreme Pizza'}
                style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>Subtitle / Highlight Badge</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="e.g. Over 26 Years of Tradition"
                style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>Description Content</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter promotional or story description..."
              style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          {/* ============================================================== */}
          {/* HERO VIDEO & PLAYLIST SECTION (Specific to Hero) */}
          {/* ============================================================== */}
          {activeTab === 'Hero' && (
            <div style={{
              background: '#0d0f17',
              borderRadius: '16px',
              padding: '24px',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #c69214, #eab308)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                    <Film size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#fff' }}>
                      Hero Background Video &amp; Cloudinary Playlist
                    </h3>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                      Upload videos directly to Cloudinary or paste direct Cloudinary video links. Multiple clips will play in seamless sequence!
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddClip}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: '#c69214',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                  }}
                >
                  <Plus size={16} /> Add Video Clip
                </button>
              </div>

              {/* Main Video URL & Quick Upload */}
              <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Video size={14} color="#f59e0b" /> Primary Video URL (Cloudinary Link or Direct MP4)
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleMainVideoChange}
                    placeholder="https://res.cloudinary.com/um3irlrh/video/upload/...mp4"
                    style={{
                      flex: 1,
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: 'rgba(0,0,0,0.4)',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <label style={{
                    cursor: uploadingVideo ? 'not-allowed' : 'pointer',
                    padding: '11px 18px',
                    background: uploadingVideo ? '#475569' : '#1e293b',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap'
                  }}>
                    <Video size={15} />
                    {uploadingVideo ? `Uploading (${uploadProgress}%)` : 'Upload Video'}
                    <input
                      type="file"
                      accept="video/*,.mp4,.mov,.webm,.mkv"
                      onChange={(e) => handleVideoUpload(e, null)}
                      style={{ display: 'none' }}
                      disabled={uploadingVideo}
                    />
                  </label>
                </div>

                {uploadingVideo && (
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#f59e0b', marginBottom: '4px', fontWeight: 700 }}>
                      <span>Uploading directly to Cloudinary CDN...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'linear-gradient(90deg, #c69214, #fbbf24)', transition: 'width 0.2s ease-out' }} />
                    </div>
                  </div>
                )}

                {formData.videoUrl && (
                  <div style={{ marginTop: '14px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '220px', height: '124px', borderRadius: '8px', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.2)' }}>
                      <video
                        src={formData.videoUrl}
                        controls
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontWeight: 700, marginBottom: '6px' }}>
                        Active Primary Stream
                      </span>
                      <p style={{ margin: 0, wordBreak: 'break-all', maxWidth: '400px' }}>
                        {formData.videoUrl}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Playlist Clips Sequence */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Sequential Hero Video Playlist (HERO_PLAYLIST)</span>
                    <span style={{ fontSize: '11px', padding: '1px 7px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', color: '#e2e8f0' }}>
                      {formData.playlist?.length || 0} {formData.playlist?.length === 1 ? 'Clip' : 'Clips'}
                    </span>
                  </label>
                </div>

                {(!formData.playlist || formData.playlist.length === 0) ? (
                  <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.15)' }}>
                    <p style={{ margin: '0 0 12px', color: '#94a3b8', fontSize: '13px' }}>
                      No sequence clips currently configured. Click below to add your first video clip!
                    </p>
                    <button
                      type="button"
                      onClick={handleAddClip}
                      style={{ padding: '8px 16px', background: '#c69214', color: '#000', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      + Add First Clip
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {formData.playlist.map((clip, index) => {
                      const isUploadingThis = uploadingClipIndex === index;
                      return (
                        <div
                          key={clip.id || index}
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '1px solid rgba(255,255,255,0.08)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#c69214', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>
                                {index + 1}
                              </span>
                              <span style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>
                                {clip.label || `Clip ${index + 1}`}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveClip(index)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: 'transparent',
                                border: 'none',
                                color: '#f87171',
                                fontSize: '12px',
                                cursor: 'pointer',
                                padding: '4px 8px',
                                borderRadius: '6px'
                              }}
                              title="Delete this clip"
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                              <label style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Clip Badge Label</label>
                              <input
                                type="text"
                                value={clip.label || ''}
                                onChange={(e) => handlePlaylistChange(index, 'label', e.target.value)}
                                placeholder="e.g. Clip 1"
                                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '13px' }}
                              />
                            </div>
                            <div>
                              <label style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Clip Name / Caption</label>
                              <input
                                type="text"
                                value={clip.name || ''}
                                onChange={(e) => handlePlaylistChange(index, 'name', e.target.value)}
                                placeholder="e.g. Artisan Wood-Fired Oven"
                                style={{ width: '100%', boxSizing: 'border-box', padding: '9px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '13px' }}
                              />
                            </div>
                          </div>

                          <div>
                            <label style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Video Source URL (Cloudinary Link)</label>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <input
                                type="text"
                                value={clip.src || ''}
                                onChange={(e) => handlePlaylistChange(index, 'src', e.target.value)}
                                placeholder="https://res.cloudinary.com/um3irlrh/video/upload/...mp4"
                                style={{ flex: 1, padding: '9px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '13px' }}
                              />
                              <label style={{
                                cursor: isUploadingThis ? 'not-allowed' : 'pointer',
                                padding: '9px 14px',
                                background: isUploadingThis ? '#475569' : '#334155',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#f8fafc',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                whiteSpace: 'nowrap'
                              }}>
                                <Video size={14} />
                                {isUploadingThis ? `Uploading (${uploadProgress}%)` : 'Upload Clip'}
                                <input
                                  type="file"
                                  accept="video/*,.mp4,.mov,.webm,.mkv"
                                  onChange={(e) => handleVideoUpload(e, index)}
                                  style={{ display: 'none' }}
                                  disabled={isUploadingThis}
                                />
                              </label>
                            </div>

                            {isUploadingThis && (
                              <div style={{ marginTop: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#f59e0b', marginBottom: '4px', fontWeight: 700 }}>
                                  <span>Uploading clip directly to Cloudinary...</span>
                                  <span>{uploadProgress}%</span>
                                </div>
                                <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                  <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'linear-gradient(90deg, #c69214, #fbbf24)', transition: 'width 0.2s ease-out' }} />
                                </div>
                              </div>
                            )}
                          </div>

                          {clip.src && (
                            <div style={{ marginTop: '10px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <div style={{ width: '160px', height: '90px', borderRadius: '6px', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.15)' }}>
                                <video
                                  src={clip.src}
                                  controls
                                  muted
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </div>
                              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                                Previewing Clip #{index + 1}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Image & Price Fields for Promos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Main Image URL & Upload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ImageIcon size={16} /> Main Banner Image URL
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px' }}
                />
                <label style={{
                  cursor: uploadingImage ? 'not-allowed' : 'pointer',
                  padding: '12px 18px',
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}>
                  {uploadingImage ? `Uploading (${uploadProgress}%)` : 'Upload Image'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploadingImage} />
                </label>
              </div>

              {uploadingImage && (
                <div style={{ marginTop: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#92141f', marginBottom: '4px', fontWeight: 700 }}>
                    <span>Uploading image...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${uploadProgress}%`, height: '100%', background: '#92141f', transition: 'width 0.2s ease-out' }} />
                  </div>
                </div>
              )}

              {formData.imageUrl && (
                <div style={{ marginTop: '12px', borderRadius: '10px', overflow: 'hidden', height: '160px', background: '#f5f5f5', border: '1px solid #e5e7eb' }}>
                  <img src={formData.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>

            {/* Price & CTA Button Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>Price (AED)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 35.00"
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>Button Text</label>
                  <input
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleChange}
                    placeholder="e.g. Order Now"
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>Button Link</label>
                  <input
                    type="text"
                    name="buttonLink"
                    value={formData.buttonLink}
                    onChange={handleChange}
                    placeholder="e.g. /menu"
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f3f4f6', paddingTop: '20px' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 32px',
                background: '#92141f',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1,
                boxShadow: '0 4px 16px rgba(146,20,31,0.25)',
                transition: 'all 0.2s'
              }}
            >
              <Save size={18} />
              {saving ? 'Saving Changes to API...' : 'Save & Publish Promo Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
