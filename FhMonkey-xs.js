// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1689643680235
// @name            xs
// @url-pattern     /[http|https]:\/\/(m|www|m2)\.(xxbooktxt|suiyuexs|lwshuku|00ksw|qjiij|sjwx|txt0871|sjxs|baba5|xlaidudu|qbiqus|ipinshu|yruan|biqiudu|00shu|ibiquges|asxs|biquge|6lk|cxbz958|ddyueshu|siluke|vodtw|yqxsge|taccx|biququ)\.*/
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2023-10-19 14:34:37
// ==/FeHelperMonkey==


(() => {
    // https://www.yqxsge.cc/html/28/28347/641621661.html
    // https://www.taccx.com/html/133068/89.html
    // https://www.vodtw.com/book/8000/chapter/6589607.html#main
    const STYLE = document.createElement('style');
    let CSS = `
			body {
				padding-bottom:90vh
			}
			* {
				background: rgb(198, 220, 200) !important;
				background: rgb(10, 10, 10) !important;
				color: #333 !important;
				color: rgba(255, 255, 255, .5) !important;
				border: none !important;
				max-width: 100% !important;
			}
			img, button, input {
				opacity: 0.1 !important;
			}
			button, #tbox {
				border: none !important;
			}
			.amiddle {
				display: none !important;
			}
			#content, p, #info, #content1, #chaptercontent, #nr, #articlecontent, .content-body, #txt {
				line-height: 2 !important;
				font-size: 16px !important;
				background: rgb(222, 236, 223) !important;
				background: rgb(22, 22, 22) !important;
                margin-top: 0.8em;
			}
			#content, #content1, #chaptercontent, #nr, #articlecontent, .content-body, #txt {
				padding: 20pt !important;
			}
		
		`;
    STYLE.innerHTML = CSS;
    document.body.appendChild(STYLE);

    var containerKeys = ['#content', '#chaptercontent', '#nr', '.pt-read-text', '#articlecontent', '.content-body', '#txt'];
    var container;
    for (const containerKey of containerKeys) {
        container = document.querySelector(containerKey);
        if (container) {
            break;
        }
    }
    if (!container) {
        return;
    }
  	['div', 'a'].forEach(tag => container.querySelectorAll(tag).forEach(el => el.remove()))
    var content = container.innerHTML;
    var words = [
        '大家去快可以试试吧。】',
        '安卓苹果均可。】',
        '安装最新版。】',
        '野果阅读',
        '均可。】',
        '换源app',
        '天才一秒记住',
        '弹&nbsp;窗',
        '弹 窗',
        '本书首发域名',
        'huanyuanapp',
        '7017k',
        '首发最新。',
    ];
    var rWrods = [/^\?*/g];
    var preWords = [' ', '&nbsp;'];
    var Filter = (item, index) => {
        preWords.forEach((preWord) => {
                if (item.startsWith(preWord)) {
                item = item
                    .split(preWord)
                    .map((tmp) => {
                        rWrods.forEach((rWord) => {
                            tmp = tmp.replace(rWord, '');
                        });
                        return tmp;
                    })
                    .join(preWord);
                }
        });
        rWrods.forEach((rWord) => {
            item = item.replace(rWord, '');
        });
        if (words.map((word) => item.includes(word)).filter(Boolean).length > 0) {
            return '';
        }
        return item;
    };
    if (content.split('<p>').length > 10) {
        content = content.split('<p>');
        content = content.map(Filter).filter(Boolean);
        content = content.join('<p>');
    } else {
  		['p'].forEach(tag => container.querySelectorAll(tag).forEach(el => el.remove()));
    	content = container.innerHTML;
        content = content.split('<br>');
        if(content.length < 10) {
            content = content.map(item=>item.split('。').map((tmp,index)=>`${index % 3 === 1 ? '&nbsp;&nbsp;&nbsp;&nbsp;' : ''}${tmp}。${index % 3 === 0 ? '<br>' : ''}`)).flat(Infinity)
            // content = content.join('<br>');
            // const arr = [];
            // let index = 0;
            // while(index < content.length){
            //     arr.push(content.slice(index,index += 200));
            //     arr.push('')
            // }
            // content = arr
        } else {
            content = content.map(Filter).filter(Boolean);
        }
        content = content.join('<br>');
    }
    switch (location.host) {
        case 'www.qjiij.com':
            content = content.split('晶晶走到')[0];
        	['www.qjiij.com', 'qjiij.com', '齐聚文学'].map(word => content = content.replaceAll(word, ''))
            break;
    
        default:
            break;
    }
    container.innerHTML = content;

    let scrollTag = true;
    window.onscroll = () => {
        // 窗口高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // 页面高度
        var documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // 滚动条位置
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (windowHeight + scrollTop + 2 >= documentHeight && scrollTag) {
            scrollTag = false;
            const elBox = ['#pb_next', '.pt-nextchapter'];
            for (const elName of elBox) {
                const ele = document.querySelector(elName);
                if (ele) {
                    ele.click();
                    break;
                }
            }
        }
    };

    document.onkeydown = function (e) {
        let elBox = [];
        switch (e.code) {
            case 'ArrowLeft':
                elBox = ['#pb_prev', '.pt-prechapter'];
                break;
            case 'ArrowRight':
                elBox = ['#pb_next', '.pt-nextchapter', '.next', '.bottem2 a:nth-child(4)'];
                break;

            default:
                elBox = [];
                break;
        }
        for (const elName of elBox) {
            const ele = document.querySelector(elName);
            if (ele) {
                ele.click();
                break;
            }
        }
    };
})();
