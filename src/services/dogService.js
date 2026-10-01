import api, { fetchAllPages, unwrap } from './api';

const dogService = {
  getDogById: (id) => unwrap(api.get(`/api/dogs/${id}`)),

  filterDogs: ({ page = 0, pageSize = 12, ...filters } = {}) =>
    unwrap(api.get('/api/dogs/filter', { params: { page, pageSize, ...filters } })),

  filterAllDogs: (filters = {}) =>
    fetchAllPages((page, pageSize) => dogService.filterDogs({ ...filters, page, pageSize })),

  createDog: (dogData) => unwrap(api.post('/api/dogs', dogData)),

  updateDog: (id, dogData) => unwrap(api.put(`/api/dogs/${id}`, dogData)),

  deleteDog: (id) => unwrap(api.delete(`/api/dogs/${id}`)),

  getStats: () => unwrap(api.get('/api/dogs/stats')),
};

export default dogService;
