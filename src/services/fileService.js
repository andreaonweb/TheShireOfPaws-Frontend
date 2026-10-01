import api, { unwrap } from './api';

const fileService = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const { fileDownloadUri } = await unwrap(
      api.post('/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    );
    return fileDownloadUri;
  },
};

export default fileService;
