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
import { Responsive } from './components/Responsive';
import { useScreenSize } from './hooks/useScreenSize';
import { Lanterns } from './components/Lanterns';

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

  const cardGrid = isMobile ? (
    <Space direction="vertical" size="large" className="blessing-cards">
      {cardData.map(card => (
        <Card
          key={card.alt}
          className="tet-card"
          style={{ width: '100%', maxWidth: '300px' }}
          cover={
            <LazyImage
              {...card.imageData}
              fallback="/images/zodiac-snake-money-tree.png"
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
  ) : (
    <Space direction="horizontal" size="large" wrap className="blessing-cards">
      {cardData.map(card => (
        <Card
          key={card.alt}
          className="tet-card"
          cover={
            <LazyImage
              {...card.imageData}
              fallback="/images/zodiac-snake-money-tree.png"
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
  );

  const pageTitle = (
    <Title level={1} className="title" style={{ fontSize: isMobile ? '1.5rem' : undefined }}>
      <GiftTwoTone twoToneColor="#FFD700" /> Tết Việt 2025 <GiftTwoTone twoToneColor="#FFD700" />
      <Text className="english-title">
        <HeartTwoTone twoToneColor="#FF4D4D" /> Happy Vietnamese New Year <HeartTwoTone twoToneColor="#FF4D4D" />
      </Text>
    </Title>
  );

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

      <div className="plum-blossoms">
        <img src="/images/plum-branch.png" alt="plum blossoms" className="plum-left" />
        <img src="/images/plum-branch.png" alt="plum blossoms" className="plum-right" />
      </div>
      
      <Responsive breakpoints={pageTitle}>
        {pageTitle}
      </Responsive>

      <div className="snake-container">
        <div className="snake-symbol">
          <img src="/images/cute-snake.png" alt="cute snake" className="snake-image" />
        </div>
      </div>

      <div className="content">
        <Title level={2} className="year-title">
          <CrownTwoTone twoToneColor="#FFD700" /> Năm Ất Tỵ 2025 <CrownTwoTone twoToneColor="#FFD700" />
        </Title>
        
        {cardGrid}
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
