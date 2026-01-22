export const API_DOCS_CONSTANT = [
  {
    method: 'POST',
    route: 'api/auth/login/admin',
    description: 'Login Admin',
    body: {
      email: 'shrikant@appristine.in',
      password: 'Test@123',
      device_id: 'string',
      device_type: 'string',
    },
    response: {
      status: 1,
      message: 'Your request is successfully executed',
      data: {
        id: '92',
        email: 'shrikant@appristine.in',
        first_name: 'Shrikant',
        last_name: 'Admin',
        token: '',
      },
    },
  },
  {
    method: 'DELETE',
    route: 'api/auth/user/delete/:user_id',
    description: 'Delete User',
    response: {
      status: 1,
      message: 'User deleted successfully',
    },
  },
];
