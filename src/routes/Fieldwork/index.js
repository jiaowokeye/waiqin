import React, {
  useEffect, useState
} from 'react';
import * as css from './index.module.css';
import { List, Picker, Button} from 'antd-mobile';
import {codeitemList} from './../../servers/sys';
import {visitAdd} from './../../servers/comp';
import Tab from './../../components/tabNav';
const Item = List.Item;
function FieldWork(props) {
  const [locationData, setLocationData] = useState(null);
  const [activityList, setActivityList] = useState([]);
  const [summary, setSummary] = useState(null);
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
    if(window.nowVisitObj){
      const { history } = props;
      //跳转内部页面并传值
      history.push({
        pathname: '/fieldWorkStart/',
      })
    }
    if(window.Summary||window.visitObj){
      setSummary(window.Summary);
      setVisitObj({
        ...window.visitObj?window.visitObj:visitObj,
        ...{
          visit_type:window.visitObj?window.visitObj.visit_type:2
        }
      })
    }
    getLocation();
    getcodeitemList();
  }, [1])
  // 获取位置
  function getLocation() {
    HWH5.getLocation({ type: 1 }).then(data => {
      setLocationData(data);
      console.log(data);
    }).catch(error => {
      console.log('获取位置信息异常', error);
    });
  }
  // 获取拜访事由
  function getcodeitemList(){
    codeitemList({
      setid: 3
    }).then((res)=>{
      const data = res.data;
      const list = [];
      data.map((e)=>{
        list.push({
          label: e.codeitem_name,
          value: e.code_item_id
        });
        return '';
      })
      setActivityList(list);
    })
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
  //跳转总结
  function toSummary() {
    const { history } = props;
    window.tab = 0;
    window.Summary = summary;
    //跳转内部页面并传值
    history.push({
      pathname: '/summary/',
    })
  }
  // 跳转选客户
  async function selectCustomer(){
    window.visitObj = {...visitObj,...{}};
    window.tab = 0;
    const { history } = props;
    //跳转内部页面并传值
    history.push({
      pathname: '/selectCustomer/',
    })
  }
  // 跳转选联系人
  async function SelectContact(){
    if(!visitObj.customer_id){
      HWH5.showToast({
        msg: '请先选择出勤对象',
        type: 'w'
      });
      return;
    }
    window.visitObj = {...visitObj,...{}};
    const { history } = props;
    window.tab = 0;
    //跳转内部页面并传值
    history.push({
      pathname: '/SelectContact/',
    })
  }
  // 开始拜访
  function visitAddStart(){
    if(!visitObj.customer_id){
      HWH5.showToast({
        msg: '请先选择出勤对象',
        type: 'w'
      });
      return;
    }
    if(!visitObj.target_desc){
      HWH5.showToast({
        msg: '请先输入希望达成的目标',
        type: 'w'
      });
      return;
    }
    visitAdd({
      ...visitObj,
      ...{
        location_lat:locationData.latitude,
        location_lng:locationData.longitude,
        is_check_last:1,
        ex_desc:visitObj.visit_type===2?summary.desc:visitObj.ex_desc
      }
    }).then((res)=>{
      console.log(res);
      window.nowVisitObj = res.data;
      if(visitObj.visit_type!==2){
        const { history } = props;
        //跳转内部页面并传值
        history.push({
          pathname: '/fieldWorkStart/',
        })
      }
    })
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
      <Picker data={visitTypeList} cols={1} title="选择出勤方式" value={[visitObj.visit_type]} onChange={(value => setVisitObj({...visitObj,...{visit_type:value[0]}}))} className="forss">
        <List.Item className={css.amItem} arrow="horizontal">出勤方式</List.Item>
      </Picker>
    </List>
    
    <List renderHeader={() => ''} className="my-list">
      <Item arrow="horizontal" extra={visitObj.customer_name?visitObj.customer_name:'请选择'} onClick={()=>selectCustomer()}>出勤对象</Item>
    </List>
    <List renderHeader={() => '以下内容来自组织定义'} className="my-list">
        <Item arrow="horizontal" extra={visitObj.meetwithName?visitObj.meetwithName:'请选择'} onClick={()=>SelectContact()}>会见人</Item>
        <Picker data={activityList} cols={1} title="选择出勤事由" value={[visitObj.activity_id]} onChange={(value => setVisitObj({...visitObj,...{activity_id:value[0]}}))} className="forss">
          <Item arrow="horizontal" extra={'请选择'}>事由</Item>
        </Picker>
        <Item arrow={<div>1</div>} extra={<textarea value={visitObj.target_desc} onChange={(e)=>setVisitObj({...visitObj,...{target_desc:e.target.value}})} className={"weui-textarea "+css.itemtextarea} placeholder="请输入希望达成的目标" rows="2"></textarea>}>目标</Item>
        {
          visitObj.visit_type===2&&<Item arrow="horizontal" extra={summary?'已填写':'未填写'} onClick={()=>toSummary()}>总结</Item>
        }
        <Item><Button type="primary" onClick={()=>visitAddStart()}>
            <span>
              {
                visitObj.visit_type===1&&'上门开始'
              }
              {
                visitObj.visit_type===2&&'提交'
              }
              {
                visitObj.visit_type===3&&'约访开始'
              }
            </span>
            
          </Button></Item>
     </List>
  </div>
}


let visitTypeList = [
  {
    label: '上门（上门跟对方见面）',
    value: 1
  },
  {
    label: '电话（用电话/网络跟对方联系）',
    value: 2
  },
  {
    label: '约访（跟对方约到某地点见面）',
    value: 3
  }
]

function Page (props){
  return <div style={{height:'100%'}}> 
    <Tab tab={0} {...props}>
        <FieldWork {...props}/>
      </Tab>
  </div>
}

export default Page;