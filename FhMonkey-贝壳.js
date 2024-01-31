// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1706593652801
// @name            贝壳
// @url-pattern     https://*.ke.com/ershoufang/*
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2024-01-30 13:57:30
// ==/FeHelperMonkey==


(() => {
  var total = 0;
  var box = document.querySelector("#infoList");

  if(box) {
    var rows = Object.values(box.querySelectorAll(".row"));
    for (const row of rows) {
      var cols = Object.values(row.querySelectorAll(".col"));
      total += parseFloat(cols[1].innerText);
    }
    total = Number(total.toFixed(2))
    console.log(total);
    
    var target = document.querySelector('.introContent .content li:nth-child(2)')
    var current = parseFloat(target.innerText.match(/\d+(\.\d+)?/)[0]);
    target.appendChild(document.createTextNode(`/ ${total}㎡ | ${Number(((current-total) / current * 100).toFixed(2))}%`))
  }
})();
