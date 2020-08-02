import React,{useState,useEffect} from 'react';
import {replyList,replyAdd} from './../../servers/comp';
import { List} from 'antd-mobile';
import * as css from './index.module.css';
import {
    Tab, TabBody,TabBar
  } from '@wecode/react-weui';
const Item = List.Item;
function Reply(props){
    const [data,setData] = useState(null);
    const [list,setList] = useState([]);
    const [content,setContent] = useState('');
    useEffect(()=>{
        const { history } = props;
        if (history.location.state) {
            setData(history.location.state.data);
            getList(history.location.state.data.visit_id);
        }
    },[])
    function getList(id){
        const did = id?id:data.visit_id;
        console.log(did);
        replyList({
            did: did,
            clear: 1,
            type: 5,
        }).then((res)=>{
            setList(res.data.paginationData);
        })
    }
    function addReply(){
        replyAdd({
            did: data.visit_id,
            content: content,
            type: 5
        }).then((res)=>{
            setContent('');
            getList();
        })
    }
    return <Tab>
    <TabBody>
        <div>
        {
            data&&<div>
            <div>{data.basicVo.customer_name}</div>
            <div>
                <span>{data.checkin_date}</span>
                <span>{data.checkin_time}</span>
                -
                <span>{data.checkout_time}</span>
                <span>{data.durationDesc}</span>
            </div>
        <List>
            {
                list.map((e,i)=>{
                    return <Item>
                        <div className={css.replyWrap}>
                            <div className={css.replyLeft}>
                                {
                                    e.reply_user.extInfo.photo?<img className={css.headerPhoto} src={e.reply_user.extInfo.photo}/>:<i class="icon-nav icon-nav-headPortrait"></i>
                                }
                            </div>
                            <div className={css.replyContent}>
                                <div>
                                    {e.reply_user.name}
                                </div>
                                <div>
                                    {e.content}
                                </div>
                            </div>
                            <div className={css.replyRight}>
                                {e.reply_date.substring(5,16)}
                            </div>
                        </div>
                    </Item>
                })
            }
            {
                list.length===0&&<Item>暂无互动</Item>
            }
        </List>
            </div>
        }
        
    </div>
        </TabBody>
        <TabBar>
          <div className={css.tabbar}>
              <div className={css.replyInput}>
                <input value={content} onChange={(e)=>setContent(e.target.value)} id="input1" class={"weui-input "+css.input} type="text" placeholder="请输入"/>
              </div>
              <div className={css.replyBtn} onClick={()=>addReply()}>
                  确定
              </div>
          </div>
        </TabBar>
    </Tab>
}

export default Reply