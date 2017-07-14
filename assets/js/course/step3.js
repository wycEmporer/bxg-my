require(['../../assets/js/config.js','../../assets/js/common.js'],function(){
    require(['jquery',
            '../../assets/js/getarg.js',],
        function($,obj){
            lessonList();
            // 功能一,渲染课程列标
            function lessonList(){
                var options={
                    url:'/api/course/lesson',
                    data:obj,
                    success:function(info){
                        var list=info.result.lesson;
                    }
                };
                $.ajax(options);
            }
        })
})
