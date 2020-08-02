import React from 'react';
import UserTree from './../../components/Tree/index'
class ChooseGroup extends React.Component{
    state = {
        type:1
    }
    componentDidMount(){
        HWH5.navTitle({ title: '指定部门' });
        const { history } = this.props;
        if(history.location.state){
            this.setState({
                type:history.location.state.type
            })
        }
    }
    selectCallBack=(keys,data)=>{
        window.chooseGroup = data;
        const { history } = this.props;
        switch(this.state.type){
            case 1://记录
                history.push({
                    pathname: '/visitLog/',
                    state:{
                        menuType:'3',
                        data:data
                    }
                })
                break;
            case 2://计划
                history.push({
                    pathname: '/plan/',
                    state:{
                        menuType:'3',
                        data:data
                    }
                })
                break;
            case 3://快览
                history.push({
                    pathname: '/quickView/',
                    state:{
                        menuType:'3',
                        data:data
                    }
                })
                break;
        }
    }
    render(){
        const stype = this.props.history.location.state&&this.props.history.location.state.stype?this.props.history.location.state.stype:0
       return <UserTree include_type={0} stype={stype} selectCallBack={this.selectCallBack}/>
    }    
}

export default ChooseGroup;