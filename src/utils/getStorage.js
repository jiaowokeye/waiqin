import isIOS from './isiOS';
// 获取缓存
const GetStorage = async (name)=>{
    return new Promise((resolve, reject)=>{
        if(!isIOS){
            HWH5.getStorage({
                key: name,
                isolation: 1
              }).then(data => {
                resolve(data);
            })
        }else{
            HWH5.getStorage(name).then(data => {
                resolve(data);
            })
        }
    })
}

export default GetStorage;


function WelinkEncodeURI(str){
    if(isIOS){
        return encodeURI(str);
    }else{
        return encodeURI(encodeURI(str));
    }
}
export {
    WelinkEncodeURI
}