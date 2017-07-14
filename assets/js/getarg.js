/**
 * Created by 15850210542 on 2017/7/11.
 */
define(function(){
    var search=window.location.search;
    var query=search.split('?')[1]||'';
    var arr=query.split('&')||'';
    var obj={};
    arr.forEach(function(v){
        var key=v.split('=')[0];
        var value=v.split('=')[1];
        obj[key]=value;
    })

    return obj;

})