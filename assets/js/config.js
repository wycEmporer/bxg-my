require.config({
    baseUrl:'/bxg/bxg-my/node_modules',
    paths:{
        jquery:'./jquery/dist/jquery',
        cookie:'./jquery.cookie/jquery.cookie',
        NProgress:'./nprogress/nprogress',
        template:'./art-template/lib/template-web',
        bootstrap:'./bootstrap/dist/js/bootstrap',
        datepicker:'./bootstrap-datepicker/js/bootstrap-datepicker',
        zh: './bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
        validate:'./jquery-validation/dist/jquery.validate',
        form:'./jquery-form/dist/jquery.form.min',
        webuploader:'./webuploader/dist/webuploader',
        jcrop:'/bxg/bxg-my/assets/jcrop/js/jquery.Jcrop'
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        zh:{
            deps:['jquery','datepicker']
        },
    }

})