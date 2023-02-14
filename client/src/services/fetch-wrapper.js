// export const fetchWrapper = {
//   get: request('GET'),
//   post: request('POST'),
//   put: request('PUT'),
//   delete: request('DELETE'),
// };

export const fetchWrapper = async (method, url, body) => {
  const requestOptions = {
    method,
    credentials: 'include',
    headers: authHeader(url),
  };
  if (body) {
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.body = JSON.stringify(body);
  }
  console.log('requestOptions', requestOptions);
  return await fetch(url, requestOptions);
};

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser.jwtToken) {
    const token = storedUser.jwtToken;
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}
