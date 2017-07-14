
 /*
 * 讲师列表页面
 * 功能一:获取讲师信息并展示
 * 功能二:点击查看,展示讲师详细信息
 * 功能三:注销或者启用
 * */
 require(['../../assets/js/config.js'],function(){
       require(['jquery','template','bootstrap','../../assets/js/common.js'],function($,template){
           getTeacherList();
           getDetailInfo();
           stopOrStart();
           //功能一:获取讲师信息并展示
           function getTeacherList(){
               var options={
                   url:'/api/teacher',
                   type:'get',
                   success:function(info){
                       if(info.code===200){
                           console.log(info)
                           var html=template('tmpl-list',info)
                           $('#list').html(html);
                       }else{
                           alert("没得到数据")
                       }
                   },
                   error:function(){
                       alert('出错了')
                   }
               };
               $.ajax(options);
           };
           //功能二:点击查看,展示讲师详细信息
           function getDetailInfo (){
               $('#list').on('click','.preview',function(){
                   //弹出模态框
                 $('#teacherModal').modal();
                //发送请求,获取教师详细信息
                var tcId=$(this).closest('tr').attr('tc-id');
                   console.log(tcId);
                   var options={
                       url:'/api/teacher/view',
                       type:'get',
                       data:{
                           tc_id:tcId
                       },
                       success:function(info){
                           console.log(info);
                           if(info.code===200){
                               var obj=info.result;
                               var html=`<tr>
                                <th>姓名:</th>
                                <td>${obj.tc_name}</td>
                                <th>职位:</th>
                                <td colspan="3">讲师</td>
                                <td rowspan="4" width="128">
                                    <div class="avatar">
                                        <img src="${obj.tc_avatar}" alt="">
                                    </div>
                                </td>
                            </tr>
                                        <tr>
                                            <th>花名:</th>
                                            <td>${obj.tc_roster}</td>
                                            <th>年龄:</th>
                                            <td colspan="3">${getAge(obj.tc_birthday)}</td>
                                        </tr>
                                        <tr>
                                            <th>性别:</th>
                                            <td>${obj.tc_gender==0?'男':'女'}</td>
                                            <th>出生日期:</th>
                                            <td colspan="3">${obj.tc_birthday}</td>
                                        </tr>
                                        <tr>
                                            <th>手机号码:</th>
                                            <td colspan="2">${obj.tc_cellphone}</td>
                                            <th>邮箱:</th>
                                            <td colspan="2">${obj.tc_email}</td>
                                        </tr>
                                        <tr>
                                            <th>籍贯:</th>
                                            <td colspan="6">${obj.tc_hometown}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="7">
                                                <div class="introduce">
                                                    ${obj.tc_introduce}
                                                </div>
                                            </td>
                                        </tr>`;

                               $('#modal-list').html(html);
                           }
                       },
                       error:function(){
                           alert('粗错了')
                       }
                   };
                   $.ajax(options);
               })
           };
           //功能三:注销或者启用
            function stopOrStart(){
                $('#list').on('click','.start-stop',function(){
                    var $this=$(this);
                    var $tr=$this.closest('tr');
                    var tcId=$tr.attr('tc-id');
                    var tcStatus=$tr.attr('tc-status');
                    var options = {
                        url: '/api/teacher/handle',
                        type: 'post',
                        data: {
                            tc_id: tcId,
                            tc_status: tcStatus
                        },
                        success:function(info){

                            if(info.code===200){
                                console.log(info.result.tc_status)
                                var str=info.result.tc_status=='0'?'注销':'启用';
                                console.log(str)
                                $tr.attr('tc-status',info.result.tc_status);
                                $this.text(str)
                            }
                        },
                        error:function(){
                            alert('粗错了')
                        }
                    }
                    $.ajax(options);

                })

            }


            //传入出生日期,返回年龄
           function getAge(birth){
               var birthYear=new Date(birth).getFullYear();
               var nowYear=new Date().getFullYear();
               return nowYear-birthYear
           };
           //过滤器,给模板提供方法
           //让所有的template模板中可以使用这个getTecAge方法
           // template.defaults.imports是固定的
           template.defaults.imports.getTecAge=getAge;
       }) 
    });