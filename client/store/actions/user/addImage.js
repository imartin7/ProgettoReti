import _get             from 'lodash/get';
import { SUCCESS_CODE } from '../../../settings/api';
import { getUserFeed }  from './getFeed';

export const addUserImage = (ctx, variables) => {
  return async (dispatch) => {
    const response = await fetch(ctx.baseUrl+'/api/user/addImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    });

    const res = JSON.parse(await response.text())
    if(_get(res, 'code') === SUCCESS_CODE){
      dispatch(getUserFeed(ctx, {userid:_get(variables, 'id')}))
    }
    return res;
  }
}