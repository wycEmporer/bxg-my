require(['../../assets/js/config.js','../../assets/js/common.js'],function(){
    require(['jquery','../../assets/js/getarg.js','template','validate','form'],function($,obj,template){
        getCourseInfo();
        // 功能一:获取信息并渲染
    function getCourseInfo (){
        var options={
            url:'/api/course/basic',
            data:obj,
            success:function(info){
                if(info.code==200){
                    console.log(info);
                    var html=template('temp',info);
                    $('.content').html(html);
                    diodeJoint();
                    validateInit();
                }
            }
        };
        $.ajax(options);
    }
     // 功能二:实现二级联动
        // 注册一级分类change事件
    function diodeJoint(){
        $('#top').on('change',function(){
        console.log(111)
        var cgId=$(this).val();
        console.log(cgId)
        var options={
            url:'/api/category/child',
            data:{
                cg_id:cgId
                },
            success:function(info){
                console.log(info.result);
                var result=info.result;
                var str='';
                for(var k in result){
                    console.log(k);
                    str+='<option value="'+result[k].cg_id+'">'+result[k].cg_name+'</option>'
                }
                $('#child').html(str);
            }
        };
        $.ajax(options);
        }) 
    }

    //  表单验证
    function  validateInit(){
       console.log(obj);
        var options={};
        options.submitHandler=function(){
            var options={
                url:'/api/course/update/basic',
                type:'post',
                data:obj,
                success:function(info){
                    if(info.code==200){
                        console.log(info);
                        window.location.href='/bxg/bxg-my/views/course/step2.html?cs_id='+info.result.cs_id
                    }
                }
            };
            $('form').ajaxSubmit(options);
        },
        options.rules={

        },
        options.messages={

        },
        $('form').validate(options);
            
    };
       
    })
})