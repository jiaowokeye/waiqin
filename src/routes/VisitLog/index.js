import React, { useState, useEffect } from 'react';
import * as css from './index.module.css';
import { NavBar, List } from 'antd-mobile';
import { getManagerInfo } from './../../servers/comp'
import Tab from './../../components/tabNav';
import moment from 'moment';
const { Item } = List;
let time1 = null;

function VisitLog(props) {
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [menuType, setMenuType] = useState('2');
    const [chooseGroup, setChooseGroup] = useState(null);
    const [list, setList] = useState([]);
    function LeftClick() {
        // setShow(true);
    }
    function getProgressListData() {
        HWH5.showLoading();
        switch (menuType) {
            case "2":
                getManagerInfo({
                    isTransfer: 1,
                    checkin_start_date: date,
                    checkin_end_date: date
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
    }, [date, menuType, setChooseGroup])
    useEffect(() => {
        
        const { history } = props;
        if (history.location.state) {
            setMenuType(history.location.state.menuType);
            switch (history.location.state.menuType) {
                case "2":
                    setDate(history.location.state.data);
                    break;
                case "3":
                    setChooseGroup(history.location.state.data);
                    break;
            }
        }
    }, [])
    function RightClick() {
        // setShow(true);
        const { history } = props;
        history.push({
            pathname: '/filter/',
            state: {
                type: 1
            }
        })
    }
    function ToQuickView() {
        const { history } = props;
        history.push({
            pathname: '/quickView/',
        })
    }
    function toDetail(e){
        const user_id =  e['user_id'];
        const name =  e['name'];
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
            mode="light"
            icon={<i onClick={() => ToQuickView()} className="icon-nav icon-nav-readingHistory"></i>}
            onLeftClick={() => LeftClick()}
            rightContent={[
                <i className="icon-nav icon-nav-morePress" onClick={() => RightClick()}></i>
            ]}
        ><span className={css.title}>{date}</span></NavBar>

        {
            list.map((e, i) => {
                return <List key={i} renderHeader={() => <div className={css.itemTitle}>
                    <div>
                        {/* {
                            e.visitUser.extInfo.photo ? <img className={css.headerPhoto} src={e.visitUser.extInfo.photo} /> : <i className="icon-nav icon-nav-headPortrait"></i>
                        } */}
                        {
                            e.name
                        }
                        {
                            e.title
                        }
                    </div>
                    <div>
                        快览
                    </div>
                    <div onClick={()=>toDetail(e)}>
                        {e.visitList.length}
                    </div>
                </div>} className="my-list">
                    {
                        e.visitList.map((el,il)=>{
                            return <Item key={il} arrow="empty" className="spe" wrap>
                            {
                                el.customer_name
                            }
                            （
                            {
                                el.checkin_time.substring(0,5)
                            }
                            ）
                        </Item>
                        })
                    }
                    
                </List>
            })
        }
        {
            list.length === 0 ? <div style={{ textAlign: 'center', paddingTop: '100px' }}>暂无拜访信息</div> : <div></div>
        }
    </div>
}

function Page(props) {
    return <div style={{ height: '100%' }}>
        <Tab tab={1} {...props}>
            <VisitLog {...props} />
        </Tab>
    </div>
}

export default Page;