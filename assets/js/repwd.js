$(() => {
    //-----------------表单验证---------------
    let form = layui.form;
    form.verify({
        //key :value
        //验证规则：[]
        //验证规则：function

        //长度  6-12
        len: [/^\S{6,12}$/, '长度必须6-12位，不能有空格'],
        //验证新密码不能和原密码相同
        diff: (value) => {
            // value 表示新密码

            let oldPwd = $('.oldPwd').val();
            if (value === oldPwd) {
                return '新密码不能与原密码相同'
            }
        },
        same: (value) => {
            //   value 表示新密码
            let newPwd = $('.newPwd').val();
            if (newPwd !== value) {
                return '俩次密码不一致';
            }
        }
        //验证俩次密码必须相同
    })
    $('form').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $('form').serialize(),
            success: (res) => {
                console.log(res);
                layer.msg(res.message);
                if (res.status === 0) {
                    $('button[type="reset"]').click();
                }
            }
        })
    })
})