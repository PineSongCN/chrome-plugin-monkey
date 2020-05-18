// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1589767243549
// @name            哔哩哔哩
// @url-pattern     https://*.bilibili.com/*
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2020-05-18 10:02:10
// ==/FeHelperMonkey==


(() => {
  const sleep = (timeout) =>
      new Promise((resolve) => {
          setTimeout(() => {
              resolve(true);
          }, timeout * 1000);
      });

  const closeDanMu = async () => {
      const DanMu = document.querySelector(
          '.bilibili-player-video-danmaku-switch .bui-checkbox'
      );
      if (DanMu) {
          const checked = DanMu.checked;
          if (checked !== false) {
              DanMu.click();
              await sleep(1);
              closeDanMu();
          }
      } else {
          await sleep(1);
          closeDanMu();
      }
  };

  var targetNode = document.querySelector('#bofqi'); //content监听的元素id
  var options = {
      attributes: true, //属性的变动
      attributeFilter: ['src'], //
      childList: true, //子节点的变动
      // characterData: true, //节点内容或节点文本的变动
      // subtree: true, //是否将该观察器应用于该节点的所有后代节点
      // attributeOldValue: true, //观察attributes变动时，是否需要记录变动前的属性值
      // characterDataOldValue: true, //观察characterData变动时，是否需要记录变动前的值
  };
  function callback(mutationsList, observer) {
      closeDanMu();
  }
  var mutationObserver = new MutationObserver(callback);
  if (targetNode) {
      mutationObserver.observe(targetNode, options);
      closeDanMu();
  }
})();

