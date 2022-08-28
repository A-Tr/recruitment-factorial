export function get(url, token) {
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  if (token) {
    options.headers['x-access-token'] = token;
  }

  return fetch(url, options).then(handleResponse);
}

export function post(url, token, payload) {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  };
  if (token) {
    options.headers['x-access-token'] = token;
  }

  return fetch(url, options).then(handleResponse);
}

function handleResponse(response) {
  return response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
