
require(['../../assets/js/config.js'],function(){
   require(['../../assets/js/index/login.js','jquery','cookie'],function(){
    var $btn=$('#btn')
   
    $btn.on('click',clickHandle);

    function clickHandle (e){
        e.preventDefault();
        var name=$('#name').val();
        var passWord=$("#pass").val();
        if(!name.trim()||!passWord.trim()){
            return;
        }
        var option={
            url:'/api/login',
            type:'post',
            data:{
                tc_name:name,
                tc_pass:passWord
            },
            success:function(info){
                console.log(info);
                if(info.code===200){
                    $.cookie('userinfo', JSON.stringify(info.result), {expires: 7, path: '/'})
                    window.location.href='/bxg/bxg-my/views/index/dashboard.html'
                }
            }
        }
        $.ajax(option);
    }
}) 
})
