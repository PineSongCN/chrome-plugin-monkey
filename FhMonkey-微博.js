// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1589247144808
// @name            微博
// @url-pattern     https://*weibo.com/*
// @enable          true
// @require-js
// @auto-refresh    0
// @updated         2020-05-12 09:33:28
// ==/FeHelperMonkey==

(() => {
    const STYLE = document.createElement('style');
    const CSS = `
        .wbpro-scroller-item:has(header .woo-font--cross){
            display: none!important;
        }
    `;
    STYLE.innerHTML = CSS;
    document.body.appendChild(STYLE);
    if (document.getElementById('pl_band_index')) {
        const a = Object.values(
            document.getElementById('pl_band_index').getElementsByTagName('a')
        );
        for (const v of a) {
            v.title = v.innerText;
        }
    }
    if (location.pathname === '/login.php') {
        var a = document.querySelector('.login_innerwrap').innerHTML;
        a = a.split('<!-- <div class="info_list other_login clearfix"');
        a[1] = a[1].replace(/<!--/g, '').replace(/-->/g, '').replace(/\t/g, '');
        a = a.join('<div class="info_list other_login clearfix"');
        document.querySelector('.login_innerwrap').innerHTML = a;
        document.querySelector('.other_login').style.display = 'block';
    }
    if (location.pathname.startsWith('/u/') || location.pathname.startsWith('/n/') || !Number.isNaN(Number(location.pathname.slice(1)))) {
        setTimeout(() => {
            var b = document.querySelector('.woo-panel-main .woo-avatar-main');
            if (b) {
                b.style.width = '100%';
                b.style.height = '100%';
                b.style['flex-shrink'] = '0';

                var a = document.querySelector(
                    '.woo-panel-main .woo-avatar-main'
                ).parentNode;
                a.style['flex-wrap'] = 'wrap';

                var c = document.querySelector('.woo-panel-main .woo-avatar-main img');
                c.src = c.src.replace('.180/', '.1800/');
            }
        }, 1000);
    }
})();
