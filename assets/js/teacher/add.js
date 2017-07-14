/**
 * Created by 15850210542 on 2017/7/10.
 */
require(['../../assets/js/config.js'],function(){
    require(['jquery', '../../assets/js/common.js', 'datepicker', 'validate', 'form', 'zh'], function ($) {

        //日期插件初始化
        $('input[name="tc_join_date"]').datepicker({
            format:'yyyy/mm/dd',
            language:'zh-CN'
        });

        $('form').validate({
            submitHandler:function(){
                $('form').ajaxSubmit({
                    url: '/api/teacher/add',
                    type: 'post',
                    success: function (info) {
                        if (info.code === 200) {
                            console.log(info)
                            window.alert('添加成功！')
                            window.location.href='/bxg/bxg-my/views/teacher/list.html';
                        }
                    }
                })
            },

            rules:{
                tc_name:{
                    required:true,
                    rangelength:[2,20]
                },
                tc_pass:{
                    required:true
                },
                tc_join_data:{
                    required:true,
                    data:true
                }
            },
            messages:{
                tc_name:{
                    required:'不能为空',
                    rangelength:'长度要在2-4为'
                },
                tc_pass:{
                    required:'密码不能为空'
                },
            }
        });
    })
})