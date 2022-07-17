import _get             from 'lodash/get';
import { SUCCESS_CODE } from '../../../settings/api';

export const sendUserMessage = (ctx, variables) => {
  return async (dispatch) => {
    const response = await fetch(ctx.baseUrl+'/api/user/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  }
}