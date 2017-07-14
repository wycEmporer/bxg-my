require(['../../assets/js/config.js','../../assets/js/common.js'],function(){
    require(['jquery'],function($){
       $('#btn').on('click',function(e){
           e.preventDefault();
           var csName=$('#cs_name').val();
           console.log(111)
           var options={
               url:'/api/course/create',
               type:'post',
               data:{
                   cs_name:csName
               },
               success:function(info){
                   if(info.code==200){
                       console.log(info.result.cs_id)
                       window.location.href='/bxg/bxg-my/views/course/step1.html?cs_id='+info.result.cs_id
                   }
               }

           }
           $.ajax(options);
       })
    })
})