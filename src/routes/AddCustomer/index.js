import React, {  useEffect,useState } from 'react';
import * as css from './index.module.css';
import { InputItem,Picker,List,Button  } from 'antd-mobile';
import {customerModify} from './../../servers/comp'
const Item = List.Item;
function AddCustomer(props) {
  const [customerName,setCustomerName] = useState('');
  const [address,setAddress] = useState('');
  const [visitType, setVisitType] = useState(1);
  const [locationData,setLocationData]  = useState(null);
  function getLocation(){
    HWH5.getLocation({ type: 1 }).then(data => {
      setLocationData(data);
      setAddress(data.address)
    }).catch(error => {
      console.log('获取位置信息异常', error);
    });
  }
  console.log(locationData);
  useEffect(()=>{
    // 设置导航标题
    HWH5.navTitle({ title: '新建' });
    getLocation();
  },[1])
  function toMap() {
    const { history } = props;
    //跳转内部页面并传值
    history.push({
      pathname: '/map/',
    })
  }
  function toAddContent(){
    const { history } = props;
    //跳转内部页面并传值
    history.push({
      pathname: '/addContent/',
    })
  }
  function add(){
    var obj = {
      customer_name: customerName,
      province_id: 1,
      city_id: 100,
      country_id: 100100,
      address: address,
      ex_id: 12159,
      customer_contacts: JSON.stringify(contactArr),
      bd_lat: locationData.latitude-1,
      bd_lng: locationData.longitude-1,
    }
    customerModify(obj);
  }
  return <div  className={css.App}>
    <div className={css.listOne}>
      <div className={css.listOneLeft}>
        名称
      </div>
      <div className={css.listOneRight}>
        <InputItem value={customerName} onChange={(value)=>setCustomerName(value)} />
      </div>
    </div>
    <div className={css.listTwo}>
      <div className={css.listOneTop}>
        地址
      </div>
      <div className={css.listOneBottom}>
        <div className={css.listOneBottomLeft}>
          <textarea class={"weui-textarea "+css.itemtextarea} value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="请输入客户地址" rows="2"></textarea>
        </div>
        <div className={css.listOneBottomRight}>
          <i onClick={toMap} class="icon-16 icon-16-arrowRight"></i>
        </div>
      </div>
    </div>
    <div className={css.listTwo}>
      <div className={css.listOneTop}>
        地区
      </div>
      <Picker data={visitTypeList} cols={1} title="请选择地区" value={visitType} onChange={(value => setVisitType(value))} className="forss">
        <div className={css.listOneBottom}>
          <div className={css.listOneBottomLeft}>
            {visitType}
          </div>
          <div className={css.listOneBottomRight}>
            <i onClick={toMap} class="icon-16 icon-16-arrowRight"></i>
          </div>
        </div>
      </Picker>
    </div>
    <div style={{marginTop:'30px'}}>
      <List renderHeader={() => <div className={css.contentHeader}><span>联系人</span> <i onClick={toAddContent} className={"icon-nav icon-nav-add "+css.add} ></i></div>} className="my-list">
        <Item extra={'18535677667'}>翟科</Item>
        <Item extra={'18888888888'}>张三</Item>
      </List>
    </div>
    <div style={{marginTop:'30px'}}>
      <Button onClick={add} type="primary">新增</Button>
    </div>
  </div>
}
export default (props) => {
  return <div>
    <div className={css.App}>
      <AddCustomer {...props} />
    </div>
  </div>
}

const visitTypeList = [
  {
    label: '上门（上门跟对方见面）',
    value: '1'
  },
  {
    label: '电话（用电话/网络跟对方联系）',
    value: '2'
  },
  {
    label: '约访（跟对方约到某地点见面）',
    value: '3'
  }
]
const contactArr = [{"name":"翟科","title":"web","phone":"18535677667","group_name":"","contact_tel":"","office_fax":"","email":"","sex":"0","birthday":"","address_memo":"","address":"[{\"address\":\"\",\"lat\":\"0\",\"lng\":\"0\"}]","postcode":"","birth_province_id":"0","school":"","weixin":"","qq":"","remark":"","tags":"","defined_fields":"[]","parentid":"","authid":"","menuid":"","connect_id":"","is_share":"1","type":"2","link_cid":"","addressList":[{"address":"","lat":"0","lng":"0"}],"att":{"length":0,"prevObject":{"0":{"location":{"href":"http://test.idaowei.com:18080/core/comp/customer/basic.do?tolist&authid=-7&parentAuthId=0&rand=0.6179350378615298&menuid=-7","ancestorOrigins":{},"origin":"http://test.idaowei.com:18080","protocol":"http:","host":"test.idaowei.com:18080","hostname":"test.idaowei.com","port":"18080","pathname":"/core/comp/customer/basic.do","search":"?tolist&authid=-7&parentAuthId=0&rand=0.6179350378615298&menuid=-7","hash":""},"jQuery19101483333031327123":1},"context":{"location":{"href":"http://test.idaowei.com:18080/core/comp/customer/basic.do?tolist&authid=-7&parentAuthId=0&rand=0.6179350378615298&menuid=-7","ancestorOrigins":{},"origin":"http://test.idaowei.com:18080","protocol":"http:","host":"test.idaowei.com:18080","hostname":"test.idaowei.com","port":"18080","pathname":"/core/comp/customer/basic.do","search":"?tolist&authid=-7&parentAuthId=0&rand=0.6179350378615298&menuid=-7","hash":""},"jQuery19101483333031327123":1},"length":1},"context":{"location":{"href":"http://test.idaowei.com:18080/core/comp/customer/basic.do?tolist&authid=-7&parentAuthId=0&rand=0.6179350378615298&menuid=-7","ancestorOrigins":{},"origin":"http://test.idaowei.com:18080","protocol":"http:","host":"test.idaowei.com:18080","hostname":"test.idaowei.com","port":"18080","pathname":"/core/comp/customer/basic.do","search":"?tolist&authid=-7&parentAuthId=0&rand=0.6179350378615298&menuid=-7","hash":""},"jQuery19101483333031327123":1},"selector":"#edit_connectionBasic_dialog #NotDeRequire input[type=file]"}}];