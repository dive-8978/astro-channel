import { useEffect, useRef, useState } from 'react';
import { initLifiWidget, loadLifiScript } from './utils/lifiHelper';

export default function Home() {
  const swapRef = useRef(null);
  const [randomX] = useState(() => Math.random() * 100 - 50);
  const [widgetLoadError, setWidgetLoadError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onPageLoad = () => {
      const cleanup = loadLifiScript(
        () => {
          initLifiWidget(swapRef.current, setWidgetLoadError);
          setIsLoading(false);
        },
        () => {
          setWidgetLoadError('LiFi 脚本加载失败，请检查网络');
          setIsLoading(false);
        }
      );
      return cleanup;
    };

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0b132b, #1c1d1f)',
      color: '#fff',
      fontFamily: 'Orbitron, Roboto, sans-serif',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 0
    }}>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) translateX(${randomX}px); opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${randomX}px); opacity: 0; }
          }
        `}
      </style>

      {/* 背景图层 */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=4.0.3&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1,
        zIndex: -1
      }} />

      {/* 粒子动效 */}
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

      {/* 内容区 */}
      <div style={{
        padding: '20px',
        textAlign: 'center',
        zIndex: 1,
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
          零费跨链 · 火星直达 | 支持 BTC/BNB/SOL 全链互通
        </p >

        {/* 跨链组件容器 */}
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
            minHeight: '400px'
          }} 
        >
          {isLoading && <span style={{color: '#00ff99', fontSize: '1rem'}}>跨链组件加载中... 优先加载低Gas方案</span>}
          {!isLoading && widgetLoadError && <span style={{color: '#e63946', fontSize: '1.2rem', textAlign: 'center', padding: '20px'}}>{widgetLoadError}</span>}
        </div>

        <div style={{
          marginTop: '40px',
          fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
          color: '#00ff99',
          textShadow: '0 0 10px #00ff99',
          lineHeight: 1.5
        }}>
          支持 BTC / ETH / BNB / SOL 等主流链 | 零平台费 | 目标链Gas空投 | 火星延迟预留
        </div>
      </div>
    </div>
  );
}