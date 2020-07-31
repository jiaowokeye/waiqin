import React,{useEffect,useState} from 'react';
import * as css from './index.module.css';
import { DatePicker ,NavBar } from 'antd-mobile';
import moment from 'moment';
import {getUserGroupInfo,getVisitList} from './../../servers/comp'
function QuickView(props){
    const [list,setList] = useState([]);
    const [title,setTitle] = useState('');
    const [checkedIndex,setCheckedIndex] = useState(0);
    const [date,setDate] = useState(moment().format('YYYY-MM'));
    const [groupId,setGroupId] = useState(0);
    const [visitDetail,setvisitDetail] = useState(null);
    useEffect(()=>{
        HWH5.navTitle({ title: '快览' });
        console.log(window.chooseGroup);
        if(window.chooseGroup){
            setGroupId(window.chooseGroup.groupId);
            setTitle(window.chooseGroup.groupname)
        }
        
      },[1])
    useEffect(()=>{
        getProgressListData();
    },[checkedIndex,list])
    useEffect(()=>{
        setTimeout(()=>{
            getUser();
        },1000)
    },[groupId])
    function getProgressListData(){
        if(list&&list.length>0){
            HWH5.showLoading();
            getVisitList({
                visit_user_id: list[checkedIndex]['user_id'],
                // checkin_month: date,
                sum_duration_num_type:3 ,
                extendInfostr: '0,1,3,4,5,6,7,8,9,10,11,12,13',
                currentPage: 1,
                is_join_location: 1,
                visit_type:-1,
                // isread:isread
            }).then((res)=>{
                HWH5.hideLoading();
                setvisitDetail(res.data);
            });
        }
        
    }
    function RightClick(){
        const { history } = props;
        history.push({
            pathname: '/chooseGroup/',
            state:{
                stype:30
            }
        })
    }
    function getUser(){
        getUserGroupInfo({
            group_id: groupId,
            ismine: 1,
            member_type: -1,
            isplat: 0
        }).then((res)=>{
            setList(res.data.compUserList);
            setCheckedIndex(0)
        })
    }
    return <div>
        <NavBar
            className={css.navBar}
            rightContent={[
                <i class="icon-nav icon-nav-morePress" onClick={()=>RightClick()}></i>
            ]}
        ><span className={css.title}>{title}</span></NavBar>
         <div className={css.header} style={{ overflowX: 'auto' }}>
            <ul style={{ width: +list.length * 80 + 'px' }}>
                {
                list.map((el, il) => {
                    return <li onClick={()=>setCheckedIndex(il)} className={css.userinfo+' '+(il===checkedIndex?css.checked:'')} key={il}>
                    <img className={css.userHeader} src={'http://welink.idaowei.com/core/view/images/colleague.png'} />
                    <p>{el.name}</p>
                    </li>
                })
                }
            </ul>
        </div>
        {
            visitDetail&&<div className={css.subHeader}>
            <div>
                <DatePicker
                    value={date}
                    onChange={date => setDate({ date })}
                    mode="date"
                    >
                    <div>2020年</div>
                    <div>6月</div>
                </DatePicker> 
                
            </div>
            <div>
                <div>{visitDetail.info.onum}</div>
                <div>上门</div>
            </div>
            <div>
                <div>{visitDetail.info.pnum}</div>
                <div>电话</div>
            </div>
            <div>
                <div>{visitDetail.info.vnum}</div>
                <div>约访</div>
            </div>
        </div>
        }
        
        {
             !visitDetail?<div style={{textAlign:'center',paddingTop:'100px'}}>暂无拜访信息</div>:<div></div>
        }
        {
            visitDetail&&visitDetail.list.paginationData&&<div className={css.date_wrap}>
                
            </div>
        }
    </div>
}

export default QuickView;