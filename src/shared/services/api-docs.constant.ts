export const API_DOCS_CONSTANT = [
  {
    method: 'POST',
    route: 'auth/signup/user',
    description: 'Signup User',
    body: {
      email: 'shrikantmergu1443@gmail.com',
      company: 'Appristine',
      password: 'Shrikant@123',
      user_type: 'employee',
    },
    response: {
      status: 1,
      message: 'Your request is successfully executed',
      data: {
        status: 1,
        message:
          'OTP Sent to your contact, Please complete Signup OTP verification',
        data: {
          id: '8262f39f-9fe9-4f65-a779-11d9a76d11ab',
        },
      },
    },
  },
  {
    method: 'POST',
    route: 'auth/login/admin',
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
    route: 'auth/user/delete/:user_id',
    description: 'Delete User',
    response: {
      status: 1,
      message: 'User deleted successfully',
    },
  },
];
