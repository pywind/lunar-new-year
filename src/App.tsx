import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="fireworks">
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
      </div>
      
      <div className="lanterns">
        <div className="lantern"></div>
        <div className="lantern"></div>
        <div className="lantern"></div>
      </div>
      
      <h1 className="title">
        恭喜發財 <br />
        <span className="english-title">Happy Lunar New Year</span>
      </h1>

      <div className="snake-container">
        <div className="snake-symbol">🐍</div>
      </div>

      <div className="content">
        <h2 className="year-title">Year of the Snake 2025</h2>
        <div className="blessing-cards">
          <div className="card">
            <h3>智慧 Wisdom</h3>
            <p>May the Snake's wisdom guide your path</p>
          </div>
          <div className="card">
            <h3>繁榮 Prosperity</h3>
            <p>Wishing you wealth and abundance</p>
          </div>
          <div className="card">
            <h3>好運 Fortune</h3>
            <p>Good fortune follows you this year</p>
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
