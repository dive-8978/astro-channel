/**
 * 初始化 LiFi 跨链组件
 * @param {HTMLElement} container 挂载容器
 * @param {Function} setWidgetLoadError 设置错误状态
 */
export const initLifiWidget = (container, setWidgetLoadError) => {
    if (!container || !window.LiFiWidget) return;
  
    try {
      window.LiFiWidget.init({
        container: container,
        integrator: 'astro-channel',
        defaultChainId: 137, // 默认低Gas的Polygon链
        nativeGasDelivery: true, // 开启目标链Gas空投
        featuredRoutes: [
          { fromChainId: 137, toChainId: 56, fromTokenSymbol: 'USDC', toTokenSymbol: 'USDT' },
          { fromChainId: 56, toChainId: 101, fromTokenSymbol: 'BNB', toTokenSymbol: 'SOL' },
          { fromChainId: 0, toChainId: 137, fromTokenSymbol: 'BTC', toTokenSymbol: 'USDC' }
        ],
        theme: { primaryColor: '#e63946', mode: 'dark' },
        responsive: true,
        width: '100%'
      });
      setWidgetLoadError('');
    } catch (err) {
      console.error('Widget 初始化失败:', err);
      if (err.message.includes('wallet')) {
        setWidgetLoadError('请先安装并连接 Web3 钱包（如 MetaMask）');
      } else if (err.message.includes('network')) {
        setWidgetLoadError('当前网络不支持，请切换到 Polygon/BSC/Solana 链');
      } else {
        setWidgetLoadError('组件加载失败，请刷新页面重试');
      }
    }
  };
  
  /**
   * 动态加载 LiFi 脚本
   * @param {Function} onLoad 成功回调
   * @param {Function} onError 失败回调
   * @returns {Function} 清理函数
   */
  export const loadLifiScript = (onLoad, onError) => {
    if (document.querySelector('script[src*="lifinance/widget"]')) {
      onLoad();
      return () => {};
    }
  
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lifinance/widget@latest/dist/index.umd.min.js';
    script.async = true;
    script.onload = onLoad;
    script.onerror = onError;
    document.head.appendChild(script);
  
    return () => {
      script.remove();
      if (window.LiFiWidget) window.LiFiWidget.destroy();
    };
  };