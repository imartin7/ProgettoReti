
export const register = (ctx, variables) => {
  return async (dispatch) => {
    const response = await fetch('http://127.0.0.1:9898/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    });
    const body = await response.text();
    return body;
  }
}