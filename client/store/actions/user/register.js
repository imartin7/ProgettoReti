
export const register = (ctx, variables) => {
  console.log("VARIABLES ", variables)
  return async (dispatch) => {
    console.log(process.env)
    const response = await fetch('http://127.0.0.1:9898/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    });
    const body = await response.text();
    console.log(response);
    console.log(body);
    return body;
  }
}