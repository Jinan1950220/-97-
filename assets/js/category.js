$(() => {
    //------------ajax请求类别列表------------
    renderHtml();
    function renderHtml() {
        $.ajax({
            url: '/my/article/cates',
            success: (res) => {
                let str = template('list', res);
                $('tbody').html(str);
            }
        })
    }
    //点击添加类别的时候 显示弹出层
    // 点击弹出层中的确认添加，发送ajax请求，完成添加类别 
    $('#addBtn').click(() => {
        add_id = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['420px', '240px'],
            content: $('#add').html()//  可以使用字符串，亦可以使用DOM
        })
    })
    //表单时动态创建的元素 必须使用事件委托的方式
    $('body').on('submit', '#addform', function (e) {
        e.preventDefault();
        // alert(1)
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderHtml();
                    layer.close(add_id);
                }
            }
        })
    })
    $('body').on('click', '.delete', function () {
        let that = $(this);
        layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {

            let id = that.attr('data-id');
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: (res) => {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        renderHtml();
                    }
                }

            })
            layer.close(index);
        })
        //获取id

    })
    //-----------点击编辑，显示弹出层-------------
    let form = layui.form;
    $('body').on('click', '.edit', function () {
        let id = $(this).attr('data-id');
        let name = $(this).attr('data-name');
        let alias = $(this).attr('data-alias');
        edit_id = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['420px', '240px'],
            content: $('#edit').html(),//  可以使用字符串，亦可以使用DOM
            success: function () {
                form.val('editform', { id, name, alias })
            }
        });

    });
    $('body').on('submit', '#editform', function (e) {
        e.preventDefault();
        // let data = $(this).serialize();
        // data = data.repalce('id', 'Id')
        let data = $(this).serializeArray();
        data[0].name = 'Id';
        // alert(1)
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: data,
            success: (res) => {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderHtml();
                    layer.close(edit_id);
                }
            }
        })
    })
})


