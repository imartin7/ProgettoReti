
export const register = (ctx, variables) => {
  return async (dispatch) => {
    const response = await fetch(ctx.baseUrl+'/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    });
    
    return JSON.parse(await response.text());
  }
}