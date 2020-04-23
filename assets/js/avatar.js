$(() => {
    $('#chooseImage').click(() => {
        $('#file').click();
    })
    //-------------创建裁剪区------------------
    let image = $('#image');
    let option = {
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    image.cropper(option);
    //当文件域的内容改变的时候 跟换图片
    $('#file').change(() => {
        //找到选择的图片
        // console.log($('#file')[0].files[0]);
        // console.log(this);
        let fileObj = $('#file')[0].files[0];
        // console.log(fileObj);
        let url = URL.createObjectURL(fileObj);
        //根据文件对象生成一个临时的url  用于访问被选择的图片
        image.cropper('destroy').attr('src', url).cropper(option);
    })
    $('.sure').click(() => {
        let i = image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        });
        let str = i.toDataURL();
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: { avatar: str },
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    window.parent.getUserInfo()
                }

            }
        })
    })
})