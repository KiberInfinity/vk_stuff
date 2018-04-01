// ==UserScript==
// @name         vkopt_suggblock_module
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  vkopt suggester save history blocker
// @author       KiberInfinity
// @match        *://vk.com/*
// @grant        none
// ==/UserScript==

vkopt['suggester_block'] = {
    onSettings:{
        Extra:{
            dont_save_suggester_history:{
                default_value: true
            }
        }
    },
    onRequestQuery: function(url, query, options){
        if (/al_search\.php/.test(url) && query && query.act =='save_history_item' && vkopt.settings.get('dont_save_suggester_history')){
            vkopt.log('Catch & block suggester:', query);
            return false;
        }
    }
};

window.vkopt = (window.vkopt || {});
if (window.vkopt_core_ready) vkopt_core.plugins.delayed_run('suggester_block');
