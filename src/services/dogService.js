import api from './api';

const dogService = {
  getAllDogs: async (params = {}) => {
    const { page = 0, size = 12, sortBy = 'createdAt', sortDir = 'DESC' } = params;
    const response = await api.get('/api/dogs', {
      params: { page, size, sortBy, sortDir }
    });
    return response.data;
  },

  getDogById: async (id) => {
    const response = await api.get(`/api/dogs/${id}`);
    return response.data;
  },

  filterDogs: async (filters = {}) => {
    const { page = 0, pageSize = 12, ...rest } = filters;
    const response = await api.get('/api/dogs/filter', {
      params: { page, pageSize, ...rest }
    });
    return response.data;
  },

  // All pages of a filter (the backend allows up to 50 per page)
  filterAllDogs: async (filters = {}) => {
    const dogs = [];
    let page = 0;
    let last = false;
    while (!last) {
      const data = await dogService.filterDogs({ ...filters, page, pageSize: 50 });
      dogs.push(...(data.content || []));
      last = data.last ?? true;
      page += 1;
    }
    return dogs;
  },

  createDog: async (dogData) => {
    const response = await api.post('/api/dogs', dogData);
    return response.data;
  },

  updateDog: async (id, dogData) => {
    const response = await api.put(`/api/dogs/${id}`, dogData);
    return response.data;
  },

  deleteDog: async (id) => {
    await api.delete(`/api/dogs/${id}`);
  },

  countByStatus: async (status) => {
    const response = await api.get('/api/dogs/stats/count-by-status', {
      params: { status }
    });
    return response.data;
  }
};

export default dogService;