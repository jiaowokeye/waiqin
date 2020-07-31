


import qs from "qs";
import { Toast } from 'antd-mobile';
import React from 'react';
// import GetStorage from './getStorage';


let pathname = 'https://welink.idaowei.com/core/';
async function Request(url, params){
    let token = '';
    let tokenExpiration = window.tokenExpiration;
    // token过期时间10min  600000ms 
    if (tokenExpiration&&((new Date().getTime() - tokenExpiration) > 600000) ){// 缓存过期 重新请求token
        // 重新获取token
        token = await getToken();
    }else{
        // token = await GetStorage('token').then(data => {
        //     return data;
        // })
        token = window.token;
    }
    return new Promise((resolve, reject) => {
        const _url = pathname+url
        const _headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'welinkToken':token ? token + '200' : ''
        };
        const _params = qs.stringify(Object.assign(
            {
                os: 4,
                rand: Math.random(),
                moduleid: 200,
                ver: '1.0'
            }, params))
            console.log(_params);
        HWH5.fetchInternet(_url, {
            method: 'post',
            body: _params,
            headers: _headers
        }).then(response => {
            window.tokenExpiration = new Date().getTime();
            if (response.status >= 200 && response.status < 300) {
                response.json().then(reply => {
                    console.log(reply)
                    switch (reply.result) {
                        case 998:
                        case 997:
                        case 999:
                            Toast.fail(reply.message, 1);
                            reject({});
                            return
                        case 0:
                            Toast.fail(reply.message, 1);
                            reject({});
                            return 
                        default:
                            resolve(reply);
                            return 
                    }
                });
                
            }else{
                Toast.fail(<div>
                    <div>{response.status}</div>
                    <div>{codeMessage[response.status]}</div>
                </div>, 1);
                const error = new Error(response.statusText);
                error.response = response;
                reject(error)
            }
            
        }).catch(error => {
            console.log('请求异常', error);
        });
    })

}

export default Request;







const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};



async function getToken(){
    // 删除tokenExpiration过期时间
    await HWH5.removeStorage({
        key: 'tokenExpiration',
        isolation: 1
    }).then(data => {
        console.log('tokenExpiration删除成功');
    }).catch(error => {
        console.log('删除缓存失败', error);
    });

    // 删除toenn
    // await HWH5.removeStorage({
    //     key: 'token',
    //     isolation: 1
    // }).then(data => {
    //     console.log('token删除成功');
    // }).catch(error => {
    //     console.log('删除缓存失败', error);
    // });
    // 上面华为的removeStorage没用，用了一个变量
    window.tokenExpiration = '';
    return new Promise((resolve, reject)=>{
        // 获取token
        HWH5.getAuthCode().then(data => {
            Request('welink.do?getToken', {
                code: data.code
            }).then(async (res) => {
                window.tokenExpiration = new Date().getTime();
                // 缓存token
                HWH5.setStorage({
                    key: 'token',
                    data: res.data,
                    isolation: 1
                }).catch(error => {
                    console.log('设置缓存异常', error);
                })
                // 缓存 token过期时间
                // await HWH5.setStorage({
                //     key: 'tokenExpiration',
                //     data: new Date().getTime(),
                //     isolation: 1
                // }).catch(error => {
                //     console.log('设置缓存异常', error);
                // })
                resolve(res.data)
            })
        })
    })
}