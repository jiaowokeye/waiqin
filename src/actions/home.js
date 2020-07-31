// import { urls } from '../config/web.config';
export const FETCH_DEMO_INIT = 'FETCH_DEMO_INIT';

export const FETCH_DEMO_SUCCESS = 'FETCH_DEMO_SUCCESS';

export const FETCH_DEMO_FAILURE = 'FETCH_DEMO_FAILURE';

export const fetchDataDemoAction = async () => {
    // Fetch demo
    // console.log('Request url:', urls.getData);
    // const url = `${urls.getData}`;
    // const response = await HWH5.fetch(url).then(res => res
    //   .json()
    //   .then(d => d)
    //   .catch(e => resolve(e)));
    //   return response;
    const response = await new Promise((_resolve) => {
      /* 模拟异步操作成功，这样可以通过fetch调接口获取数据 */
      setTimeout(() => {
        _resolve({ title: 'Hello world!' });
      }, 600);
    });
    return response;
};
