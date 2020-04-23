$(() => {
    // 加载layer模块
    let layer = layui.layer;
    $('#logout').click(() => {
        layer.confirm('确定要离开吗？', { icon: 3, title: '提示' }, (index) => {
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer(index);
        })
    })
    //-------------------------获取用户信息---------------------
    getUserInfo();

})
var getUserInfo = () => {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: (res) => {
            // console.log(res);
            if (res.status === 0) {
                //渲染页面
                // 1.欢迎你 用户名（优先使用nickname 没有的花 使用username）
                let name = res.data.nickname || res.data.username;
                $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
                // 2.头像(优先使用图片 没有图片 优先使用那么)
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic);
                    //让图片显示，让文字隐藏
                    $('.layui-nav-img').show();
                    $('.text-avatar').hide();
                } else {
                    let w = name.substr(0, 1).toUpperCase();
                    $('.text-avatar').text(w).show().css('display', 'inline-block');
                    $('.layui-nav-img').hide();
                }
            }
        }
    })
}
