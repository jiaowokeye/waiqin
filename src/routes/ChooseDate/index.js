import React,{useState,useEffect} from 'react';
import { DatePickerView } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
import * as css from './index.module.css';
import moment from 'moment';
function ChooseGroup(props){
    const [value,setValue] = useState(new Date());
    const [type, setType] = useState(1);
    console.log(type);
    function onChange(date){
        setValue(date);
    }
    function handleOk(){
        // window.chooseDate = moment(value).format('YYYY-MM-DD');
        // window.history.go(-1);
        const { history } = props;
        switch(type){
            case 1://记录
                history.push({
                    pathname: '/visitLog/',
                    state:{
                        menuType:'2',
                        data:moment(value).format('YYYY-MM-DD')
                    }
                })
                break;
            case 2://计划
                history.push({
                    pathname: '/plan/',
                    state:{
                        menuType:'2',
                        data:moment(value).format('YYYY-MM-DD')
                    }
                })
                break;
        }
    }
    
    useEffect(() => {
      const { history } = props;
      if(history.location.state){
        setType(history.location.state.type);
      }
    }, [])
    return <div className={css.page}>
        <DatePickerView
            value={value}
            onChange={(date)=>onChange(date)}
            mode="date"
            locale={enUs}
        />
         <div class="page__bd page__bd_spacing">
            <div id="btns" class="weui-btn-area_fixed">
                <a onClick={()=>window.history.go(-1)} class="weui-btn weui-btn_default">取消</a>
                <a onClick={()=>handleOk()} class="weui-btn weui-btn_primary">确定</a>
            </div>
         </div>
    </div>
}

export default ChooseGroup;