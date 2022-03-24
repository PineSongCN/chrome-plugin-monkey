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
    // const STYLE = document.createElement('style');
    // const CSS = `
    //     .WB_cardwrap[feedtype='ad'] {
    //         display: none;
    //     }
    //     .WB_cardwrap[data-mark*='mark=1'] {
    //         display: block;
    //     }
    //     .WB_cardwrap:nth-child(1) {
    //     }
    // `;
    // STYLE.innerHTML = CSS;
    // document.body.appendChild(STYLE);
    if (document.getElementById('pl_band_index')) {
        const a = Object.values(
            document.getElementById('pl_band_index').getElementsByTagName('a')
        );
        for (const v of a) {
            v.title = v.innerText;
        }
    }
})();

