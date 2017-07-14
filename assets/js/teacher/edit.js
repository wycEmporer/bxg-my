/**
 * Created by 15850210542 on 2017/7/10.
 */
require(['../../assets/js/config.js'],function(){
    require(['jquery', '../../assets/js/common.js','../../assets/js/getarg.js', 'datepicker', 'validate', 'form', 'zh'], function ($,x,obj) {
        var $tcName=$('input[name="tc_name"]');
        var $tcJoinDate=$('input[name="tc_join_date"]');
        var $tcType=$('input[name="tc_Type"]');
        var $tcGender=$('input[name="tc_gender"]');

        var options={
            url:'/api/teacher/edit',
            type:'get',
            data:obj,
            success:function(info){
                console.log(info);
                if(info.code==200){
                    var obj=info.result;
                    $tcName.val(obj.tc_name);
                    $tcJoinDate.val(obj.tc_join_date);

                    $($tcType.find('option')[obj.tc_type]).attr('selected',true);

                    $($tcGender[obj.tc_gender]).attr('checked',true);

                }
            }
        };
        $.ajax(options);


        $('input[name="tc_join_date"]').datepicker({
            format:'yyyy/mm/dd',
            language:'zh-CN'
        });

        $('form').validate({
            submitHandler:function(){
                $('form').ajaxSubmit({
                    url:'/api/teacher/update',
                    type:'post',
                    data:{
                        tc_id:obj.tc_id
                    },
                    success:function(info){
                        if(info.code==200){
                            window.location.href='/bxg/bxg-my/views/teacher/list.html'
                        }
                    }
                });
            },
            rules:{
               tc_name:{
                   required:true,
                   rangelength:[2,20]
               },
               tc_join_data:{
                   required:true,
                   data:true
               }
            },
            messages:{
                tc_name:{
                    required:'����Ϊ��',
                    rangelength:'������2��4'
                },
            }
        });

    })
})