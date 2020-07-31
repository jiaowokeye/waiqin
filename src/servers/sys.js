//
import Request from '../utils/request';

// 码表
export async function codeitemList(params) {
    return Request('sys/codeitem.do?list', params);
}

