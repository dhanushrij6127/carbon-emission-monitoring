import { useEffect, useState } from "react";

function Dashboard() {
  const [sensorData, setSensorData] = useState({
    co2: 620,
    co: 4.2,
    pm25: 28,
    pm10: 45,
    temperature: 31.2,
    humidity: 62,
  });

  const [chartData, setChartData] = useState([
    580, 592, 601, 615, 608, 620, 614, 628, 621, 625,
  ]);

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

 useEffect(() => {
  const fetchSensorData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/sensor-data"
      );

      const data = await response.json();

      setSensorData((previous) => ({
        ...previous,
        co2: data.co2,
        co: data.co,
        temperature: data.temperature,
        humidity: data.humidity,
      }));

      setChartData((oldData) => [
        ...oldData.slice(-9),
        Math.round(data.co2),
      ]);

      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

    } catch (error) {
      console.error("Backend connection error:", error);
    }
  };

  fetchSensorData();

  const interval = setInterval(fetchSensorData, 3000);

  return () => clearInterval(interval);
}, []);

  const getRisk = () => {
    if (sensorData.co2 >= 800 || sensorData.co >= 8) {
      return {
        text: "HIGH RISK",
        className: "high",
        message: "Emission level requires immediate attention",
      };
    }

    if (sensorData.co2 >= 700 || sensorData.co >= 6) {
      return {
        text: "MODERATE",
        className: "moderate",
        message: "Emission level is above normal range",
      };
    }

    return {
      text: "SAFE",
      className: "safe",
      message: "Emission levels are within normal range",
    };
  };

  const risk = getRisk();

  const chartMin = 400;
  const chartMax = 900;

  const chartPoints = chartData
    .map((value, index) => {
      const x =
        chartData.length === 1
          ? 50
          : (index / (chartData.length - 1)) * 100;

      const y =
        100 -
        ((value - chartMin) / (chartMax - chartMin)) * 100;

      return `${x},${Math.max(4, Math.min(96, y))}`;
    })
    .join(" ");

  return (
    <div className="page dashboard-page">

      {/* HEADER */}
      <header className="page-header">
        <div>
          <div className="eyebrow">INDUSTRIAL MONITORING</div>

          <h1>Industry Overview</h1>

          <p>
            Real-time environmental emission and prediction monitoring
          </p>
        </div>

        <div className="header-status">
          <span className="online-dot"></span>

          <div>
            <strong>System Online</strong>
            <small>All sensors connected</small>
          </div>
        </div>
      </header>

      {/* INDUSTRY BAR */}
      <section className="industry-info">
        <div className="info-block">
          <span>INDUSTRY UNIT</span>
          <strong>Coal Processing Unit</strong>
        </div>

        <div className="info-block">
          <span>MONITORING STATUS</span>
          <strong className="green-text">Active Monitoring</strong>
        </div>

        <div className="info-block">
          <span>LAST UPDATE</span>
          <strong>{currentTime}</strong>
        </div>
      </section>

      {/* METRICS */}
      <section className="metric-grid">

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-symbol">CO₂</div>
            <span className="status-pill safe-pill">NORMAL</span>
          </div>

          <span className="metric-name">Carbon Dioxide</span>

          <div className="metric-value">
            {Math.round(sensorData.co2)}
            <small>ppm</small>
          </div>

          <div className="metric-bottom">
            <span>Current level</span>
            <span>Limit: 800 ppm</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-symbol">CO</div>
            <span className="status-pill safe-pill">NORMAL</span>
          </div>

          <span className="metric-name">Carbon Monoxide</span>

          <div className="metric-value">
            {sensorData.co.toFixed(1)}
            <small>ppm</small>
          </div>

          <div className="metric-bottom">
            <span>Current level</span>
            <span>Limit: 8 ppm</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-symbol">PM</div>
            <span className="status-pill safe-pill">NORMAL</span>
          </div>

          <span className="metric-name">Particulate Matter</span>

          <div className="metric-value">
            {Math.round(sensorData.pm25)}
            <small>µg/m³</small>
          </div>

          <div className="metric-bottom">
            <span>PM2.5</span>
            <span>Air particles</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-symbol">AIR</div>
            <span className="status-pill safe-pill">STABLE</span>
          </div>

          <span className="metric-name">Air Quality</span>

          <div className="metric-value">
            {Math.round(sensorData.pm10)}
            <small>µg/m³</small>
          </div>

          <div className="metric-bottom">
            <span>PM10</span>
            <span>Current level</span>
          </div>
        </div>

      </section>

      {/* CHART + RISK */}
      <section className="dashboard-two-column">

        {/* CHART */}
        <div className="panel chart-panel">

          <div className="panel-header">
            <div>
              <h2>CO₂ Emission Trend</h2>
              <p>Real-time carbon dioxide monitoring</p>
            </div>

            <div className="current-reading">
              <strong>{Math.round(sensorData.co2)}</strong>
              <span>ppm</span>
            </div>
          </div>

          <div className="chart-wrapper">

            <div className="chart-y-labels">
              <span>900</span>
              <span>800</span>
              <span>700</span>
              <span>600</span>
              <span>500</span>
              <span>400</span>
            </div>

            <div className="chart-main">

              <div className="chart-grid">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <svg
                className="emission-chart"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polyline
                  points={chartPoints}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />

                {chartData.map((value, index) => {
                  const x =
                    chartData.length === 1
                      ? 50
                      : (index / (chartData.length - 1)) * 100;

                  const y =
                    100 -
                    ((value - chartMin) /
                      (chartMax - chartMin)) *
                      100;

                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={Math.max(4, Math.min(96, y))}
                      r="1.1"
                      fill="currentColor"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              <div className="chart-x-labels">
                <span>10:00</span>
                <span>10:05</span>
                <span>10:10</span>
                <span>10:15</span>
                <span>10:20</span>
                <span>10:25</span>
                <span>10:30</span>
              </div>

            </div>
          </div>
        </div>

        {/* RISK */}
        <div className="panel risk-panel">

          <div className="panel-header">
            <div>
              <h2>Current Risk Status</h2>
              <p>Overall emission assessment</p>
            </div>
          </div>

          <div className="risk-content">

            <div className={`risk-circle ${risk.className}`}>
              <div className="risk-inner">
                {risk.text}
              </div>
            </div>

            <h3>{risk.message}</h3>

            <div className="risk-scale">

              <div>
                <span className="scale-dot safe-dot"></span>
                Safe
              </div>

              <div>
                <span className="scale-dot moderate-dot"></span>
                Moderate
              </div>

              <div>
                <span className="scale-dot high-dot"></span>
                High Risk
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* ENVIRONMENT */}
      <section className="panel environment-panel">

        <div className="panel-header">
          <div>
            <h2>Environmental Conditions</h2>
            <p>Current atmospheric parameters</p>
          </div>
        </div>

        <div className="environment-grid">

          <div className="environment-item">
            <span>Temperature</span>
            <strong>{sensorData.temperature.toFixed(1)} °C</strong>
            <small className="condition-good">Stable</small>
          </div>

          <div className="environment-item">
            <span>Humidity</span>
            <strong>{Math.round(sensorData.humidity)} %</strong>
            <small className="condition-good">Normal</small>
          </div>

          <div className="environment-item">
            <span>PM2.5</span>
            <strong>{Math.round(sensorData.pm25)} µg/m³</strong>
            <small className="condition-good">Normal</small>
          </div>

          <div className="environment-item">
            <span>PM10</span>
            <strong>{Math.round(sensorData.pm10)} µg/m³</strong>
            <small className="condition-good">Normal</small>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Dashboard;