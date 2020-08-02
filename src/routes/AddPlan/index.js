import React, { useEffect, useState } from 'react';
// import * as css from './index.module.css';
import moment from 'moment'
import { List, DatePicker } from 'antd-mobile';
import {addPlan} from './../../servers/comp'
const Item = List.Item;
function AddPlan(props) {
    const [addPlanData,setAddPlanData] = useState({
        date:moment().format('YYYY-MM-DD'),
        chooseUser:null,
        chooseCustomer:[]
    })
    useEffect(() => {
        HWH5.navTitle({ title: '制定计划' });
        const newaddPlanData = window.addPlanData?window.addPlanData:{
            date:moment().format('YYYY-MM-DD'),
            chooseUser:null,
            chooseCustomer:[]
        };
        const chooseCustomerNew = addPlanData.chooseCustomer.concat(window.planCheckedCus?window.planCheckedCus:[]);
        if(window.visitObj){
            chooseCustomerNew.push(window.visitObj);
        }
        setAddPlanData({
            ...newaddPlanData,
            chooseUser:window.chooseUser?window.chooseUser:null,
            chooseCustomer:chooseCustomerNew?chooseCustomerNew:[]
        })
    }, [])
    function ToChooseUser(){
        const { history } = props;
        window.addPlanData = addPlanData;
        history.push({
            pathname: '/chooseUser/',
            state:{
              type:3
            }
        })
    }
     // 跳转选客户
    function selectCustomer(){
        window.visitObj = {};
        const { history } = props;
        window.addPlanData = addPlanData;
        window.planCheckedCus = addPlanData.chooseCustomer
        //跳转内部页面并传值
        history.push({
            pathname: '/selectCustomer/',
        })
    }

    function addPlanRequest(){
        const planDescInfo = [];
        addPlanData.chooseCustomer.map((e)=>{
            planDescInfo.push( {
                "customer_id":e.customer_id,
                "target_desc":"",
                "item_id":"",
                "related_userids":"",
                "plan_id":"",
                "cs_location_id":e.cs_location_id
            });
            return '';
        })
        addPlan({
            plan_date: addPlanData.date,
            planDescInfo:JSON.stringify(planDescInfo)
        }).then((res)=>{
            window.history.go(-1);
        })
    }
    console.log(addPlanData.date);
    return <div>

        <List className="my-list">
            <DatePicker
                value={new Date(addPlanData.date)}
                mode="date"
                onChange={dateStr => setAddPlanData({...addPlanData,...{date:moment(dateStr).format('YYYY-MM-DD')}})}
            >
                <Item
                    extra={addPlanData.date}>
                    出勤日期
                </Item>
            </DatePicker>
            <Item
                onClick={()=>ToChooseUser()}
                extra={addPlanData.chooseUser?addPlanData.chooseUser.name:''}>
                选择人员
            </Item>
            <Item
                onClick={()=>selectCustomer()}
                >
                出勤对象
            </Item>
        </List>
        {
            addPlanData.chooseCustomer.map((e,i)=>{
                return <div key={i}>
                    {e.customer_name?e.customer_name:''}
                </div>
            })
        }


        <a onClick={()=>addPlanRequest()} class="weui-btn weui-btn_primary">确定</a>
    </div>
}

export default AddPlan