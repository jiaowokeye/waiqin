import React,{useState,useEffect} from 'react';
import * as css from './index.module.css';
import { NavBar,List } from 'antd-mobile';
import {getPlanList} from './../../servers/comp'
import Tab from './../../components/tabNav';
const {Item} = List;
let time1 = null;
function Plan(props){
    const [title,setTitle] = useState('计划任务');
    const [date,setDate] = useState();
    const [menuType,setMenuType] = useState(1);
    const [chooseUser,setChooseUser] = useState(null);
    const [chooseGroup,setChooseGroup] = useState(null);
    const [list,setList] = useState([]);
    function LeftClick(){
        // setShow(true);
    }
    function getProgressListData(){
        HWH5.showLoading();
        getPlanList({
            pageNo: 1,
            pageSize: 100,
            user_id	: chooseUser?chooseUser.user_id:-1,
            group_id: chooseGroup?chooseGroup.groupId:0,
            type: 0,
            startdate: date,
            enddate: date,
        }).then((res)=>{
            HWH5.hideLoading();
            setList(res.data.paginationData?res.data.paginationData:[]);
        });
    }
    useEffect(()=>{
        HWH5.showLoading();
        if(time1){
            clearTimeout(time1);
        }
        time1 = setTimeout(()=>{
            getProgressListData();
        },1000);
    },[date,menuType,chooseUser,chooseGroup])
    useEffect(()=>{
        const { history } = props;
        if(history.location.state){
            setMenuType(history.location.state.menuType);
            switch(history.location.state.menuType){
                case '1':
                    break;
                case '2':
                    setDate(history.location.state.data);
                    setTitle(history.location.state.data);
                    break;
                case '3':
                    setChooseGroup(history.location.state.data);
                    setTitle(history.location.state.data.groupname);
                    break;
                case '4':
                    setChooseUser(history.location.state.data);
                    setTitle(history.location.state.data.name);
                    break;
                default:
                    break;
            }
        }
    },[1])
    function RightClick(){
        const { history } = props;
        history.push({
            pathname: '/filter/',
            state:{
                type:2
            }
        })
    }
    
    function AddPlan(){
        const { history } = props;
        history.push({
            pathname: '/addPlan/',
        })
    }
    console.log(title);
    return <div>
        
         <NavBar
            mode="light"
            icon={<i onClick={()=>AddPlan()} class="icon-nav icon-nav-addPress"></i>}
            onLeftClick={() =>LeftClick() }
            rightContent={[
                <i class="icon-nav icon-nav-morePress" onClick={()=>RightClick()}></i>
            ]}
        ><span className={css.title}>{title}</span></NavBar>
         {
             list.map((e,i)=>{
                 return <List key={i} renderHeader={() => <div>
                     {e.plan_date}
                 </div>} className="my-list">
                 <Item>
                     {
                         e.doUser.extInfo.photo?<img className={css.headerPhoto} src={e.doUser.extInfo.photo}/>:<i class="icon-nav icon-nav-headPortrait"></i>
                     }
                     {
                         e.doUser.name
                     }
                     {
                         e.doUser.title
                     }
                 </Item>
                 <Item arrow="empty" className="spe" wrap extra={
                    <div>
                        {e.plan_status?'':<span >开始</span>}
                    </div>
                }>
                    {
                        e.customer_name
                    }
                 </Item>
               </List>
             })
         }
         {
             list.length===0?<div style={{textAlign:'center',paddingTop:'100px'}}>暂无计划信息</div>:<div></div>
         }
    </div>
}

function Page (props){
    return <div  style={{height:'100%'}}> 
      <Tab tab={2} {...props}>
          <Plan {...props}/>
        </Tab>
    </div>
  }
  
  export default Page;