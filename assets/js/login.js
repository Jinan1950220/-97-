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
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: data,
            success: (res) => {
                layer.msg(res.message);
                if (res.status === 0) {
                    $('.register').hide().prev().show();
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
            let pwd = $('input[name="password"]').val().trim();
            if (value !== pwd) {
                return '俩次密码不一致';
            }
        },

    })
})