import { Suspense, useCallback, useState, useEffect, useMemo } from "react";
import "./App.css";
import { Typography, Card, Space } from "antd";
import {
  GiftTwoTone,
  HeartTwoTone,
  CrownTwoTone,
} from "@ant-design/icons";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import Particles from "react-tsparticles";
import type { Container, Engine } from "@tsparticles/engine";
import FireworkSound from "./components/FireworkSound";
import LazyImage from "./components/LazyImage";
import { createParticlesConfig } from "./config/particlesConfig";

const { Title, Text } = Typography;

// You can create a type for your image data
interface ImageData {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [shouldPlaySound, setShouldPlaySound] = useState<boolean>(false);

  const particlesInit = useCallback(async (engine: Engine): Promise<void> => {
    try {
      await loadFireworksPreset(engine);
    } catch (error) {
      console.error("Failed to initialize particles:", error);
    }
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined): Promise<void> => {
    console.log("Fireworks loaded");
  }, []);

  const handleParticleCreated = useCallback(() => {
    if (!shouldPlaySound) {  // Only trigger if not already playing
      setShouldPlaySound(true);
      setTimeout(() => setShouldPlaySound(false), 300); // Increased to 300ms
    }
  }, [shouldPlaySound]);

  const particlesOptions = useMemo(() => 
    createParticlesConfig({
      onParticleCreated: handleParticleCreated,
    }), 
    [handleParticleCreated]
  );

  const decorativeImages: ImageData[] = [
    {
      src: "/images/zodiac-snake-cloud.png",
      alt: "cute snake",
      className: "snake-image",
      width: 200,
      height: 200,
    },
    {
      src: "/images/plum-branch.png",
      alt: "plum blossoms",
      className: "plum-left",
      width: 150,
      height: 200,
    },
    {
      src: "/images/plum-blossom.webp",
      alt: "plum blossoms",
      className: "plum-right",
      width: 150,
      height: 200,
    }
  ];

  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <FireworkSound isPlaying={isPlaying} shouldPlaySound={shouldPlaySound} />
      </Suspense>

      {isPlaying && (
        <Particles
          id="fireworks"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOptions}
        />
      )}

      <div className="firework-controls">
        <button
          className="control-button"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Stop Fireworks" : "Start Fireworks"}
          title={isPlaying ? "Stop Fireworks" : "Start Fireworks"}
        >
          {isPlaying ? "🔊" : "🔇"}
        </button>
      </div>

      <div className="lanterns">
        <div className="lantern"></div>
        <div className="lantern"></div>
        <div className="lantern"></div>
      </div>

      <div className="plum-blossoms">
        <LazyImage {...decorativeImages[1]} errorText="Plum branch failed to load" />
        <LazyImage {...decorativeImages[2]} errorText="Plum blossom failed to load" />
      </div>

      <Title className="main-title">
        <div className="title-wrapper">
          <div className="title-content">
            <GiftTwoTone twoToneColor="#FFD700" /> 
            <span className="vn-title">Năm Ất Tỵ 2025</span>
            <GiftTwoTone twoToneColor="#FFD700" />
          </div>
          <div className="subtitle-content">
            <HeartTwoTone twoToneColor="#FF4D4D" /> 
            <span className="en-title">Happy Vietnamese New Year</span>
            <HeartTwoTone twoToneColor="#FF4D4D" />
          </div>
        </div>
      </Title>

      <div className="snake-container">
        <div className="snake-symbol">
          <LazyImage {...decorativeImages[0]} errorText="Snake image failed to load" />
        </div>
      </div>

      <div className="content">
        <Title level={2} className="year-title">
          <CrownTwoTone twoToneColor="#FFD700" /> Năm Ất Tỵ 2025{" "}
          <CrownTwoTone twoToneColor="#FFD700" />
        </Title>
        <Space
          direction="horizontal"
          size="large"
          wrap
          className="blessing-cards"
        >
          {[
            { title: "Phúc", image: "zodiac-snake-lion-hat.png", text: "An khang thịnh vượng – Như ý cát tường" },
            { title: "Lộc", image: "zodiac-snake-lantern.png", text: "Túi luôn đầy tiền – Sung sướng như tiên" },
            { title: "An", image: "zodiac-snake-cloud.png", text: "May mắn đồng hành – An khang tới cửa" },
            { title: "Thần", image: "zodiac-snake-ruyi-knot.png", text: "Xuân sang rộn ràng – Ý chí vững vàng" }
          ].map((card, index) => (
            <Card
              key={index}
              className="tet-card"
              cover={
                <LazyImage
                  src={`/images/${card.image}`}
                  alt={card.title}
                  className="card-icon"
                  width={120}
                  height={120}
                  errorText={`${card.title} card image failed to load`}
                />
              }
            >
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </Card>
          ))}
        </Space>
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
