import { useEffect, useState } from "react";

function Alerts() {
  const [co2, setCo2] = useState(620);

  useEffect(() => {
    const interval = setInterval(() => {
      setCo2((prev) =>
        Math.max(
          550,
          Math.min(850, prev + Math.random() * 18 - 8)
        )
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getCurrentAlert = () => {
    if (co2 >= 800) {
      return {
        type: "high",
        title: "High emission detected",
        message:
          "CO₂ level has crossed the monitored threshold.",
      };
    }

    if (co2 >= 700) {
      return {
        type: "moderate",
        title: "CO₂ level increasing",
        message:
          "CO₂ level is approaching the monitored threshold.",
      };
    }

    return {
      type: "safe",
      title: "Emission levels normal",
      message:
        "Current emission levels are within the monitored range.",
    };
  };

  const currentAlert = getCurrentAlert();

  return (
    <div className="page">

      <header className="page-header">
        <div>
          <div className="eyebrow">ENVIRONMENTAL EVENTS</div>
          <h1>Alerts</h1>
          <p>Emission alerts and monitoring events</p>
        </div>

        <div className="header-status">
          <span className="online-dot"></span>

          <div>
            <strong>Monitoring Active</strong>
            <small>Alert detection enabled</small>
          </div>
        </div>
      </header>

      {/* SUMMARY */}
      <section className="alert-summary">

        <div className="alert-summary-card">
          <span className="summary-number safe-number">2</span>
          <div>
            <strong>Safe</strong>
            <small>Normal conditions</small>
          </div>
        </div>

        <div className="alert-summary-card">
          <span className="summary-number moderate-number">1</span>
          <div>
            <strong>Moderate</strong>
            <small>Requires attention</small>
          </div>
        </div>

        <div className="alert-summary-card">
          <span className="summary-number high-number">0</span>
          <div>
            <strong>High Risk</strong>
            <small>Immediate attention</small>
          </div>
        </div>

      </section>

      {/* CURRENT ALERT */}
      <section className="panel current-alert-panel">

        <div className="panel-header">
          <div>
            <h2>Current Status</h2>
            <p>Latest emission assessment</p>
          </div>

          <span className={`alert-badge ${currentAlert.type}`}>
            {currentAlert.type === "safe"
              ? "NORMAL"
              : currentAlert.type === "moderate"
              ? "MODERATE"
              : "HIGH RISK"}
          </span>
        </div>

        <div className={`current-alert ${currentAlert.type}`}>

          <div className="alert-status-circle">
            {currentAlert.type === "safe"
              ? "OK"
              : currentAlert.type === "moderate"
              ? "!"
              : "!"}
          </div>

          <div>
            <h3>{currentAlert.title}</h3>
            <p>{currentAlert.message}</p>
          </div>

          <div className="alert-reading">
            <span>CO₂</span>
            <strong>{Math.round(co2)} ppm</strong>
          </div>

        </div>

      </section>

      {/* RECENT ALERTS */}
      <section className="panel recent-alerts-panel">

        <div className="panel-header">
          <div>
            <h2>Recent Alerts</h2>
            <p>Latest system events</p>
          </div>
        </div>

        <div className="alerts-list">

          <div className="alert-row">
            <div className="alert-row-indicator moderate-indicator"></div>

            <div className="alert-row-content">
              <strong>CO₂ level increasing</strong>
              <span>
                Emission level is approaching the monitored threshold.
              </span>
            </div>

            <time>10:24 AM</time>

            <span className="alert-badge moderate">
              MODERATE
            </span>
          </div>

          <div className="alert-row">
            <div className="alert-row-indicator safe-indicator"></div>

            <div className="alert-row-content">
              <strong>Monitoring system online</strong>
              <span>
                All connected environmental sensors are active.
              </span>
            </div>

            <time>10:20 AM</time>

            <span className="alert-badge safe">
              SAFE
            </span>
          </div>

          <div className="alert-row">
            <div className="alert-row-indicator safe-indicator"></div>

            <div className="alert-row-content">
              <strong>Emission levels normal</strong>
              <span>
                Current readings remain within the monitored range.
              </span>
            </div>

            <time>10:15 AM</time>

            <span className="alert-badge safe">
              SAFE
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Alerts;