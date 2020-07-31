import Request from './../utils/request';

export async function verify(params) {
    return Request('comp/user.do?verify', params);
}