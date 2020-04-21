$(function () {
    //入口函数
    //
    $('.login a').click(function () {
        $('.login').hide().next().show();
    });
    $('reguster a').click(function () {
        $('.register').hide().prew().show();
    })
})