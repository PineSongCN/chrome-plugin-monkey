// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1587605010538
// @name            steam
// @url-pattern     https://*.steampowered.com/*
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2020-04-23 09:35:40
// ==/FeHelperMonkey==


(() => {
const STYLE = document.createElement('style');
const CSS = `
		.review_box .content {
			height: auto !important;
			max-height: unset !important;
		}
		.gradient {
			display: none !important;
		}
		.posted {
			display: none !important;
		}
`;
STYLE.innerHTML = CSS;
document.body.appendChild(STYLE);
})();

