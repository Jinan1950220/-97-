$(() => {
    //------------ajax请求类别列表------------
    renderHtml();
    function renderHtml(){
        $.ajax({
            url: '/my/article/cates',
            success: (res) => {
                let str = template('list', res);
                $('tbody').html(str);
            }
        })
    }
})


