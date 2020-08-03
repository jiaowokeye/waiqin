import React, { useEffect, useState } from 'react';
import * as css from './index.module.css';
import { DatePicker, NavBar, List } from 'antd-mobile';
import moment from 'moment';
import { getUserGroupInfo, queryVisitHead,getRelation} from './../../servers/comp';
let user_id = '';
function QuickView(props) {
    const [list, setList] = useState([]);
    const [title, setTitle] = useState('');
    const [checkedIndex, setCheckedIndex] = useState(0);
    const [date, setDate] = useState(moment().format('YYYY-MM'));
    const [groupId, setGroupId] = useState(0);
    const [visitDetail, setvisitDetail] = useState(null);
    useEffect(() => {
        HWH5.navTitle({ title: '快览' });
        const { history } = props;
        if (history.location.state) {
            if(history.location.state.data.groupId){
                setGroupId(history.location.state.data.groupId);
                setTitle(history.location.state.data.groupname);
                user_id = history.location.state.data.userId;
            }else{
                getRelation({
                    user_id:window.userId
                }).then((res)=>{
                    const data = res.data;
                    setGroupId(data[0].group_id);
                    setTitle(data[0].groupname);
                })
            }
        }
    }, [1])
    useEffect(() => {
        getProgressListData();
    }, [checkedIndex, list,date])
    useEffect(() => {
        setTimeout(() => {
            getUser();
        }, 1000)
    }, [groupId])
    function getProgressListData() {
        if (list && list.length > 0) {
            HWH5.showLoading();
            queryVisitHead({
                visit_user_id: list[checkedIndex]['user_id'],
                start_date: date + '-01',
                end_date: date + '-31',
                day_count: 1
            }).then((res) => {
                HWH5.hideLoading();
                const data = res.data;
                const date_count = data.date_count;
                const list = [];
                for (let i in date_count) {
                    if (date_count[i]['visitcount']) {
                        list.push({
                            ...date_count[i],
                            ...{
                                'date': i
                            }
                        })
                    }
                }
                data['list'] = list;
                console.log(data);
                setvisitDetail(data);
            });
        }

    } 
    function RightClick() {
        const { history } = props;
        history.push({
            pathname: '/chooseGroup/',
            state: {
                stype: 30,
                type: 3
            }
        })
    }
    function getUser() {
        getUserGroupInfo({
            group_id: groupId,
            ismine: 1,
            member_type: -1,
            isplat: 0
        }).then((res) => {
            if(user_id){
                let index = 0;
                res.data.compUserList.map((e,i)=>{
                    if(e.user_id===user_id){
                        index = i;
                    }
                })
                setCheckedIndex(index);
                index = 0;
            }else{
                setCheckedIndex(0);
            }
            setList(res.data.compUserList);
        })
    }
    function toDetail(date){
        const user_id =  list[checkedIndex]['user_id'];
        const name =  list[checkedIndex]['name'];
        const { history } = props;
        history.push({
            pathname: '/visitLogDateUser/',
            state:{
               date:date,
               user_id:user_id,
               name:name
            }
        })
    }
    return <div>
        <NavBar
            className={css.navBar}
            rightContent={[
                <i class="icon-nav icon-nav-morePress" onClick={() => RightClick()}></i>
            ]}
        ><span className={css.title}>{title}</span></NavBar>
        <div className={css.header} style={{ overflowX: 'auto' }}>
            <ul style={{ width: +list.length * 80 + 'px' }}>
                {
                    list.map((el, il) => {
                        return <li onClick={() => setCheckedIndex(il)} className={css.userinfo + ' ' + (il === checkedIndex ? css.checked : '')} key={il}>
                            <img className={css.userHeader} src={'http://welink.idaowei.com/core/view/images/colleague.png'} />
                            <p>{el.name}</p>
                        </li>
                    })
                }
               
            </ul>
            {
                list.length===0&&<div style={{textAlign:"center"}}>该部门下暂无人员</div>
            }
        </div>
        {
            visitDetail&&list.length>0&& <div className={css.subHeader}>
                <div>
                    <DatePicker
                        onChange={(datestr) => {
                            console.log(datestr);
                            setDate(moment(datestr).format('YYYY-MM'));
                        }}
                        mode={"month"}
                    >
                        <List.Item className="noneExtra" extra={<div></div>}>
                            <div className={css.dateTimePicker}>
                                <div>{moment(date).format('YYYY')}年</div>
                                <div>{moment(date).format('MM')}月</div>
                            </div>
                        </List.Item>

                    </DatePicker>
                </div>
                <div>
                    <div>{visitDetail.onum}</div>
                    <div>上门</div>
                </div>
                <div>
                    <div>{visitDetail.pnum}</div>
                    <div>电话</div>
                </div>
                <div>
                    <div>{visitDetail.vnum}</div>
                    <div>约访</div>
                </div>
            </div>
        }

        {
            !visitDetail||visitDetail.list.length===0&&list.length>0 ? <div style={{ textAlign: 'center', paddingTop: '100px' }}>暂无拜访信息</div> : <div></div>
        }
        {
            visitDetail && visitDetail.list && <div className='smallExtra'>
                {
                    visitDetail.list.map((e, i) => {
                        return <div className={css.itemWrap} onClick={()=>toDetail(e.date)}>
                            <div className={css.itemDate}>
                                {e.date}
                            </div>
                            <div className={css.itemContent}>
                                <div>
                                    <div>{e.onum}</div>
                                    <div>上门</div>
                                </div>
                                <div>
                                    <div>{e.pnum}</div>
                                    <div>电话</div>
                                </div>
                                <div>
                                    <div>{e.vnum}</div>
                                    <div>约访</div>
                                </div>
                            </div>
                            <div>
                                >
                            </div>
                        </div>
                    })
                }
            </div>
        }
    </div>
}

export default QuickView;