import React from 'react';
import {getTree} from './../../servers/comp';
import { Tree } from 'antd';
import * as css from './index.module.css';
import './../../../node_modules/antd/lib/tree/style/css'
const { TreeNode } = Tree;

class UserTree extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:[]
        }
    }
    componentDidMount(){
        const {include_type=-1,stype=0} = this.props;
        getTree({
            member_type: -1,
            group_id: 0,
            ismine: 1,
            isPlat: 1,
            include_type:include_type,
            stype: stype,
            comp_id: 0,
        }).then((res)=>{
            this.setState({
                list:res.data
            })
        })
    }
    
    renderTreeNodes = (data)=>
        data.map((item,i) => {
            // if (item.children) {
            //     return (
            //         <TreeNode title={item.groupname}
            //             key={item.groupId}
            //             dataRef={item}
            //             icon={<span></span>}
            //             checkable={false}
            //         >
            //             {
            //                 item.compUserList.map((e)=>{
            //                     return <TreeNode title={e.name}
            //                     key={''+e.user_id}
            //                     dataRef={e}
            //                     icon={<span></span>}
            //                     checkable={true}
            //                 />
            //                 })
            //             }
            //             {renderTreeNodes(item.children)}
            //         </TreeNode>
            //     );
            // }
            return  <TreeNode title={item.groupname}
                        key={item.groupId}
                        dataRef={item}
                        icon={<span></span>}
                    >
                        {
                            item.compUserList.map((e)=>{
                                return <TreeNode title={<div>
                                    {
                                        e.extInfo.photo?<img className={css.headerPhoto} src={e.extInfo.photo}/>:<i class="icon-nav icon-nav-headPortrait"></i>
                                    }
                                    
                                    {e.name}
                                </div>}
                                key={''+e.user_id}
                                dataRef={e}
                                icon={<span></span>}
                            />
                            })
                        }
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
        });
    onSelect=(selectedKeys,e)=>{
        const {include_type=-1} = this.props;
        if((include_type===-1&&e.node.dataRef.user_id)||(include_type===0&&e.node.dataRef.groupId)){
            this.props.selectCallBack(selectedKeys,e.node.dataRef);
        }
        
    }
    render(){
        const {list} = this.state;
        return <div>
        <Tree showIcon={true} checkable={false} onSelect={this.onSelect} > 
            {
                this.renderTreeNodes(list)
            }
        </Tree>
      
    </div>
    }    
   
}

export default UserTree;