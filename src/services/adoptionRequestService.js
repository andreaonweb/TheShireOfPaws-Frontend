import api, { fetchAllPages, unwrap } from './api';

const adoptionRequestService = {
  getRequestsPage: ({ page = 0, size = 15, sortBy = 'createdAt', sortDir = 'DESC' } = {}) =>
    unwrap(api.get('/api/adoption-requests', { params: { page, size, sortBy, sortDir } })),

  getAllRequests: () =>
    fetchAllPages((page, size) => adoptionRequestService.getRequestsPage({ page, size })),

  getRequestById: (id) => unwrap(api.get(`/api/adoption-requests/${id}`)),

  createRequest: (requestData) => unwrap(api.post('/api/adoption-requests', requestData)),

  updateRequestStatus: (id, status) =>
    unwrap(api.put(`/api/adoption-requests/${id}/status`, { status })),
};

export default adoptionRequestService;
