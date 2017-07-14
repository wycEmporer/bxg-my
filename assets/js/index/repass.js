require(['../../assets/js/config'],function(){
    require(['jqurey','../../assets/js/common.js'],function($){
        $('#btn').on('click',function(){
            var oldPass=$('#oldPass').val();
            var newPass=$('#newPass').val();
            var pass=$('#pass').val();
            var options={
                url:'/api/teacher/repass',
                type:'post',
                data:{
                    tc_pass:oldPass,
                    tc_new_pass:newPass
                },
                success:function(info){
                    if(info.code==200){
                        window.location.href='/bxg/bxg-my/views/index/settings.html'
                    }
                }
            }
            $.ajax(options);
        })
    })
})