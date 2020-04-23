//判断，如果没有token 直接退出到login.html
// 不要放在入口函数里 直接源代码执行到这里 ，直接跳转
// 请求的路径不是login.html，并且还没有token  那么久跳转login.html
if (!localStorage.getItem('token') && !location.href.includes('/login.html')) {
    location.href = '/login.html';
}
$(() => {
    //      配置ajax选项
    $.ajaxPrefilter((options) => {
        /**
         * options = {
         * type:'',
         * url:'',
         * success:''
         * }
         */
        console.log(options);
        options.url = 'http://www.liulongbin.top:3007' + options.url;
        //以/my 开头的url 需要设置headers
        // if (options.url.indexOf('/my') > -1) {
        if (options.url.includes('/my')) {// includes  h6 新方法
            options.headers = {
                Authorization: localStorage.getItem('token')
            }
            //配置complete，ajax请求完成（不管成功还是失败），都会触发的一个函数
            options.complete = (xhr) => {
                // responseJSON
                if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                    //满足条件，说明用户没有登录，而且还访问了需要验证的接口
                    //清除token
                    localStorage.removeItem('token');
                    location.href = '/login.html';
                }
                console.log(xhr);
            }
        }
    })
})