import React, {
  useEffect,useState
} from 'react';
import * as css from './index.module.css';
import {TabBar } from 'antd-mobile';
import FieldWork from './../Fieldwork/index'
import Plan from './../Plan/index'
import VisitLog from './../VisitLog/index'
export default function Home(props) {
  const [tab,setTab] = useState(0)
  useEffect(() => {
    // 设置导航标题
    HWH5.navTitle({ title: '外勤' });
    if(window.tab){
      setTab(window.tab);
    }
  }, []);

  return (
    <div className={css.App}>
      <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={false}
        >
          <TabBar.Item
            title="外勤"
            key="Life"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={tab===0}
            onPress={() => {
              setTab(0)
              window.chooseDate = null;
              window.menuType = null;
            }}
            data-seed="logId"
          >
            {
              tab===0?<FieldWork {...props}/>:<div></div>
            }
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="记录"
            key="Koubei"
            selected={tab===1}
            onPress={() => {
              setTab(1)
              window.chooseDate = null;
              window.menuType = null;
            }}
            data-seed="logId1"
          >
            {
              tab===1?<VisitLog {...props}/>:<div></div>
            }
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="计划"
            key="Friend"
            selected={tab===2}
            onPress={() => {
              setTab(2)
              window.chooseDate = null;
              window.menuType = null;
            }}
          >
            {
              tab===2?<Plan {...props}/>:<div></div>
            }
          </TabBar.Item>
        </TabBar>
       
    </div>
  );
}
