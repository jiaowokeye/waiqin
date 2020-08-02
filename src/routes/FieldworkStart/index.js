import React, {
  useEffect, useState
} from 'react';
import * as css from './index.module.css';
import { List,Button,DatePicker} from 'antd-mobile';
import Tab from './../../components/tabNav';
import {checkout,visitpartsList} from './../../servers/comp';
const Item = List.Item;
function FieldWork(props) {
  const [locationData, setLocationData] = useState(null);
  const [list, setList] = useState([]);
  const [date,setDate] = useState('');
  const [visitObj,setVisitObj] = useState({
    customer_name:'',
    open_contact: '',
    meetwith: '',
    meetwithName:'',
    activity_id: 0,
    target_desc: '',//目标
    ex_desc: '',//总结
    visit_type: 1,// 拜访类型
    customer_id: ''
  })
  useEffect(() => {
    if(window.visitObj){
      setVisitObj(window.visitObj);
    }
    getLocation();
    getvisitpartsList();
  }, [1])
  // 获取位置
  function getLocation() {
    HWH5.getLocation({ type: 1 }).then(data => {
      setLocationData(data);
      console.log(data.address);
    }).catch(error => {
      console.log('获取位置信息异常', error);
    });
  }
  //跳转地图
  function toMap() {
    const { history } = props;
    window.tab = 0;
    //跳转内部页面并传值
    history.push({
      pathname: '/map/',
    })
  }
  // 获取拜访组件
  function getvisitpartsList(){
    visitpartsList().then((res)=>{
      setList(res.data);
    })
  }
  // 跳转选客户
  async function selectCustomer(){
    window.visitObj = {...visitObj,...{}};
    const { history } = props;
    //跳转内部页面并传值
    history.push({
      pathname: '/selectCustomer/',
    })
  }
  function checkOutRequest(){
    checkout({
      visit_id:2,
      location_lat:locationData.latitude,
      location_lng:locationData.longitude,
      data:'',
      offset:0,
    })
  }
  function clickEvent(type){
    switch(type){
      case '0'://拜访现场
        break;
      case '1'://拜访总结
        break;
      case '2'://指定关联客户
        selectCustomer();
        break;
      case '3'://下次拜访时间
        break;
    }
  }
  return <div className={css.page}>
    <List className="my-list">
      <Item onClick={toMap}>
        <div className={css.address}>
          <div>当前位置</div>
          <div className={css.address_content}>
            <span>定位</span>
            <span className={css.address_content_center}>{locationData ? locationData.address : ''}</span>
            <a onClick={getLocation}>刷新</a>
          </div>
        </div>
      </Item>
    </List>
    <List className="my-list" renderHeader={<div>

    </div>}>
        {
          list.map((e,i)=>{
            return e.parts_content==='3'? <DatePicker
            mode="date"
            value={date}
            onChange={dateStr => setDate(dateStr)}
          >
            <Item arrow="horizontal">{e.menu_name}</Item>
          </DatePicker>:<Item arrow="horizontal" extra={
              <div>
                {
                  e.parts_content==='0'&&<span></span>
                }
                {
                  e.parts_content==='1'&&<span></span>
                }
                {
                  e.parts_content==='2'&&<span>
                    {visitObj.customer_name?visitObj.customer_name:'请选择'}
                  </span>
                }
                {
                  e.parts_content==='3'&&<span></span>
                }
              </div>
            } onClick={()=>clickEvent(e.parts_content)} key={i}>{e.menu_name}</Item>
          })
        }
    
    </List>
    <List className="my-list" style={{marginTop:'50px'}}>
      <Item>
        <Button onClick={()=>checkOutRequest()} type="primary">结束</Button>
       </Item>
    </List>

    
  </div>
}


// let visitTypeList = [
//   {
//     label: '上门（上门跟对方见面）',
//     value: 1
//   },
//   {
//     label: '电话（用电话/网络跟对方联系）',
//     value: 2
//   },
//   {
//     label: '约访（跟对方约到某地点见面）',
//     value: 3
//   }
// ]

function Page (props){
  return <div style={{height:'100%'}}> 
    <Tab tab={0} {...props}>
        <FieldWork {...props}/>
      </Tab>
  </div>
}

export default Page;