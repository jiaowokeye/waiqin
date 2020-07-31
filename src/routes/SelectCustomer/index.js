import React, {useEffect ,useState} from 'react';
import * as css from './index.module.css';
import {SearchBar} from 'antd-mobile';
import {customerFind} from './../../servers/comp';
import GetStorage from './../../utils/getStorage';
function SelectCustomer(props) {
  const [loginUserId, setLoginUserId] = useState('');
  const [customer_name, setcustomer_name] = useState('');
  const [customerList,setCustomerList] = useState([]);
  useEffect(()=>{
    async function getUserId() {
      let userId = await GetStorage("userId").then(data => {
        return data;
      })
      setLoginUserId(userId)
    }
    getUserId();
    // 设置导航标题
    HWH5.navTitle({ title: '选对象' });
    find();
  },[1])

  function toAddCustomer(){
    const { history } = props;
    //跳转内部页面并传值
    history.push({
      pathname: '/addCustomer/',
    })
  }
  function find(){
    HWH5.getLocation({ type: 1 }).then(data => {
      console.log(data);
      customerFind({
        currentPage: 1,
        ex_id: 0,
        isGetDefinedInfo: 0,
        customer_name: customer_name,
        data_status: -1,
        order_type: 1,
        extendInfostr: '1,2,5,10,16,17',
        checkin_uid_type: 1,
        user_id: loginUserId,
        lat:data.latitude,			
        lng:data.longitude
      }).then((res)=>{
        setCustomerList(res.data.paginationData)
      });
    }).catch(error => {
      console.log('获取位置信息异常', error);
    });
  }
  async function selectCustomer(e){
    console.log(e);
    console.log(window.visitObj);
    window.visitObj['customer_name'] = e['customer_name'];
    window.visitObj['customer_id'] = e['customer_id'];
    window.visitObj['cs_location_id'] = e['cs_location_id'];
    //跳转内部页面并传值
    window.history.go(-1);
  }
  return <div  className={css.App}>
    <div className={css.header}>
      <span>
        按出勤对象离您远近做了排序
      </span>
      <i onClick={toAddCustomer} className={"icon-nav icon-nav-add "+css.add} ></i>
    </div>
    <div>
      <SearchBar value={customer_name} onChange={(val)=>setcustomer_name(val)} onSubmit={find} placeholder="查找" />
    </div>
    <div className={css.listWrap}>
      {
        customerList.map((e,i)=>{
          return <div className={css.listItem} key={i} onClick={()=>selectCustomer(e)}>
          <div className={css.listLeft}>
            <div className={css.customer}>{e.customer_name}</div>
            <div className={css.address}>{e.address}</div>
            <div className={css.belong}>所属：{e.belong_user_id}</div>
          </div>
          <div className={css.listRight}>
          <div className={css.distance}>{e.distanceMemo}</div>
          </div>
        </div>
        })
      }
    </div>
  </div>
}
export default (props) => {
  return <div>
    <div className={css.App}>
      
      <SelectCustomer {...props} />
    </div>
  </div>
}