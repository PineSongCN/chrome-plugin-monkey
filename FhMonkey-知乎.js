// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1594440943126
// @name            知乎
// @url-pattern     https://*.zhihu.com/*
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2020-07-11 12:16:13
// ==/FeHelperMonkey==


(() => {
    const STYLE = document.createElement('style');
    const CSS = `
        [data-zop*='故事档案局'] {
            display: none;
        }
    `;
    STYLE.innerHTML = CSS;
    document.body.appendChild(STYLE);
})();