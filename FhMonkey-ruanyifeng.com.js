// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1645757220033
// @name            ruanyifeng.com
// @url-pattern     https://www.ruanyifeng.com/*
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2022-02-25 10:48:25
// ==/FeHelperMonkey==


// Set a fake timeout to get the highest timeout id
var highestTimeoutId = setTimeout(";");
for (var i = 0 ; i < highestTimeoutId ; i++) {
    clearTimeout(i); 
}
checker = function(){}
