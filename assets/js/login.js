$(function () {
    //入口函数
    //
    $('.login a').click(function () {
        $('.login').hide().next().show();
    });
    $('.register a').click(function () {
        $('.register').hide().prev().show();
    })
    let layer = layui.layer;
    //-------------------注册功能---------------
    $('.register form').on('submit', function (e) {
        e.preventDefault();
        console.log(this);
        let data = $(this).serialize();
        console.log(data);
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: data,
            success: (res) => {
                layer.msg(res.message);
                if (res.status === 0) {
                    localStorage.setItem('token', res.token);
                    $('.register').hide().prev().show();
                }
            }
        })
    })

    //------------------------登录-------------
    $('.login form').on('submit', function (e) {
        e.preventDefault();
        //获取账号与密码
        // 提交接口，完成登录 跳转到对于的界面
        let data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,//检查表单那么的属性值
            success: function (res) {
                console.log(data);
                layer.msg(res.message);
                if (res.status === 0) {
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                }
            }
        })
    })
    //---------------------------表单验证-------------------------
    // 1.加载表单（from）模块
    let form = layui.form;
    // 2.使用form.verify()事件表单验证
    form.verify({
        //验证密码长度是6~12位
        // key:value
        // password:['正则表达式','验证不通过时的提示']
        // password: [/^\S{6,12}$/, '密码成都必须是6~12位，并且不能有空格']
        password: (value) => {
            if (!/^\S{6,12}$/.test(value)) {
                return '密码成都必须是6~12位，并且不能有空格!!!'
            }
        },
        repwd: (value) => {
            let pwd = $('.register input[name="password"]').val().trim();
            if (value !== pwd) {
                return '俩次密码不一致';
            }
        }
    })
})
