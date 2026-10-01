export const REQUEST_ACTIONS = {
  approve: {
    status: 'APPROVED',
    label: 'Approve',
    icon: '✓',
    confirm: {
      title: 'Approve Adoption Request',
      message: 'Are you sure you want to approve this adoption request?',
      confirmText: 'Approve',
      variant: 'info',
    },
  },
  deny: {
    status: 'DENIED',
    label: 'Deny',
    icon: '✕',
    confirm: {
      title: 'Deny Adoption Request',
      message: 'Are you sure you want to deny this adoption request?',
      confirmText: 'Deny',
      variant: 'danger',
    },
  },
  reset: {
    status: 'IN_PROCESS',
    label: 'Reset to In Process',
    icon: '🔄',
    confirm: {
      title: 'Reset to In Process',
      message: 'Are you sure you want to change the status back to in process?',
      confirmText: 'Reset',
      variant: 'warning',
    },
  },
};

const ACTIONS_BY_STATUS = {
  IN_PROCESS: ['deny', 'approve'],
  DENIED: ['reset', 'approve'],
  APPROVED: ['reset', 'deny'],
};

export const getRequestActions = (status) => ACTIONS_BY_STATUS[status] ?? ['reset'];
