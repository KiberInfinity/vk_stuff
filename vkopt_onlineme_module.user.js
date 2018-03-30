// ==UserScript==
// @name         vkopt online module
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  "Вечный" онлайн пока открыт браузер с вкладкой вк.
// @author       KiberInfinity
// @match        https://vk.com/*
// @grant        none
// ==/UserScript==

(function() {
    vkopt['onlineme'] = {
        interval: 5 * 60 * 1000,
        oto: 0,
        onInit: function(){
            vkopt.onlineme.setOnline();
        },
        onLocation: function(nav_obj, cur_module_name){
            vkopt.onlineme.setOnline();
        },
        onCmd: function(data){
            if (data.act == 'onlineme')
                vkopt.onlineme.reset_timeout();
        },
        reset_timeout: function(){
            clearTimeout(vkopt.onlineme.oto);
            vkopt.onlineme.oto = setTimeout(vkopt.onlineme.setOnline, vkopt.onlineme.interval);
        },
        setOnline: function(){
            vkopt.onlineme.reset_timeout();
            dApi.call('account.setOnline',{v:'5.73'}, function(){
                vkopt.cmd({act:'onlineme'});
            });

        }
    };

   window.vkopt = (window.vkopt || {});
   if (window.vkopt_core_ready) vkopt_core.plugins.delayed_run('onlineme');
})();
