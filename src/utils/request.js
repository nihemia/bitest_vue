
import axios from 'axios'


//创建axios对象
const request=axios.create({
    //注意：此处是要写后端的接口8083，本前端端口是8080
    //因为后端WebMvcConfigurer类统一为url加了/api前缀，则baseURL需要添加8083/api
    baseURL: 'http://localhost:8083/api',
    timeout: 5000,
    //视频没有，deepskear添加
    withCredentials: true // 关键：允许携带cookie等凭证
})

//request 拦截器
//可以自请求发送前对请求做一些处理
//比如统一加token，对请求参数同一加密
request.interceptors.request.use(config=> {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    //统一获取token
    const user=localStorage.getItem("user");
    // if(user){
    //     config.headers['token']=JSON.parse(user).token;
    // }

    if (user) {
        try {
            const users = JSON.parse(user);
            // 检查token是否存在
            if (users?.token) {
                config.headers.token = users.token;
                console.debug('[AXIOS] Token已附加:', users.token.substring(0,10) + '...');
            }
        } catch (e) {
            console.error("解析user数据失败:", e);
            // 清除无效数据
            localStorage.removeItem("user");
        }
    }


    // const userStr = localStorage.getItem("user");
    // if (userStr) {
    //视频没有，deepskear添加
    //     try {
    //         const user = JSON.parse(userStr);
    //         // 双重验证token存在性
    //         if (user.token && typeof user.token === 'string') {
    //             config.headers.token = user.token;
    //             console.debug('[AXIOS] Token已附加:', user.token.substring(0,10)+'...');
    //         }
    //     } catch (e) {
    //         console.error("解析user数据失败:", e);
    //     }
    // }
    return config

},error=>{
    return Promise.reject(error)
});

//response 拦截器
//可以在接口响应后统一处理结果
request.interceptors.response.use(response=>{
    //response.data即为后端返回的Result
    let res=response.data;
    //兼容服务器端返回的字符串数据
    if(typeof res=='string'){
        res=res?JSON.parse(res):res
    }
    return res;
},error=>{
    console.log('error'+error)
    return Promise.reject(error)
})

export  default request