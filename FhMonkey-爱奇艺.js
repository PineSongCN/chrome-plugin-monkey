// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1590924917656
// @name            爱奇艺
// @url-pattern     https://*.iqiyi.com/*
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2020-05-31 19:37:30
// ==/FeHelperMonkey==


(() => {
    const STYLE = document.createElement('style');
    const CSS = `
        div[adid*=ad] {
            display: none !important;
        }
    `;
    STYLE.innerHTML = CSS;
    document.body.appendChild(STYLE);
})();