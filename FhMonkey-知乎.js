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
    const map = {
        name: ['故事档案局', '全民故事计划', '惊人院', '盐选推荐', '真实职业故事'],
        normal: ['.TopstoryItem--advertCard'],
    };
    let CSS = `
        .Feed[data-za-extra-module*=Zvideo],
        .Feed[data-za-extra-module*=video_id] {
            display: none;
        }
    `;
    if (location.pathname === '/') {
        CSS += `
            [data-za-extra-module*="Post"] {
              display: none !important;
            }
            [data-za-extra-module*="5Qcm9tb3Rpb25FeHRyYR"] {
              display: none !important;
            }
            [data-za-extra-module*="UHJvbW90aW9uRXh0cm"] {
              display: none !important;
            }
		`;
    }
    for (const v of map.name) {
        CSS += `
				[data-zop*='${v}'] {
            display: none !important;
        	}
		`;
    }
    for (const v of map.normal) {
        CSS += `
				${v} {
            display: none !important;
        	}
		`;
    }
    STYLE.innerHTML = CSS;
    document.body.appendChild(STYLE);
  	if(location.pathname === '/') {
    	var container = document.querySelector('.Topstory-container');
        var childNodes = [...container.parentElement.childNodes];
        var index = childNodes.findIndex((el) => el === container);
        if (index > 0) {
            var svg = childNodes[0].querySelector('svg');
            if (svg) {
            	var e = document.createEvent('SVGEvents');
            	e.initEvent('click', true, true);
            	svg.dispatchEvent(e);
          	} else {
            	childNodes[0].style.display = 'none';
          	}
        }
    }
})();
