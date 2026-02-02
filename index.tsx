import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const swapRef = useRef(null)
  const [randomX] = useState(() => Math.random() * 100 - 50)
  const [widgetLoadError, setWidgetLoadError] = useState(false)

  // 优化后的 Widget 初始化函数
  const initWidget = () => {
    // 双重校验 DOM 和 Widget 实例
    if (!swapRef.current || !window.LiFiWidget) return

    try {
      window.LiFiWidget.init({
        container: swapRef.current,
        integrator: 'astro-channel',
        fromToken: 'ETH',
        toToken: 'USDC',
        fromChain: 'ethereum',
        toChain: 'polygon',
        theme: { primaryColor: '#e63946' }
      })
      setWidgetLoadError(false)
    } catch (err) {
      console.error('Widget 初始化失败:', err)
      setWidgetLoadError(true)
    }
  }

  useEffect(() => {
    // 若 Widget 已存在，直接初始化
    if (window.LiFiWidget) {
      initWidget()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@lifinance/widget@latest/dist/index.umd.min.js'
    script.async = true
    document.head.appendChild(script)

    script.onload = initWidget
    script.onerror = () => {
      console.error('LiFi Widget 脚本加载失败')
      setWidgetLoadError(true)
    }

    // 组件卸载时清理资源
    return () => {
      script.remove()
      if (window.LiFiWidget) {
        window.LiFiWidget.destroy()
      }
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0b132b, #1c1d1f)',
      color: '#fff',
      // 引入外部字体 + 降级方案
      fontFamily: 'Orbitron, Roboto, sans-serif',
      overflow: 'hidden',
      position: 'relative',
      // 防止内容被粒子层遮挡
      zIndex: 0
    }}>
      {/* 引入 Orbitron 字体（通过 Google Fonts） */}
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0) translateX(${randomX}px);
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) translateX(${randomX}px);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* 背景图层 */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1,
        zIndex: -1
      }} />

      {/* 粒子动效层 - 修复 CSS 变量兼容性 */}
      <div style={{
        position: 'absolute',
        width: '100%', height: '100%',
        overflow: 'hidden',
        zIndex: -1
      }}>
        {Array.from({ length: 80 }).map((_, i) => (
          <div 
            key={i}
            style={{
              position: 'absolute',
              width: '3px', height: '3px',
              background: '#00ff99',
              borderRadius: '50%',
              animation: `float ${5 + Math.random()*10}s linear infinite`,
              left: `${Math.random()*100}%`,
              top: `${Math.random()*100}%`,
              boxShadow: '0 0 5px #00ff99',
              animationDelay: `${Math.random()*5}s`
            }} 
          />
        ))}
      </div>

      {/* 内容层 */}
      <div style={{
        padding: '20px',
        textAlign: 'center',
        zIndex: 1,
        // 确保内容在移动端也能正常显示
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          textShadow: '0 0 20px #e63946',
          background: 'linear-gradient(45deg, #e63946, #00ff99)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 10px',
          fontWeight: 700
        }}>
          ASTRØ CHANNEL
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', margin: '0 0 40px' }}>
          零费跨链 · 火星直达
        </p>

        <div 
          ref={swapRef}
          style={{
            width: '90%',
            maxWidth: '600px',
            height: '600px',
            margin: '40px auto',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid #e63946',
            borderRadius: '20px',
            boxShadow: '0 0 50px #e63946',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // 防止 Widget 加载前容器塌陷
            minHeight: '400px'
          }} 
        >
          {widgetLoadError ? (
            <span style={{color: '#e63946', fontSize: '1.2rem', textAlign: 'center', padding: '20px'}}>
              跨链组件加载失败，请刷新页面重试
            </span>
          ) : (
            <span style={{color: '#00ff99', fontSize: '1rem'}}>
              跨链组件加载中...
            </span>
          )}
        </div>

        <div style={{
          marginTop: '40px',
          fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
          color: '#00ff99',
          textShadow: '0 0 10px #00ff99',
          lineHeight: 1.5
        }}>
          支持 BTC / ETH / BNB / SOL 等主流链 | 零平台费 | 火星延迟预留
        </div>
      </div>
    </div>
  )
}
