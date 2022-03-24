// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1645758164450
// @name            京东
// @url-pattern     https://passport.jd.com/*
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2022-02-25 11:05:01
// ==/FeHelperMonkey==


(() => {
    if($('.login-tab-r').length > 0) {
        $('.login-tab-r')[0].click();
        setTimeout(() => {
          //$('#loginsubmit')[0].click();
        }, 2000);

    }
})();