
export const fetchWrapper = async (method, url, body) => {
  const requestOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) {
    requestOptions.body = JSON.stringify(body);
  }
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.jwtToken) {
    const token = storedUser.jwtToken;
    requestOptions.headers['Authorization'] = `Bearer ${token}`;
  }
  console.log('requestOptions', requestOptions);
  return await fetch(url, requestOptions);
};