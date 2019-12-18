var cycle = 0;

function cookie_mark() {
    document.getElementById("cookie_show").innerHTML = '<div style="text-align: center; padding-top: 50px;">验证中...请稍候<br>Retry: ' + cycle + '</div>';
    var mark = new pcmark();
    var token_id = "sosv_net";
    mark.get(token_id, function (val) {
        if (!val) {
            if (cycle <= 5) {
                cycle++;
                document.getElementById("cookie_show").innerHTML = '<div style="text-align: center; padding-top: 50px;">验证中...请稍候<br>Retry: ' + cycle + '</div>';
                token = 'Rm85rApbYA4MnBq4eFD0BnydmW1iiKZ4bnSwH2JZ/LLfthMR4gYSuZsXTJHxyt9njTUi8HwBfn5WK2w8Zb10Ug==';
                mark.set(token_id, token);
                cookie_mark();
            } else {
                cycle = 0;
                document.getElementById("cookie_show").innerHTML = '<div style="text-align: center; padding-top: 50px;">验证失败：请检查是否关闭了cookie 或换浏览器重试。</div>';
            }
        } else {
            cycle = 0;
            document.getElementById("cookie_show").innerHTML = '<div style="text-align: center; padding-top: 50px;">验证成功，系统将3秒后自动跳转到投票页面。<br>如果没有自动跳转请点击...<a href="javascript:showWindow(\'dmo_vots\',\'plugin.php?id=votes:vote&appid=110&formhash=09d32aab\',\'get\',0);" style="color: #03F;">手动跳转</a></div>';
            //alert(val); 
            Vote.setCookie("sosv_net", val);
            setTimeout(function () {
                showWindow('dmo_vots', 'plugin.php?id=votes:vote&appid=110&formhash=09d32aab', 'get', 0);
            }, 3000);
        }
    });
}

cookie_mark()