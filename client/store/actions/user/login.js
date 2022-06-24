import { SUCCESS_CODE } from '../../../settings/api';
import { setUserData }  from './base';
import _get             from 'lodash/get';

export const login = (ctx, variables) => {
  console.log("LOGIN", ctx);
  return async (dispatch) => {
    const response = await fetch(ctx.baseUrl+'/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    });

    const res = JSON.parse(await response.text());
    
    if(_get(res, 'code') === SUCCESS_CODE){
      dispatch(setUserData(_get(res,'data')))
    } 

    return res;
  }
}