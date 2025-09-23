// ==FeHelperMonkey==
// @reminder        请不要删除这部分代码注释，这是FeHelper油猴脚本能正常工作的基本条件！当然，你可以按需修改这里的内容！
// @id              mf_1758606956209
// @name            元梦之星
// @url-pattern     https://gamer.qq.com/v2/game/96897*
// @enable          true
// @require-js      
// @auto-refresh    0
// @updated         2025-09-23 15:04:49
// ==/FeHelperMonkey==


class KeyboardAutomation {
  // 配置常量
  static CONFIG = {
    RESET_TIMEOUT: 1000, // 连续按键超时时间(ms)
    LOOP_INTERVAL: 15000, // 循环执行间隔(ms)
    CONTINUOUS_KEYS: {
      7: { targetCount: 3, callback: 'showSelectDialog' }, // 按7三次触发选择对话框
      8: { targetCount: 3, callback: 'toggleRecording' } // 按8三次触发录制切换
    }
  };

  constructor() {
    // 状态管理
    this.state = {
      recordList: [], // 录制的按键列表
      isRecording: false, // 是否正在录制
      keyHandlerStatus: { isRunning: '' }, // 执行状态
      timerIds: [], // 单次执行定时器ID
      loopTimerId: null, // 循环执行定时器ID
      keyHandlerMap: this.loadFromLocalStorage(), // 从本地存储加载的录制数据
      // 连续按键检测状态
      continuousKeyStates: {}
    };

    // 初始化事件绑定
    this.initEventListeners();
    // 初始化连续按键检测器
    this.initContinuousKeyDetector();
  }

  // 从localStorage加载数据（带错误处理）
  loadFromLocalStorage() {
    try {
      const data = localStorage.getItem('keyHandlerMap');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
      return [];
    }
  }

  // 保存数据到localStorage
  saveToLocalStorage() {
    try {
      localStorage.setItem('keyHandlerMap', JSON.stringify(this.state.keyHandlerMap));
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  }

  // 初始化事件监听器
  initEventListeners() {
    // 绑定录制相关事件（使用箭头函数保持this指向）
    this.handleKeyDown = (e) => this.recordKeyDown(e);
    this.handleKeyUp = (e) => this.recordKeyUp(e);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  // 初始化连续按键检测器
  initContinuousKeyDetector() {
    const { CONTINUOUS_KEYS } = KeyboardAutomation.CONFIG;
    // 初始化所有配置按键的状态
    Object.keys(CONTINUOUS_KEYS).forEach(key => {
      this.state.continuousKeyStates[key] = { count: 0, lastTime: 0 };
    });

    document.addEventListener('keydown', (event) => {
      const key = event.key;
      if (!CONTINUOUS_KEYS[key]) return;

      const now = Date.now();
      const { targetCount, callback } = CONTINUOUS_KEYS[key];
      const state = this.state.continuousKeyStates[key];

      // 超时重置计数
      if (now - state.lastTime > KeyboardAutomation.CONFIG.RESET_TIMEOUT) {
        state.count = 0;
      }

      // 更新计数和时间
      state.count++;
      state.lastTime = now;

      // 达到目标次数触发回调
      if (state.count === targetCount) {
        this[callback](); // 调用对应方法
        state.count = 0; // 重置计数
      }

      // 重置其他按键计数
      Object.keys(CONTINUOUS_KEYS).forEach(otherKey => {
        if (otherKey !== key) {
          this.state.continuousKeyStates[otherKey] = { count: 0, lastTime: 0 };
        }
      });
    });
  }

  // 录制keydown事件
  recordKeyDown(e) {
    if (!this.state.isRecording) return;
    if (/^[0-9]$/.test(e.key)) return; // 忽略数字键

    // 避免重复记录未释放的按键
    const isKeyAlreadyDown = this.state.recordList.some(
      item => item.key === e.key && item.duration === 0
    );
    if (isKeyAlreadyDown) return;

    const localStartTime = Date.now();
    const relativeTime = localStartTime - this.recordStartTime;
    this.state.recordList.push({
      key: e.key,
      keyCode: e.keyCode,
      code: e.code,
      duration: 0,
      relativeTime,
      localStartTime
    });
    console.log(`record:keydown:${e.key}`, this.state.recordList[this.state.recordList.length - 1]);
  }

  // 录制keyup事件
  recordKeyUp(e) {
    if (!this.state.isRecording) return;
    if (/^[0-9]$/.test(e.key)) return; // 忽略数字键

    const item = this.state.recordList.find(i => i.key === e.key && i.duration === 0);
    if (item) {
      item.duration = Date.now() - item.localStartTime;
      console.log(`record:keyup:${e.key}`, item);
    }
  }

  // 开始录制
  startRecording() {
    this.state.recordStartTime = Date.now();
    this.state.recordList = [];
    this.state.isRecording = true;
    console.log('Recording started');
  }

  // 结束录制
  finishRecording() {
    if (!this.state.isRecording) return;

    this.state.isRecording = false;
    console.log('Recording ended', this.state.recordList);

    const recordingName = prompt('请输入录制内容的名称:');
    if (recordingName) {
      const newRecording = {
        name: recordingName,
        list: [...this.state.recordList]
      };

      // 更新录制列表
      const index = this.state.keyHandlerMap.findIndex(item => item.name === recordingName);
      if (index > -1) {
        this.state.keyHandlerMap[index] = newRecording;
      } else {
        this.state.keyHandlerMap.push(newRecording);
      }

      this.saveToLocalStorage();
      alert(`录制完成！已保存为: ${recordingName}`);
    }

    this.state.recordList = [];
  }

  // 切换录制状态（开始/结束）
  toggleRecording() {
    if (this.state.isRecording) {
      this.finishRecording();
    } else {
      this.startRecording();
    }
  }

  // 模拟按键
  simulateKeyPress(keyCode, duration = 0) {
    // 创建keydown事件
    const keydownEvent = new KeyboardEvent('keydown', {
      keyCode,
      bubbles: true,
      cancelable: true
    });
    // 创建keyup事件
    const keyupEvent = new KeyboardEvent('keyup', {
      keyCode,
      bubbles: true,
      cancelable: true
    });

    document.dispatchEvent(keydownEvent);
    // 延迟触发keyup
    setTimeout(() => {
      document.dispatchEvent(keyupEvent);
    }, duration);
  }

  // 停止所有执行
  stopExecution() {
    // 清除单次定时器
    this.state.timerIds.forEach(timerId => clearTimeout(timerId));
    // 清除循环定时器
    if (this.state.loopTimerId) {
      clearTimeout(this.state.loopTimerId);
      this.state.loopTimerId = null;
    }
    // 重置状态
    this.state.timerIds = [];
    this.state.keyHandlerStatus.isRunning = '';
    console.log('All executions stopped');
  }

  // 开始执行录制的操作
  startExecution(name, list) {
    this.stopExecution(); // 先停止已有执行
    this.state.keyHandlerStatus.isRunning = name;
    console.log(`Starting execution: ${name}`);

    list.forEach((item, index) => {
      const timerId = setTimeout(() => {
        this.simulateKeyPress(item.keyCode, item.duration);

        // 最后一个步骤执行完后处理循环
        if (index === list.length - 1 && this.state.keyHandlerStatus.isRunning === name) {
          this.state.loopTimerId = setTimeout(() => {
            this.startExecution(name, list);
          }, KeyboardAutomation.CONFIG.LOOP_INTERVAL);
        }
      }, item.relativeTime);

      this.state.timerIds.push(timerId);
    });
  }

  // 显示选择对话框
  showSelectDialog() {
    return new Promise((resolve) => {
      // 创建模态框容器
      const modalContainer = document.createElement('div');
      modalContainer.id = 'customSelectModal';
      modalContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000;';

      // 创建背景层
      const backdrop = document.createElement('div');
      backdrop.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5);';
      modalContainer.appendChild(backdrop);

      // 创建对话框内容
      const dialog = document.createElement('div');
      dialog.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); font-family: Arial, sans-serif;';
      
      // 标题
      const title = document.createElement('h3');
      title.textContent = '选择操作';
      title.style.marginTop = '0';
      dialog.appendChild(title);

      // 选择框
      const select = document.createElement('select');
      select.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 15px;';
      this.state.keyHandlerMap.forEach(opt => {
        const option = document.createElement('option');
        option.value = this.escapeHtml(opt.name); // XSS防护
        option.textContent = this.escapeHtml(opt.name);
        select.appendChild(option);
      });
      dialog.appendChild(select);

      // 按钮容器
      const btnContainer = document.createElement('div');
      dialog.appendChild(btnContainer);

      // 确定按钮
      const confirmBtn = document.createElement('button');
      confirmBtn.textContent = '确定';
      confirmBtn.style.cssText = 'padding: 8px 16px; margin-right: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;';
      confirmBtn.addEventListener('click', () => {
        const selectedName = select.value;
        const target = this.state.keyHandlerMap.find(item => item.name === selectedName);
        if (target) {
          if (this.state.keyHandlerStatus.isRunning === target.name) {
            this.stopExecution();
          } else {
            this.startExecution(target.name, target.list);
          }
        }
        this.closeDialog(modalContainer, resolve, selectedName);
      });
      btnContainer.appendChild(confirmBtn);

      // 取消按钮
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = '取消';
      cancelBtn.style.cssText = 'padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;';
      cancelBtn.addEventListener('click', () => {
        this.closeDialog(modalContainer, resolve, null);
      });
      btnContainer.appendChild(cancelBtn);

      modalContainer.appendChild(dialog);
      document.body.appendChild(modalContainer);

      // 点击背景关闭
      backdrop.addEventListener('click', () => {
        this.closeDialog(modalContainer, resolve, null);
      });

      // ESC键关闭
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          this.closeDialog(modalContainer, resolve, null);
          document.removeEventListener('keydown', handleEsc);
        }
      };
      document.addEventListener('keydown', handleEsc);
    });
  }

  // 关闭对话框
  closeDialog(modal, resolve, result) {
    if (modal && modal.parentNode) {
      modal.parentNode.removeChild(modal);
    }
    resolve(result);
  }

  // HTML转义（防XSS）
  escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// 初始化工具
new KeyboardAutomation();