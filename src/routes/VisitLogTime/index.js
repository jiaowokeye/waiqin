import React, { useState,useEffect } from 'react';
import {getVisitList} from './../../servers/comp';
import {VisitDetail} from './../../components/visitDetail/index'
let time1 = null;
function VisitLog(props) {
    const [list,setList] = useState([]);
    const [type,setType] = useState(1);
    useEffect(()=>{
        const { history } = props;
        if (history.location.state) {
            const value1 = history.location.state.value1?history.location.state.value1:1;
            console.log(value1);
            let title = '';
            switch(value1){
                case 1:
                    title = '0~10分钟';
                    break;
                case 2:
                    title = '10~30分钟';
                    break;
                case 3:
                    title = '30分~1小时';
                    break;
                case 4:
                    title = '1小时~2小时';
                    break;
                case 5:
                    title = '2小时以上';
                    break;
            }
            HWH5.navTitle({ title: title });
            setType(history.location.state.value1);
        }
    },[])
    useEffect(() => {
        console.log(type);

        HWH5.showLoading();
        if (time1) {
            clearTimeout(time1);
        }
        time1 = setTimeout(() => {
            getProgressListData();
        }, 1000);
    }, [type])
    function getProgressListData(){
        let duration_end = '';
        switch(type){
            case 1:
                duration_end = 600;
               
                break;
            case 2:
                duration_end = 1800;
                break;
            case 3:
                duration_end = 3600;
                break;
            case 4:
                duration_end = 7200;
                break;
            case 5:
                duration_end = '';
                break;
        }
        getVisitList({
            visit_user_id: -1,
            // checkin_date: date,
            sum_duration_num_type: 3,
            extendInfostr: '0,1,3,4,5,6,7,8,9,10,11,12,13',
            currentPage: 1,
            visit_type: '1,3',
            duration_end: duration_end,
            pageSize:10,
            transfer_type:4,
            // duration_start: duration_start,
        }).then((res) => {
            HWH5.hideLoading();
            setList(res.data.list.paginationData ? res.data.list.paginationData : []);
        });
    }
    return <div>
        {
            list.map((e, i) => {
                return <VisitDetail {...props} data={e} key={i}/>
            })
        }
        {
            list.length === 0 ? <div style={{ textAlign: 'center', paddingTop: '100px' }}>暂无拜访信息</div> : <div></div>
        }
    </div>
}
  
export default VisitLog;


/**
 * 
 * 
 * function getProgressListData() {
        HWH5.showLoading();
        switch (menuType) {
            case "2":
                getManagerInfo({
                    isTransfer: 1,
                    checkin_start_date: date,
                    checkin_end_date: date
                    // isread:isread
                }).then((res) => {
                    HWH5.hideLoading();
                    setList(res.data ? res.data : []);
                });
                break;
            case "3":
                getManagerInfo({
                    group_id: chooseGroup ? chooseGroup.groupId : 0,
                    checkin_start_date: date,
                    checkin_end_date: date,
                    isTransfer: 1,
                }).then((res) => {
                    HWH5.hideLoading();
                    setList(res.data ? res.data : []);
                });
                break;
            case "4":
                getInfoByUser({
                    get_type: 2,
                    sort_type: 1,
                    user_id: chooseUser ? chooseUser.user_id : -1,
                    date_str: moment().format('YYYY-MM-DD'),
                    currentPage: 1,
                    info: 1
                }).then((res) => {
                    HWH5.hideLoading();
                    setList(res.data ? res.data : []);
                });
                break;
            case "5": //互动
                getVisitList({
                    visit_user_id: -1,
                    checkin_date: date,
                    sum_duration_num_type: 3,
                    extendInfostr: '0,1,3,4,5,6,7,8,9,10,11,12,13',
                    currentPage: 1,
                    visit_type: -1,
                    isread: 0
                }).then((res) => {
                    HWH5.hideLoading();
                    setList(res.data.list.paginationData ? res.data.list.paginationData : []);
                });
                break;
            case "6": //出勤时长
                getVisitList({
                    visit_user_id: -1,
                    checkin_date: date,
                    sum_duration_num_type: 3,
                    extendInfostr: '0,1,3,4,5,6,7,8,9,10,11,12,13',
                    currentPage: 1,
                    visit_type: -1,
                    duration_end: duration_end,
                    duration_start: duration_start,
                }).then((res) => {
                    HWH5.hideLoading();
                    setList(res.data.list.paginationData ? res.data.list.paginationData : []);
                });
                break;
            case "7": //出勤方式
                
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        HWH5.showLoading();
        if (time1) {
            clearTimeout(time1);
        }
        time1 = setTimeout(() => {
            getProgressListData();
        }, 1000);
    }, [date, menuType, chooseUser, chooseGroup, visit_type, duration_start, duration_end, isread])



    {/* {
            ['5', '6', '7'].indexOf(menuType) !== -1&&list.length>0 && <div>
                {
                    list.map((e, i) => {
                        return <List key={i} renderHeader={() => <div>
                            {e.plan_date}
                        </div>} className="my-list">
                            <Item>
                                <div className={css.itemTitle}>
                                    <div>
                                        {
                                            e.visitUser.extInfo.photo ? <img className={css.headerPhoto} src={e.visitUser.extInfo.photo} /> : <i className="icon-nav icon-nav-headPortrait"></i>
                                        }
                                        {
                                            e.visitUser.name
                                        }
                                        {
                                            e.visitUser.title
                                        }
                                    </div>
                                    <div>
                                        快览
                        </div>
                                    <div>
                                        {e.reply_count}
                                    </div>
                                </div>

                            </Item>
                            <Item arrow="empty" className="spe" wrap>
                                {
                                    e.customer_name
                                }
                                {
                                    e.checkin_date
                                }
                            </Item>
                        </List>
                    })
                }
            </div>
        } 
 */