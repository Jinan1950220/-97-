// $(function () {

//     let data = {
//         pagenum: 1,
//         pagesize: 2,//每页显示多少条数据
//         // cate_id:, //分类id
//         // state: '' //文章的状态  可选已发布 草稿
//     }
//     console.log(data);  
//     renderArticle();
//     function renderArticle() {
//         $.ajax({
//             url: '/my/article/list',
//             data: data,
//             success: function (res) {
//                 console.log(res);
//                 if (res.status === 0) {
//                     let str = template('list', res);
//                     $('tbody').html(str);
//                 }
//             }
//         })
//     }
//     template.defaults.imports.formatDate = (value) => {
//         let date = new Date(value);
//         let year = date.getFullYear();
//         let month = addZero(date.getMonth());
//         let day = addZero(date.getDate());
//         let hour = addZero(date.getHours());
//         let minute = addZero(date.getMinutes());
//         let second = addZero(date.getSeconds());
//         return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
//     }
//     addZero = (n) => {
//         return n < 10 ? '0' + n : n;
//     }
//     $('body').on('click', '.delete', function () {
//         let id = $(this).attr('data-id');
//         $.ajax({
//             url: '/my/article/cates' + id,
//             success: function (res) {
//                 layer.msg(res.message);
//                 if (res.status === 0) {

//                 }
//             }
//         })
//     })
// });


$(function () {
    // ---------------  获取所有的文章，并渲染到页面中 ---------------
    // 文章列表获取，定义请求参数
    let data = {
        pagenum: 1, // 页码值，1表示获取第1页的数据
        pagesize: 20, // 每页显示多少条数据
        // cate_id: , // 分类的id
        // state: '', // 文章的状态，可选 已发布 草稿
    };
    renderArticle();
    function renderArticle() {
        $.ajax({
            url: '/my/article/list',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status === 0) {
                    let str = template('list', res);
                    $('tbody').html(str);
                }
            }
        });
    }

    // ----------------  定义过滤器函数，处理时间 ------------------
    // template.defaults.imports.函数名 = function (value) { // value 就是使用过滤器的值 }
    template.defaults.imports.formatDate = function (value) {
        let date = new Date(value);
        let year = date.getFullYear();
        let month = addZero(date.getMonth() + 1);
        let day = addZero(date.getDate());
        let hour = addZero(date.getHours());
        let minute = addZero(date.getMinutes());
        let second = addZero(date.getSeconds());
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }
    // 创建一个补零函数
    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }

    // -----------  删除文章 ----------------------
    $('body').on('clivk', '.delete', function () {
        let id = $(this).attr('data-id');
        //询问是否要删除
        layer.confirm('是否要删除', (index) => {
            $.ajax({
                url: '',
                success: function () {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        renderArticle();
                    }
                }
            })
            layer.close(index);
        })

    })
    $('body').on('click', '.delete', function () {
        let id = $(this).attr('data-id');
        // 询问是否要删除
        layer.confirm('是否要删除呢？', function (index) {
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    layer.msg(res.message);
                    if (res.status === 0) {
                        // 重新渲染页面
                        renderArticle();
                    }
                }
            });
            layer.close(index);
        });

    });
});

