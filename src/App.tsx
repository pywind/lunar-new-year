import { useEffect, useCallback, useState } from "react";
import "./App.css";
import { Typography, Card, Space } from "antd";
import { 
  GiftTwoTone,
  HeartTwoTone,
  CrownTwoTone 
} from "@ant-design/icons";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import Particles from "react-tsparticles";
import type { Container, Engine } from "@tsparticles/engine";
import FireworkSound from "./components/FireworkSound";
import LazyImage from "./components/LazyImage";

const { Title, Text } = Typography;

// You can create a type for your image data
interface ImageData {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}

// Update the card data interface
interface CardData {
  alt: string;
  src: string;
  title: string;
  text: string;
  imageData: ImageData;
}

const cardData: CardData[] = [
  {
    alt: "prosperity",
    src: "/images/zodiac-snake-lion-hat.png",
    title: "Phúc",
    text: "An khang thịnh vượng – Như ý cát tường",
    imageData: {
      src: "/images/zodiac-snake-lion-hat.png",
      alt: "prosperity",
      className: "card-icon",
      width: 150,
      height: 150
    }
  },
  {
    alt: "luck",
    src: "/images/zodiac-snake-lantern.png",
    title: "Lộc",
    text: "Túi luôn đầy tiền – Sung sướng như tiên",
    imageData: {
      src: "/images/zodiac-snake-lantern.png",
      alt: "luck",
      className: "card-icon",
      width: 150,
      height: 150
    }
  },
  {
    alt: "happiness",
    src: "/images/zodiac-snake-cloud.png",
    title: "An",
    text: "May mắn đồng hành – An khang tới cửa",
    imageData: {
      src: "/images/zodiac-snake-cloud.png",
      alt: "happiness",
      className: "card-icon",
      width: 150,
      height: 150
    }
  },
  {
    alt: "money",
    src: "/images/zodiac-snake-ruyi-knot.png",
    title: "Thần",
    text: "Xuân sang rộn ràng – Ý chí vững vàng",
    imageData: {
      src: "/images/zodiac-snake-ruyi-knot.png",
      alt: "money",
      className: "card-icon",
      width: 150,
      height: 150
    }
  }
];

function App() {
  const [isFireworkPlaying, setIsFireworkPlaying] = useState(false);
  const [shouldPlaySound, setShouldPlaySound] = useState(true);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Fireworks loaded");
  }, []);

  const handleParticleCreated = useCallback(() => {
    setIsFireworkPlaying(true);
    // Reset the state after a short delay
    setTimeout(() => setIsFireworkPlaying(false), 100);
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
      
      <div className="lanterns">
        <div className="lantern"></div>
        <div className="lantern"></div>
        <div className="lantern"></div>
      </div>

      <div className="plum-blossoms">
        <img src="/images/plum-branch.png" alt="plum blossoms" className="plum-left" />
        <img src="/images/plum-branch.png" alt="plum blossoms" className="plum-right" />
      </div>
      
      <Title level={1} className="title">
        <GiftTwoTone twoToneColor="#FFD700" /> Tết Việt 2025 <GiftTwoTone twoToneColor="#FFD700" />
        <Text className="english-title">
          <HeartTwoTone twoToneColor="#FF4D4D" /> Happy Vietnamese New Year <HeartTwoTone twoToneColor="#FF4D4D" />
        </Text>
      </Title>

      <div className="snake-container">
        <div className="snake-symbol">
          <img src="/images/cute-snake.png" alt="cute snake" className="snake-image" />
        </div>
      </div>

      <div className="content">
        <Title level={2} className="year-title">
          <CrownTwoTone twoToneColor="#FFD700" /> Năm Ất Tỵ 2025 <CrownTwoTone twoToneColor="#FFD700" />
        </Title>
        <Space direction="horizontal" size="large" wrap className="blessing-cards">
          {cardData.map(card => (
            <Card
              key={card.alt}
              className="tet-card"
              cover={
                <LazyImage
                  {...card.imageData}
                  fallback="/images/fallback-image.png"
                  errorText={`Failed to load ${card.alt} image`}
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
