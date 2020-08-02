import React from 'react';
import * as css from './index.module.css'
function VisitDetail(props){
    const {data} = props;
    function toReply(){
        const { history } = props;
        history.push({
            pathname: '/reply/',
            state:{
                data:data
            }
        })
    }
    return <div className={css.wrap}>
        <div>{data.basicVo.customer_name}</div>
        <div>
            <span>{data.checkin_date}</span>
            <span>{data.checkin_time}</span>
            -
            <span>{data.checkout_time}</span>
            <span>{data.durationDesc}</span>
        </div>
        <div className={css.content}>
            <div className={css.item}>
                <div className={css.itemLeft}>关联客户</div>
                <div className={css.itemRight}>{data.basicVo.customer_name}</div>
            </div>
            <div className={css.item}>
                <div className={css.itemLeft}>会见人</div>
                <div className={css.itemRight}>{data.visitUser.name}</div>
            </div>
            <div className={css.item}>
                <div className={css.itemLeft}>目标</div>
                <div className={css.itemRight}>{data.target_desc}</div>
            </div>
            {
                data.visitExList.map((e,i)=>{
                    return <div>
                        {
                            e.ex_type===1&&<div>
                                 <div>总结</div>
                                <div className={css.item}>
                                    <div className={css.itemLeft}>会见人</div>
                                    <div className={css.itemRight}>{e.contact_name}</div>
                                </div>
                                <div className={css.item}>
                                    <div className={css.itemLeft}>结果</div>
                                    <div className={css.itemRight}>{e.ex_desc}</div>
                                </div>
                                <div className={css.item}>
                                    <div className={css.itemLeft}>问题</div>
                                    <div className={css.itemRight}>{e.problem}</div>
                                </div>
                                <div className={css.item}>
                                    <div className={css.itemLeft}>解决</div>
                                    <div className={css.itemRight}>{e.solution}</div>
                                </div>
                            </div>
                        }
                        {
                            e.ex_type===2&&<div>
                                 <div>现场</div>
                                <div className={css.item}>
                                    <div className={css.itemLeft}>类型</div>
                                    <div className={css.itemRight}>{e.code_item_name}</div>
                                </div>
                                <div className={css.item}>
                                    <div className={css.itemLeft}>说明</div>
                                    <div className={css.itemRight}>{e.ex_desc}</div>
                                </div>
                            </div>
                        }
                    </div>
                })
            }
           
        </div>
        <div className={css.reply} onClick={()=>toReply()}>
            互动（{data.reply_count}）
        </div>
    </div>
}

export { VisitDetail };