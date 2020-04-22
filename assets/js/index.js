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
})