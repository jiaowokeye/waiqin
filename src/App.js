// 请勿修改此文件
import React, { useEffect, useReducer, useState } from "react";
import createHistory from "history/createHashHistory";
import reducer, { initialState } from './reducers/global';
/*
 全局导入less
 */
import "./app.css";
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import { getUserData, GLOBAL_USER_DATA } from "./actions/global";
import routes from "./routes";
import AppContext from './AppContext';
import Request from './utils/request'
import {verify} from './servers/index'
const { Route, Router } = require("react-router-dom");
const history = createHistory();


export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isHasToken,setHasToken] = useState(false);
  
  useEffect(() => {
    HWH5.clearStorage().then((data) => {
      
    }).catch((error) => {
      console.log('清理本地H5缓存    ', error);
    });
    HWH5.showLoading();
    HWH5.getAuthCode().then(data => {
      // 获取token
      Request('welink.do?getToken', {
        code: data.code
      }).then((res) => {
        // 缓存token
        HWH5.setStorage({
          key: 'token',
          data: res.data,
          isolation: 1
        }).catch(error => {
          console.log('设置缓存异常', error);
        })
        // 缓存 token过期时间
        // HWH5.setStorage({
        //   key: 'tokenExpiration',
        //   data: new Date().getTime(),
        //   isolation: 1
        // }).catch(error => {
        //   console.log('设置缓存异常', error);
        // })
        // 华为的 删除缓存方法有问题 先用window 变量保存
        window.tokenExpiration = new Date().getTime();
        window.token = res.data;
        HWH5.hideLoading();
        verify({}).then((res)=>{
          window.userId = res.data.user_id;
          HWH5.setStorage({
            key: 'userId',
            data: res.data.user_id,
            isolation: 1
          }).catch(error => {
            console.log('设置缓存异常', error);
          })
          setHasToken(true);
          HWH5.hideLoading();
        });
        Request('comp/user.do?param', {
        }).then((res) => {
          HWH5.setStorage({
            key: 'headPhotoPath',
            data: res.data.head_photo_path,
            isolation: 1
          }).catch(error => {
            console.log('设置缓存异常', error);
          })
        });
      });
    })
    let ignore = false;
    // 单页面一开始，可在这里添加全局信息，如用户等等。
    getUserData().then((payload)=> {
      if (!ignore) {
        dispatch({ type: GLOBAL_USER_DATA, payload});
      }
    });

    // console.log("监听页面返回事件");
    const backFunction = () => {
      // 监听页面返回事件，return true直接返回，return false，拒绝返回。只支持安卓
      const flag = true;
      return flag;
    }
    window.HWH5.addEventListener({
      type: "back",
      func: backFunction
    });

    return ()=> {
      // 组件销毁事件
      ignore = true;
      window.HWH5.removeEventListener({ type: 'back', func: backFunction });
    };
  }, []);
  // 等待全局status处理好，再渲染。（可根据需要修复）
  if (state.userInfo === null) {
    return null;
  }
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {
        isHasToken?<Router history={history}>
        <Route
          render={() =>
            routes.map(route => {
              const { path, location, exact = true, component: C } = route;
              return (
                <Route
                  key={path}
                  location={location}
                  path={path}
                  exact={exact}
                  component={C}
                />
              );
            })
          }
        />
      </Router>:<span></span>
      }
      
    </AppContext.Provider>
  );
}
