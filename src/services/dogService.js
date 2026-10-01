import api, { unwrap } from './api';

const MAX_PAGE_SIZE = 50;

const dogService = {
  getAllDogs: ({ page = 0, size = 12, sortBy = 'createdAt', sortDir = 'DESC' } = {}) =>
    unwrap(api.get('/api/dogs', { params: { page, size, sortBy, sortDir } })),

  getDogById: (id) => unwrap(api.get(`/api/dogs/${id}`)),

  filterDogs: ({ page = 0, pageSize = 12, ...filters } = {}) =>
    unwrap(api.get('/api/dogs/filter', { params: { page, pageSize, ...filters } })),

  filterAllDogs: async (filters = {}) => {
    const dogs = [];
    for (let page = 0, last = false; !last; page++) {
      const data = await dogService.filterDogs({ ...filters, page, pageSize: MAX_PAGE_SIZE });
      dogs.push(...(data.content ?? []));
      last = data.last ?? true;
    }
    return dogs;
  },

  createDog: (dogData) => unwrap(api.post('/api/dogs', dogData)),

  updateDog: (id, dogData) => unwrap(api.put(`/api/dogs/${id}`, dogData)),

  deleteDog: (id) => unwrap(api.delete(`/api/dogs/${id}`)),

  getStats: () => unwrap(api.get('/api/dogs/stats')),
};

export default dogService;
