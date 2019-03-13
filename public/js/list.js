$(function () {
    $('.del').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id' + id);

        $.ajax({
            type: 'DELETE',
            url: '/product/list?id=' + id,
            dateType: 'text',
            success: function (res) {
                if(res.code === 200){
                    if (tr.length > 0){
                        tr.remove()
                    }
                    window.location.reload(false)
                }
            },
            error: function (res) {
                console.log(res.message)
            }
        })

    })
});