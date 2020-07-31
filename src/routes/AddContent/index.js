import React, {  useEffect ,useState} from 'react';
import * as css from './index.module.css';
import {List,InputItem,Button} from 'antd-mobile';
const Item = List.Item;
function AddContent(props) {
  const [field,setField] = useState({
    address: "",
    address_memo: "",
    authid: -7,
    birth_province_id: "0",
    birthday: "",
    connect_id: "",
    contact_tel: "",
    defined_fields: "",
    email: "",
    group_name: "",
    is_share: "1",
    link_cid: "",
    menuid: "",
    name: "",
    office_fax: "",
    parentid: "",
    phone: "",
    postcode: "",
    qq: "",
    rand: Math.random(),
    remark: "",
    school: "",
    sex: "0",
    tags: "",
    title: "",
    type: "2",
    weixin: "",
  })
  useEffect(()=>{
    // 设置导航标题
    HWH5.navTitle({ title: '新建联系人' });
  },[1])
  return <div  className={css.App}>
     <List renderHeader={() => '必填'} className="my-list">
        <Item className={css.input} extra={<InputItem value={field.name} onChange={(value)=>setField({
          ...field,
          ...{
            name:value
          }
        })}/>}>姓名</Item>
        <Item className={css.input} extra={<InputItem value={field.phone} onChange={(value)=>setField({
          ...field,
          ...{
            phone:value
          }
        })}/>}>手机</Item>
        <Item className={css.input} extra={<InputItem value={field.title} onChange={(value)=>setField({
          ...field,
          ...{
            title:value
          }
        })}/>}>职位</Item>
      </List>
      <List renderHeader={() => '选填'} className="my-list">
        <Item className={css.input} extra={<InputItem value={field.group_name} onChange={(value)=>setField({
          ...field,
          ...{
            'group_name':value
          }
        })}/>}>部门</Item>
        <Item className={css.input} extra={<InputItem value={field.contact_tel} onChange={(value)=>setField({
          ...field,
          ...{
            "contact_tel":value
          }
        })}/>}>电话</Item>
        <Item className={css.input} extra={<InputItem value={field.office_fax} onChange={(value)=>setField({
          ...field,
          ...{
            "office_fax":value
          }
        })}/>}>传真</Item>
        <Item className={css.input} extra={<InputItem value={field.email} onChange={(value)=>setField({
          ...field,
          ...{
            "email":value
          }
        })}/>}>邮箱</Item>
        <Item className={css.input} extra={<InputItem value={field.qq} onChange={(value)=>setField({
          ...field,
          ...{
            "qq":value
          }
        })}/>}>QQ</Item>
        <Item className={css.input} extra={<InputItem value={field.weixin} onChange={(value)=>setField({
          ...field,
          ...{
            'weixin':value
          }
        })}/>}>微信</Item>
        <Item className={css.input} extra={<InputItem value={field.remark} onChange={(value)=>setField({
          ...field,
          ...{
            "remark":value
          }
        })}/>}>备注</Item>
      </List>
      <div>
        <Item><Button type="primary">确定</Button></Item>
      </div>
  </div>
}
export default (props) => {
  return <div>
    <AddContent {...props} />
  </div>
}

