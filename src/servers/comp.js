//
import Request from './../utils/request';

// 新增客户
export async function customerModify(params) {
    return Request('comp/customer/basic.do?modify', params);
}
// 客户列表
export async function customerFind(params) {
    return Request('comp/customer/basic.do?find', params);
}

// 客户联系人
export async function connectionQuery(params) {
    return Request('comp/connection/basic.do?query', params);
}

// 拜访开始
export async function visitAdd(params) {
    return Request('comp/customer/visit.do?add', params);
}


// 获取人员树
export async function getTree(params) {
    return Request('comp/group.do?getTree', params);
}

// 获取计划列表
export async function getPlanList(params) {
    return Request('customer/visit/plan.do?find', params);
}
// 获取拜访列表
export async function getVisitList(params) {
    return Request('comp/customer/visit.do?findDetail', params);
}
// 2.16.19获取管理的人员的拜访信息和拜访计划信息
export async function getManagerInfo(params) {
    return Request('comp/customer/visit.do?getManagerInfo', params);
}
// 2.16.21获取某人日拜访信息
export async function getInfoByUser(params) {
    return Request('comp/customer/visit.do?getInfoByUser', params);
}
// 获取拜访列表
export async function getVisitFind(params) {
    return Request('comp/customer/visit.do?find', params);
}

// 新增计划
export async function addPlan(params) {
    return Request('customer/visit/plan.do?add', params);
}




// 根据部门获取人员
export async function getUserGroupInfo(params) {
    return Request('comp/group.do?getUserGroupInfo', params);
}


// 结束拜访
export async function checkout(params) {
    return Request('comp/customer/visit.do?checkout', params);
}
//comp/customer/visitparts.do?list
export async function visitpartsList() {
    return Request('comp/customer/visitparts.do?list');
}

// 互动列表
export async function replyList(params) {
    return Request('comp/reply.do?list',params);
}


// 互动添加
export async function replyAdd(params) {
    return Request('comp/reply.do?add',params);
}

// 拜访头
export async function queryVisitHead(params) {
    return Request('comp/customer/visit.do?queryVisitHead',params);
}
