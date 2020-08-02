import React, { useState, useEffect } from 'react';
import { List, Accordion } from 'antd-mobile';
import * as css from './index.module.css';
const Item = List.Item;
function Filter(props) {
  const [type, setType] = useState(1);
  useEffect(() => {
    const { history } = props;
    HWH5.navTitle({ title: '筛选'});
    if(history.location.state){
      setType(history.location.state.type);
    }
  }, [])
  function click(value,value1){
    const { history } = props;
    switch (value) {
        case 1:
            switch(type){
              case 1://记录
                  history.push({
                      pathname: '/visitLog/',
                      state:{
                          menuType:'1',
                          data:''
                      }
                  })
                  break;
              case 2://计划
                  history.push({
                      pathname: '/plan/',
                      state:{
                          menuType:'1',
                          data:''
                      }
                  })
                  break;
          }
          break;
        case 2:// 指定日期
            //跳转内部页面并传值
            history.push({
                pathname: '/chooseDate/',
                state:{
                  type:type
                }
            })
            break;
        case 3:// 指定部门
            history.push({
                pathname: '/chooseGroup/',
                state:{
                  type:type
                }
            })
            break;
        case 4://指定人员
            history.push({
                pathname: '/chooseUser/',
                state:{
                  type:type
                }
            })
            break;
        case 5: //新互动
            history.push({
                pathname: '/visitLogReply/',
            })
            break;
        case 6: //出勤时长
            history.push({
                pathname: '/visitLogTime/',
                state:{
                  value1:value1
                }
            })
            break;
        case 7: //出勤方式
            history.push({
                pathname: '/visitLogType/',
                state:{
                  value1:value1
                }
            })
            break;
        default:
            break;
    }
  }
  return <div>
    <List className="my-list">
      {
        type === 2&&<Item onClick={()=>click(1)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>默认</Item>
      }
      <Item onClick={()=>click(2)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>指定日期</Item>
      <Item onClick={()=>click(3)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>指定部门</Item>
      <Item onClick={()=>click(4)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>指定个人</Item>
      {
        type===1&&<Item onClick={()=>click(5)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>有新互动</Item>
      }
    </List>
    {
      type === 1 && <div>

        <Accordion accordion openAnimation={{}} className="my-accordion">
          <Accordion.Panel header={<span className={css.title}>出勤时长</span>}   >
            <List className="my-list">
              <Item onClick={()=>click(6,1)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>0~10分钟</Item>
              <Item onClick={()=>click(6,2)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>10~30分钟</Item>
              <Item onClick={()=>click(6,3)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>30分~1小时</Item>
              <Item onClick={()=>click(6,4)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>1小时~2小时</Item>
              <Item onClick={()=>click(6,5)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>2小时以上</Item>
            </List>
          </Accordion.Panel>
        </Accordion>
        <Accordion accordion openAnimation={{}} className="my-accordion">
          <Accordion.Panel header={<span className={css.title}>出勤方式</span>}>
            <List className="my-list">
              <Item onClick={()=>click(7,1)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>上门</Item>
              <Item onClick={()=>click(7,2)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>电话</Item>
              <Item onClick={()=>click(7,3)} extra={<i className="icon-16 icon-16-arrowRight"></i>}>约访</Item>
            </List>
          </Accordion.Panel>
        </Accordion>
      </div>
    }

  </div>
}

export default Filter;