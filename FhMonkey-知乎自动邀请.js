// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1586422221604
// @name            知乎自动邀请
// @url-pattern     https://www.zhihu.com/question/*
// @enable          true
// @require-js      https://code.jquery.com/jquery-3.4.1.min.js
// @auto-refresh    0
// @updated         2020-04-27 12:03:04
// ==/FeHelperMonkey==




// const $ = require('https://code.jquery.com/jquery-3.4.1.min.js');

const sleep = (time) =>
    new Promise((resolve) => {
        setTimeout(resolve, time * 1000);
    });
const invite = async (elList = []) => {
    const length = elList.length;
    if (length === 0) {
        await sleep(1);
        const $QuestionInvitation = $(".QuestionInvitation-content");
        if ($QuestionInvitation.length) {
            const list = $(".QuestionInvitation-content").find(".List-item");
            invite(list);
        } else {
            const $QuestionHeaderActions = $(".QuestionHeaderActions");
            $QuestionHeaderActions.find("button").eq(0).click();
            sleep(5);
            invite();
        }
    } else if (length < 10) {
        $(".QuestionMainAction").click();
        await sleep(1);
        const list = $(".QuestionInvitation-content").find(".List-item");
        invite(list);
    } else {
        for (const el of elList) {
            $(el).find(".ContentItem-extra").find("button").click();
            await sleep(2);
        }
        await sleep(60);
        location.reload();
    }
};
invite();



