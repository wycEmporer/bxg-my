/**
 * Created by 15850210542 on 2017/7/11.
 */
require(['../../assets/js/config.js'],function() {
    require(['jquery',
            'template',
            'webuploader',
            '../../assets/js/package.js',
            '../../assets/js/common.js',
            'datepicker',
            'validate',
            'form'], function ($,template,WebUploader,pcd) {
        //获取个人资料,并展示
        var options={
            url:'/api/teacher/profile',
            type:'post',
            success:function(info){
               var html=template('temp',info);
                console.log(info);
                $('.settings').html(html);
                //initUploader();
                PCD2();
                tcJoinData();
                makerValidate();
            }
        };
        $.ajax(options);

        //上传头像(webuploader插件)
    function initUploader(){
        // 初始化Web Uploader
        var uploader = WebUploader.create({
            // 选完文件后，是否自动上传。
            auto: true,
            // swf文件路径
            swf: '/bxg/bxg.my/node_modules/webuploader/dist/Uploader.swf',
            // 文件接收服务端。
            server: '/api/uploader/avatar',
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#filePicker',
            // pick: '#upload',
            fileVal: 'tc_avatar',
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });

        uploader.on('uploadSuccess', function (xx, data) {
            console.log(arguments)
            $('.preview img').attr('src', data.result.path)
        })
    };

        //上传头像,原生js
        // 监听上传文件按钮的onchange事件(当选择了一个文件之后就会触发这个事件)
    $('.settings').on('change','#upfile',function(){
        nativaUploader();
    })
    function nativaUploader (){
        var fileInput=document.getElementById('upfile').files[0];
        var xhr=new XMLHttpRequest();
        xhr.open('post','/api/uploader/avatar');
        // 参数名: tc_avatar
        // 参数值: 就是选择的文件： fileInput
        // 使用FormDate对应我们的参数进行包装
        fd  = new window.FormData()
        var fd=new FormData();
        fd.append('tc_avatar',fileInput);
        xhr.send(fd);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                var data=JSON.parse(xhr.responseText);
                var img=document.querySelector('.preview img');
                img.src=data.result.path;
            }
        };
    };
    function nativaUploaderAjax (){
        var fileInput=$('#upfile')[0].files[0];
        var fd=new FormData();
        var options={
            url:'/api/uploader/avatar',
            type:'post',
            data:fd,
            progressData:false,
            ContentType:false,
            success:function(info){ 
                $('.preview img').attr('src',data.result.path);
            }
        }
    };



     //省市区三级联动   给省市区注册事件
     function PCD (){
        var $province=$('[name="tc_province"]')
        var $city=$('[name="tc_city"]')
        var $district=$('[name="tc_district"]');

         //渲染省(默认北京)
         var obj=pcd.p['000000'];
         var str='';
         for(var k in obj){
             str += `<option value="${k}">${obj[k]}</option>`
         }
         $province.html(str);

         //渲染默认北京的县区
         var select=$province.val();
         var obj=pcd.c[select];
         var str='';
         for(var k in obj){
             str+=`<option value='${k}'>${obj[k]}</option>`
         }
         $city.html(str);

         //渲染默认北京的县区
         var select=$city.val();
         var obj=pcd.d[select];
         var str='';
         for(var k in obj){
             str+=`<option value="${k}">${obj[k]}</option>`
         }
         $district.html(str);


         //点击省,获取市
         $province.on('change',function(){
             var select=$(this).val();
             var obj=pcd.c[select];
             var str='';
             for(var k in obj){
                 str+=`<option value='${k}'>${obj[k]}</option>`
             }
             $city.html(str);
         });


        //点击市,获取省
         $city.on('change',function(){
             var select=$(this).val();
             var obj=pcd.d[select];
             var str='';
             for(var k in obj){
                 str+=`<option value="${k}">${obj[k]}</option>`
             }
             $district.html(str);
         })
     };

     //省市区三级联动封装代码
     function PCD2 () {
         var $province=$('[name="tc_province"]');
         var $city=$('[name="tc_city"]');
         var $district=$('[name="tc_district"]');

         getOptions($province,'p','000000');
         getOptions($city,'c','110000');
         getOptions($district,'d','110100');

         function getOptions ($select,type,select){
             var obj=pcd[type][select];
             var str='';
             for(var k in obj){
                 str+=`<option value='${k}'>${obj[k]}</option>`
             }
             $select.html(str);
             $select.trigger('change');
         }

         $province.on('change',function(){
             getOptions($city,'c',$(this).val());
         });
         $city.on('change',function(){
             getOptions($district,'d',$(this).val());
         });

     }

    //  更新个人资料
    // 日期插件初始化
    function tcJoinData (){
         $('input[name="tc_join_date"]').datepicker({
            format:'yyyy-mm-dd',
            language:'zh-CN'
    });
    }
   // 表单验证    
    function makerValidate(){
    
        $('form').validate({
        submitHandler: function () {
            var options={
                 url: '/api/teacher/modify',
                type: 'post',
                data: {
                     tc_id: 872,
                     tc_hometown:''
                },
                success:function(info){
                    if(info.code==200){
                        window.alert('修改成功');
                    }
                }
            }
            $('form').ajaxSubmit(options);
        },
        rules:{
           tc_cellphone:{
                required:true,
               
           },

       },
        messages:{
           tc_cellphone:{
               required:'不能为空',
           }
       }
    });
    }
   



    });
})