// ==UserScript==
// @name         EmojiAcs [vkopt module]
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Увеличение размеров блока со стикерами и отключение его автоматического скрытия при убирании курсора
// @author       KiberInfinity
// @match        https://vk.com/*
// @grant        none
// ==/UserScript==



window.vkopt = (window.vkopt || {});
vkopt['emoji_acs'] = {
   css: function(){
      return vk_lib.get_block_comments(function(){
         /*css:
         .emoji_tabs {
             zoom: 1.5;
         }

         .emoji_tt_wrap {
             width: 573px;
             right: -48px !important;
         }
         .emoji_list{
             width: 546px !important;
             height: 408px !important;
         }

         .emoji_list.ui_scroll_container .ui_scroll_bar_container>.ui_scroll_bar_outer>.ui_scroll_bar_inner{
             width:20px;
         }

         .emoji_list.ui_scroll_emoji_theme>.ui_scroll_bar_container {
             right: -23px;
         }

         .emoji_tt_wrap.tt_down:after, .emoji_tt_wrap.tt_down:before {
             right: 63px;
         }
         .emoji_smiles_row{
            display: inline-block;
         }
         .emoji_tabs_r_s {
             margin-left: auto;
             right: 27px;
         }
         .emoji_tabs_wrap {
             width: 304px;
         }
         */
      }).css;
   },
   onLibFiles: function(fn){
      if (/(^|\/)emoji.js/.test(fn)){
          Inj.End('Emoji.ttClick', function(id,el,b1,b2,ev){
              var opts = Emoji.opts[id];
              //vkopt.log(id, opts);
              if (opts.emojiBtn)
                  opts.emojiBtn.onmouseout = function(){};
              if (opts.obj)
                  opts.obj.onmouseout = function(){};
              if (opts.tt)
                  opts.tt.onmouseout = function(){};
              //beautify tabs icons for zoom
              domQuery('.emoji_tab_img_cont img').forEach(function(el){el.src = el.src.replace(/(\d+-\d+-thumb-)(\d+)/,'$144')});
              opts.scrollStarted = true;
              setTimeout(function(){opts.scrollStarted = false;},200)
          });
      }
   }
}
if (window.vkopt_core_ready) vkopt_core.plugins.delayed_run('emoji_acs');
