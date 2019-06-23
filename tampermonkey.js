// ==UserScript==
// @name         Theme Detektorrr
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  Shows the theme name in a non-WPcom site
// @author       Senff
// @require      https://code.jquery.com/jquery-1.12.4.js
// @match        *://*/*
// @grant        none
// ==/UserScript==

var $ = window.jQuery;

function showThemeInfo() {
    $('body').append('<div id="wp-no-themeinfo" style="position: fixed; right: 0px; bottom:0; background: #aa0000; color: #ffffff; line-height:20px; padding: 0 10px; font-size: 11px; font-family: arial, helvetica; border-top: solid 1px #000000; border-left: solid 1px #000000; box-shadow: -1px -1px 0 #ffffff; z-index: 999999;">Not a self-hosted WordPress site or theme can not be detected.</div>');

    $('link').each(function(link) {
        var linkHref = $(this).attr('href')
        if (linkHref.includes('/themes/')) {
            var themeLoc = linkHref.indexOf("/themes/")+8; // the character position of where the theme name starts
            var themePath = linkHref.substring(0,themeLoc); // path of where the theme is installed
            var themeSplit = linkHref.substring(themeLoc); // substring with the theme name first
            var endSlash = themeSplit.indexOf('/'); // position of the first slash (right after the theme name)
            var themeName = themeSplit.substring(0,endSlash);
            var styleLoc = themePath+themeName+'/style.css';
            if((!$('#wp-themeinfo').length) && (themeName != 'assets')) { // if themename is "assets", it's not likely a WP site
                $('#wp-no-themeinfo').remove();
               $('body').append('<div id="wp-themeinfo" style="position: fixed; right: 0px; bottom:0; padding: 0 10px; line-height: 20px; font-size: 12px; font-family: arial, helvetica; color: #ffffff; background: #016087; border-left: solid 1px #000000; border-top: solid 1px #000000; box-shadow: -1px -1px 0 #ffffff; z-index: 999999;">Theme name: <strong style="text-transform: capitalize">'+themeName+'</strong> - <a href="'+styleLoc+'" target="_blank" style="color:#ffffff; text-decoration: underline;">link to style.css</a>');
            }
        }
    });
}

$(document).ready(function() {
    showThemeInfo();
});
