$(() => {
    //  --------获取表单信息，为表单赋值(设置表单各项的默认值)-------
    let form = layui.form;
    renderForm = () => {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            success: (res) => {
                console.log(res);
                // { id,username,nickname,email}
                // $('input[name="id"]').val(res.data.id);
                // $('input[name="nickname"]').val(res.data.nickname);
                // $('input[name="username"]').val(res.data.username);
                // $('input[name="email"]').val(res.data.email);
                form.val('user', res.data);
                // 为表单赋值，对象是有要求的，对象的key要和表单各项的name属性相同
            },
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    };
    renderForm();
    //------------完成用户信息的更新--------------
    // 1.注册表单的提交事件
    $('form').on('submit', (e) => {
        // 2.阻止默认行为
        e.preventDefault();
        // 3.手机表单数据
        let data = form.val('user');
        console.log(data);
        // 4.ajax提交数据给接口
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            data: data,
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: (res) => {
                // console.log(res);
                if (res.status === 0) {
                    layer.msg(res.message);
                    // 5.修改成功，给出提示，使用getUserInfo函数，重新渲染index.html
                    window.parent.getUserInfo();
                }
            }
        })
    });
})