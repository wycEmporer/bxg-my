/**
 * 要完成的功能
 * 功能一:判断用户是否登陆
 * 功能二:从cookie读取用户信息,并展示
 * 功能三:导航菜单交互:展示预收起
 * 功能四:退出登陆
 * 功能五:页面打开时有进度条,每个ajax发送有进度
 *
 */

define(['jquery','NProgress','cookie'],function($,NProgress){
    NProgress.start();
    validSignIn();
    getInfo();
    navToggle();
    signOut();
    globalAjaxEvent();
    // 功能一:判断用户是否登陆
    function validSignIn(){
        // 取出cookie中的id值
        var sessionId=$.cookie('PHPSESSID');
        if(!sessionId){
            window.location.href='/bxg/bxg-my/views/index/login.html'
        }
    }


    // 功能二:从cookie读取用户信息,并展示
    function getInfo(){
        var userInfo=JSON.parse($.cookie('userinfo'));
        $('.profile img').attr('src',userInfo.tc_avatar)
        $('.profile h4').text(userInfo.tc_name);
    }


    // 功能三:导航菜单交互:展示预收起
    function navToggle(){
        $('.navs li a').on('click',function(e){
            $(this).next('ul').slideToggle();
        })
    }

    
    // 功能四:退出登陆
    function signOut (){
        $('.fa-sign-out').closest('li').on('click',clickHander)
        function clickHander (e){
            var options={
                url:'/api/logout',
                type:'post',
                success:function(info){
                    console.log(info)
                    if(info.code==='200'){
                        console.log('fff')
                        window.location.href='/bxg/bxg-my/views/index/login.html'
                    }
                }
            };
            $.ajax(options);
        }

    }
    // 功能五:页面打开时有进度条,每个ajax发送有进度
    function globalAjaxEvent(){
        $(document).ajaxStart(function(){
            NProgress.start();
        })
        $(document).ajaxStop(function(){
            NProgress.done();
        })
    }
    $(function(){
        NProgress.done();
    })


})