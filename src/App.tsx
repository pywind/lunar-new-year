import { useEffect, useCallback, useState } from "react";
import "./App.css";
import { Typography } from "antd";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import Particles from "react-tsparticles";
import type { Container, Engine } from "@tsparticles/engine";
import FireworkSound from "./components/FireworkSound";
import { useScreenSize } from './hooks/useScreenSize';
import { Lanterns } from './components/Lanterns';

const { Title } = Typography;

function App() {
  const { isMobile } = useScreenSize();
  const [isFireworkPlaying, setIsFireworkPlaying] = useState(false);
  const [shouldPlaySound, setShouldPlaySound] = useState(true);

  useEffect(() => {
    // Trigger initial firework after a short delay
    const timer = setTimeout(() => {
      setIsFireworkPlaying(true);
    }, 1000); // 1 second delay after page load

    return () => clearTimeout(timer);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine as any);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Fireworks loaded");
  }, []);

  const handleParticleCreated = useCallback(() => {
    setIsFireworkPlaying(true);
    // Increased the timeout to give more time for the sound to play
    setTimeout(() => setIsFireworkPlaying(false), 200);
  }, []);

  useEffect(() => {
    document.body.className = "ant-dark";
  }, []);

  return (
    <div className="container">
      <FireworkSound 
        isPlaying={isFireworkPlaying} 
        shouldPlaySound={shouldPlaySound} 
      />
      <Particles
        id="fireworks"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          preset: "fireworks",
          background: {
            opacity: 0
          },
          particles: {
            number: {
              value: 0
            },
            color: {
              value: ["#FF0000", "#FFD700", "#FF69B4", "#FFA500"]
            }
          },
          fullScreen: {
            enable: true,
            zIndex: 1
          },
          events: {
            particleCreated: handleParticleCreated
          }
        }}
      />
      
      <Lanterns count={3} />

      <div className="tet-content-wrapper">
        <div className="corner corner-top-left"></div>
        <div className="corner corner-top-right"></div>
        <div className="corner corner-bottom-left"></div>
        <div className="corner corner-bottom-right"></div>
        
        <div className="gold-bar"></div>

        <Title level={2} className="year-title" style={{ marginBottom: '2rem' }}>
          👑 Năm Ất Tỵ 2025 👑
        </Title>

        <div className="image-container">
          <div className="image-card">
            <img 
              src="/images/zodiac-snake-cloud.png" 
              alt="Snake with cloud"
            />
            <div className="card-content">
              <h3>Phúc</h3>
              <p>An khang thịnh vượng – Như ý cát tường</p>
            </div>
          </div>
          <div className="image-card">
            <img 
              src="/images/zodiac-snake-money-tree.png" 
              alt="Snake with money"
            />
            <div className="card-content">
              <h3>Lộc</h3>
              <p>Túi luôn đầy tiền – Sung sướng như tiên</p>
            </div>
          </div>
          <div className="image-card">
            <img 
              src="/images/zodiac-snake-lion-hat.png" 
              alt="Snake with lion hat"
            />
            <div className="card-content">
              <h3>An</h3>
              <p>May mắn đồng hành – An khang tới cửa</p>
            </div>
          </div>
          <div className="image-card">
            <img 
              src="/images/zodiac-snake-ruyi-knot.png" 
              alt="Snake with ruyi knot"
            />
            <div className="card-content">
              <h3>Thần</h3>
              <p>Xuân sang rộn ràng – Ý chí vững vàng</p>
            </div>
          </div>
        </div>
      </div>

      <div className="decorations">
        <span className="decoration">🏮</span>
        <span className="decoration">💮</span>
        <span className="decoration">🎋</span>
      </div>
    </div>
  );
}

export default App;
