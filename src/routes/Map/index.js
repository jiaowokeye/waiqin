import React, { useState, useEffect } from 'react';
import * as css from './index.module.css';
function MapApp(props) {
  const [map, setMap] = useState(null);
  const [locationData,setLocationData]  = useState(null);
  useEffect(()=>{
    getLocation();
    // 设置导航标题
    HWH5.navTitle({ title: '当前位置' });
  },[1])
  function getLocation(){
    HWH5.getLocation({ type: 1 }).then(data => {
      setLocationData(data);
      console.log(data.address);
      const mapObj = new window.AMap.Map('map', {
        zoom: 11,//级别
        center: [data.latitude , data.longitude],//中心点坐标
      });
      setMap(mapObj);
    }).catch(error => {
      console.log('获取位置信息异常', error);
    });
  }
  console.log(map);
  return <div  className={css.App}>
    <div className={css.header}>
      
        {
          locationData?locationData.address:''
        }
    </div>
    <div id='map' className={css.map}></div>
  </div>
}
export default (props) => {
  return <div>
    <div className={css.App}>
      
      <MapApp {...props} />
    </div>
  </div>
}