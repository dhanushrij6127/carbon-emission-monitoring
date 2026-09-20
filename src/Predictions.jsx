import { useEffect, useState } from "react";

function Predictions() {
  const [currentCO2, setCurrentCO2] = useState(620);

  const [predictionData, setPredictionData] = useState([
    625, 632, 641, 650, 658, 665, 672, 680, 688, 695,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCO2((prev) =>
        Math.max(
          500,
          Math.min(780, prev + Math.random() * 16 - 5)
        )
      );

      setPredictionData((prev) => {
        const last = prev[prev.length - 1];

        const next = Math.max(
          500,
          Math.min(
            800,
            last + Math.random() * 12 + 3
          )
        );

        return [...prev.slice(1), Math.round(next)];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const predictedValue =
    predictionData[predictionData.length - 1];

  const trend =
    predictedValue > currentCO2 ? "Increasing" : "Stable";

  const max = 850;
  const min = 500;

  const points = predictionData
    .map((value, index) => {
      const x = (index / 9) * 100;
      const y =
        100 -
        ((value - min) / (max - min)) * 100;

      return `${x},${Math.max(5, Math.min(95, y))}`;
    })
    .join(" ");

  return (
    <div className="page">

      <header className="page-header">
        <div>
          <div className="eyebrow">INTELLIGENT ANALYSIS</div>
          <h1>AI Predictions</h1>
          <p>Emission trend prediction and risk forecasting</p>
        </div>

        <div className="prediction-model">
          <span>MODEL</span>
          <strong>Vanilla LSTM</strong>
        </div>
      </header>

      <section className="prediction-summary">

        <div className="prediction-stat">
          <span>CURRENT CO₂</span>
          <strong>{Math.round(currentCO2)} <small>ppm</small></strong>
          <em>Current reading</em>
        </div>

        <div className="prediction-stat">
          <span>PREDICTED CO₂</span>
          <strong>{predictedValue} <small>ppm</small></strong>
          <em>Upcoming trend</em>
        </div>

        <div className="prediction-stat">
          <span>EMISSION TREND</span>
          <strong className="blue-text">{trend}</strong>
          <em>Based on recent readings</em>
        </div>

        <div className="prediction-stat">
          <span>RISK FORECAST</span>
          <strong className="green-text">SAFE</strong>
          <em>Current forecast</em>
        </div>

      </section>

      <section className="prediction-main-grid">

        <div className="panel prediction-chart-panel">

          <div className="panel-header">
            <div>
              <h2>Predicted CO₂ Trend</h2>
              <p>Emission forecast based on recent sensor readings</p>
            </div>

            <div className="forecast-label">
              FORECAST
            </div>
          </div>

          <div className="prediction-chart-area">

            <div className="prediction-y-axis">
              <span>850</span>
              <span>800</span>
              <span>700</span>
              <span>600</span>
              <span>500</span>
            </div>

            <div className="prediction-chart">

              <div className="prediction-grid">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="forecast-svg"
              >
                <polyline
                  points={points}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />

                {predictionData.map((value, index) => {
                  const x = (index / 9) * 100;

                  const y =
                    100 -
                    ((value - min) / (max - min)) * 100;

                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={Math.max(5, Math.min(95, y))}
                      r="1"
                      fill="currentColor"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

            </div>
          </div>
        </div>

        <div className="panel insight-panel">

          <div className="panel-header">
            <div>
              <h2>AI Insights</h2>
              <p>Emission trend analysis</p>
            </div>
          </div>

          <div className="insight-list">

            <div className="insight-item">
              <div className="insight-icon blue-icon">
                T
              </div>

              <div>
                <strong>Emission Trend</strong>
                <p>
                  CO₂ levels are showing a gradual upward trend.
                </p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-icon green-icon">
                R
              </div>

              <div>
                <strong>Risk Assessment</strong>
                <p>
                  Current predicted levels remain within the safe range.
                </p>
              </div>
            </div>

            <div className="insight-item">
              <div className="insight-icon amber-icon">
                W
              </div>

              <div>
                <strong>Early Warning</strong>
                <p>
                  Continuous monitoring is recommended as levels increase.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

      <section className="panel forecast-panel">

        <div className="panel-header">
          <div>
            <h2>Emission Forecast</h2>
            <p>Predicted environmental condition</p>
          </div>
        </div>

        <div className="forecast-cards">

          <div>
            <span>CO₂</span>
            <strong>{predictedValue} ppm</strong>
            <small>Predicted level</small>
          </div>

          <div>
            <span>Trend</span>
            <strong>{trend}</strong>
            <small>Emission direction</small>
          </div>

          <div>
            <span>Risk Level</span>
            <strong className="green-text">Safe</strong>
            <small>Forecast assessment</small>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Predictions;