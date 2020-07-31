import React, {useEffect ,useState} from 'react';
import * as css from './index.module.css';
import {connectionQuery} from './../../servers/comp';
import {List, Checkbox,Button} from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;
function SelectContact(props) {
  const [contactList,setContactList] = useState([]);
  const [selectArr,setSelectArr] = useState([]);
  useEffect(()=>{
    // 设置导航标题
    HWH5.navTitle({ title: '选会见人' });
    getConnectionQuery();
  },[1])
  function onChange(val){
    console.log(val);
    const newSelect = selectArr.concat([]);
    if(newSelect.indexOf(val)!==-1){
      newSelect.splice(newSelect.indexOf(val),1);
    }else{
      newSelect.push(val);
    }
    setSelectArr(newSelect);
  }
  async function selectContact(e){
    console.log(e);
    console.log(window.visitObj);
    let meetwithArr = [];
    let meetwithNameArr = [];
    selectArr.map((e)=>{
      meetwithArr.push(contactList[e]['user_id']);
      meetwithNameArr.push(contactList[e]['name']);
      return '';
    })
    window.visitObj['open_contact'] = meetwithArr.join(',');
    window.visitObj['meetwith'] = meetwithArr.join(',');
    window.visitObj['meetwithName'] = meetwithNameArr.join(',');
    const { history } = props;
    //跳转内部页面并传值
    history.push({
      pathname: '/',
    })
  }
   // 获取客户联系人
  function getConnectionQuery(){
    connectionQuery({
      link_cid: window.visitObj.customer_id,
      customer_connection_uid_type: 1,
      card_uid_type: 1,
      type: '2,3'
    }).then((res)=>{
      const data = res.data;
      const list = [];
      data.map((e)=>{
        list.push({
          ...e,
          ...{
            value: e.user_id
          }
        })
        return '';
      })
      setContactList(list);
    })
  }
  return <div className={css.App}>
    <div className={css.listWrap}>
      <List renderHeader={() => '会见人'}>
        {contactList.map((i,e) => (
         
            <Item extra={<div>
              <div>{i.name} {i.group_name}</div>
              <div>{i.phone}</div>
              </div>}>
              <CheckboxItem checked={selectArr.indexOf(e)!==-1?true:false} key={i.user_id} onChange={() => onChange(e)}></CheckboxItem>
            </Item>
        ))}
        <Item><Button type="primary" onClick={selectContact}>确定</Button></Item>
      </List>
    </div>
  </div>
}
export default (props) => {
  return <div>
    <div className={css.App}>
      
      <SelectContact {...props} />
    </div>
  </div>
}