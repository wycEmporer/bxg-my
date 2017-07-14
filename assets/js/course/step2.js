require(['../../assets/js/config.js','../../assets/js/common.js'],function(){
    require(['jquery',
            '../../assets/js/getarg.js',
            'webuploader',
            'jcrop'],
        function($,obj,WebUploader){
            var coords={};
            uploadAvatarPlugin();
            subCoords();
            // 功能一:上传图片
            function  uploadAvatarPlugin(){
                var uploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: true,
                // swf文件路径
                // swf: BASE_URL + '/js/Uploader.swf',
                swf: '/bxg/bxg-my/node_modules/webuploader/dist/Uploader.swf',
                // 文件接收服务端。
                // server: 'http://webuploader.duapp.com/server/fileupload.php',
                // server: 'http://api.botue.com/uploader/avatar',
                server: '/api/uploader/cover',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#filePicker',
                formData: obj,
                // pick: '#upload',
                fileVal: 'cs_cover_original', // 参数名
                // 只允许选择图片文件。
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png'
                    // mimeTypes: 'image/*'
                }
                })
                uploader.on('uploadSuccess',function(xx ,data){
                $('.preview img').attr('src',data.result.path)
                .on('load',function(){
                    jcropInit();
                })
                })
            }

            // 功能二 实现裁剪功能(上传成功后调用)
            function jcropInit(){
                var options={
                    boxWidth:300,//设置图片的宽度
                    aspectRatio:1.618,//长宽的比例
                    onSelect:function(c){
                        coords=c
                    }
                };
                $('.preview img').Jcrop(options,function(){
                    // 设置默认选择的
                    this.setSelect([0,20,100,400])
                })
            }

            // 功能三:点击裁切按钮,把坐标发给服务器
            function subCoords(){
                $('#sub').on('click',function(){
                    console.log(111)
                    coords.cs_id=obj.cs_id;
                    var options={
                        url:'/api/course/update/picture',
                        type:'post',
                        data:coords,
                        success:function(info){
                            if(info.code==200){
                                window.location.href='/bxg/bxg-my/views/course/step3.html?cs_id='+obj.cs_id
                            }
                        }
                    };
                    $.ajax(options);
                })
            }

    })
})