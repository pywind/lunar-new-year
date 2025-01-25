import { useEffect, useCallback } from "react";
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

const { Title, Text } = Typography;

function App() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Fireworks loaded");
  }, []);

  useEffect(() => {
    document.body.className = "ant-dark";
  }, []);

  return (
    <div className="container">
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
          <Card 
            className="tet-card"
            cover={<img alt="prosperity" src="/images/zodiac-snake-lion-hat.png" className="card-icon" />}
          >
            <div className="card-content">
              <h3>Phúc</h3>
              <p>An khang thịnh vượng – Như ý cát tường</p>
            </div>
          </Card>
          <Card 
            className="tet-card"
            cover={<img alt="luck" src="/images/zodiac-snake-lantern.png" className="card-icon" />}
          >
            <div className="card-content">
              <h3>Lộc</h3>
              <p>Túi luôn đầy tiền – Sung sướng như tiên</p>
            </div>
          </Card>
          <Card 
            className="tet-card"
            cover={<img alt="happiness" src="/images/zodiac-snake-cloud.png" className="card-icon" />}
          >
            <div className="card-content">
              <h3>An</h3>
              <p>May mắn đồng hành – An khang tới cửa</p>
            </div>
          </Card>
          <Card 
            className="tet-card"
            cover={<img alt="money" src="/images/zodiac-snake-ruyi-knot.png" className="card-icon" />}
          >
            <div className="card-content">
              <h3>Thần</h3>
              <p>Xuân sang rộn ràng – Ý chí vững vàng</p>
            </div>
          </Card>
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
