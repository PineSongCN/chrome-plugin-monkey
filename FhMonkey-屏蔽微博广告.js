// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1589247144808
// @name            屏蔽微博广告
// @url-pattern     https://*weibo.com/*
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2020-05-12 09:33:28
// ==/FeHelperMonkey==


(() => {
    const STYLE = document.createElement('style');
    const CSS = `
        [feedtype='ad'] {
            display: none;
        }
    `;
    STYLE.innerHTML = CSS;
    document.body.appendChild(STYLE);
})();

