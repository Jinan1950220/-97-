$(function () {
    let form = layui.form;
    // 初始化富文本编辑器
    initEditor();

    // 实现封面图片初始的剪裁效果
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    let state = '已发布';
    //点击不同的按钮，切换state的值
    $('.fabu').click(() => state = '已发布')
    $('.caogao').click(() => state = '草稿')


    //监听表答案提交事件，调用接口 完成添加
    $('form').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData(this);
        // FormData也是根据表单各项的name属性获取值的
        fd.append('state', state);
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function (img) {
            fd.append('cover_img', img);
            console.log(fd);
            $.ajax({
                type: 'POST',
                url: '/my/article/add',
                data: fd,
                processData: false,
                contentType: false,
                success: function (res) {
                    console.log(res);
                    layer.msg(res.message);
                    if (res.status === 0) {
                        location.href = '/article/article.html';
                    }
                }
            })
        })
    })
    //  发送ajax请求。获取所有分类 渲染下拉框

    renderCategory = () => {
        $.ajax({
            url: '/my/article/cates',
            success: (res) => {
                if (res.status === 0) {
                    // 模板引擎  渲染结果
                    let str = template('cate', res);
                    $('select').html(str);
                    form.render();
                }
            }
        })
    }
    renderCategory();
    // 处理图片  点击封面 可以选择图片
    // 
    $('.chooseImage').click(() => {
        $('#file').click();
    })
    $('#file').change(function () {
        //找到文件对象
        let fileObj = this.files[0];
        console.log(fileObj);
        //沈城零时的url
        let url = URL.createObjectURL(fileObj);
        console.log(url);
        //销毁之前的剪裁区，更换图片，重新船舰剪裁区
        $image.cropper('destroy').attr('src', url).cropper(options);
    })
})

