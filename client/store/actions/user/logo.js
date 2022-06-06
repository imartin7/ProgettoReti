import _get             from 'lodash/get';
import { SUCCESS_CODE } from '../../../settings/api';
import { setUserData }  from './base';

export const setLogo = (ctx, variables) => {
  return async (dispatch) => {
    const response = await fetch('http://127.0.0.1:9898/api/user/setLogo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    });

    const res = JSON.parse(await response.text())
    if(_get(res, 'code') === SUCCESS_CODE){
      dispatch(setUserData(_get(res,'data')))
    } 

    return res;
  }
}