import React from 'react';
import UserTree from './../../components/Tree/index'
class ChooseGroup extends React.Component{
    state = {
        type:1
    }
    componentDidMount(){
        HWH5.navTitle({ title: '指定人员' });
        const { history } = this.props;
        if(history.location.state){
            this.setState({
                type:history.location.state.type
            })
        }
    }
    selectCallBack=(keys,data)=>{
        window.chooseUser = data;
        const { history } = this.props;
        switch(this.state.type){
            case 1://记录
                history.push({
                    pathname: '/visitLogUser/',
                    state:{
                        menuType:'4',
                        data:data
                    }
                })
                break;
            case 2://计划
                history.push({
                    pathname: '/plan/',
                    state:{
                        menuType:'4',
                        data:data
                    }
                })
                break;
            case 3://添加计划
                window.chooseUser = data;
                history.push({
                    pathname: '/addPlan/',
                    state:{
                        menuType:'4',
                        data:data
                    }
                })
                break;
        }
    }
    render(){
       return <UserTree selectCallBack={this.selectCallBack}/>
    }    
}

export default ChooseGroup;