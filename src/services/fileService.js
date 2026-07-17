import api from './api';

const fileService = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  getFileUrl: (photoUrl) => {
    // photoUrl is already an absolute Cloudinary URL, returned as-is by the backend.
    return photoUrl || null;
  },

  deleteFile: async (fileUrl) => {
    const response = await api.delete('/api/files', { params: { url: fileUrl } });
    return response.data;
  }
};

export default fileService;