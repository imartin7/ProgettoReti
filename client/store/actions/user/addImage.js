import _get             from 'lodash/get';
import { SUCCESS_CODE } from '../../../settings/api';

export const addUserImage = (ctx, variables) => {
  return async (dispatch) => {
    const response = await fetch('http://127.0.0.1:9898/api/user/addImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    });

    const res = JSON.parse(await response.text())

    return res;
  }
}