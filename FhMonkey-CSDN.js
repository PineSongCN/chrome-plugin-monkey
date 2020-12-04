// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1589536518465
// @name            CSDN
// @url-pattern     https://*.csdn.net/*
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2020-05-15 18:08:53
// ==/FeHelperMonkey==


(() => {
    let title = document.title;
    title = title.indexOf('条消息)') === 2 ? title.split('条消息)')[1] : title;
    document.title = title;
    document.querySelector('#toolbar-remind').remove();
    document.querySelector('#article_content').style.height = 'auto';
})();
