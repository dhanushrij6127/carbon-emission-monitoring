import { useEffect, useState } from "react";

function Monitoring() {
  const [data, setData] = useState({
    co2: 620,
    co: 4.2,
    pm1: 18,
    pm25: 28,
    pm10: 45,
    temperature: 31.2,
    humidity: 62,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        co2: Math.max(
          500,
          Math.min(900, prev.co2 + Math.random() * 20 - 10)
        ),
        co: Math.max(
          2,
          Math.min(10, prev.co + Math.random() * 0.6 - 0.3)
        ),
        pm1: Math.max(
          8,
          Math.min(50, prev.pm1 + Math.random() * 3 - 1.5)
        ),
        pm25: Math.max(
          15,
          Math.min(70, prev.pm25 + Math.random() * 4 - 2)
        ),
        pm10: Math.max(
          25,
          Math.min(90, prev.pm10 + Math.random() * 5 - 2.5)
        ),
        temperature: Math.max(
          27,
          Math.min(38, prev.temperature + Math.random() * 0.4 - 0.2)
        ),
        humidity: Math.max(
          45,
          Math.min(75, prev.humidity + Math.random() * 1 - 0.5)
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sensors = [
    {
      key: "co2",
      code: "CO₂",
      name: "Carbon Dioxide",
      value: Math.round(data.co2),
      unit: "ppm",
      limit: "800 ppm",
    },
    {
      key: "co",
      code: "CO",
      name: "Carbon Monoxide",
      value: data.co.toFixed(1),
      unit: "ppm",
      limit: "8 ppm",
    },
    {
      key: "pm1",
      code: "PM1.0",
      name: "Particulate Matter",
      value: Math.round(data.pm1),
      unit: "µg/m³",
      limit: "—",
    },
    {
      key: "pm25",
      code: "PM2.5",
      name: "Fine Particles",
      value: Math.round(data.pm25),
      unit: "µg/m³",
      limit: "—",
    },
    {
      key: "pm10",
      code: "PM10",
      name: "Coarse Particles",
      value: Math.round(data.pm10),
      unit: "µg/m³",
      limit: "—",
    },
    {
      key: "temperature",
      code: "TEMP",
      name: "Temperature",
      value: data.temperature.toFixed(1),
      unit: "°C",
      limit: "—",
    },
    {
      key: "humidity",
      code: "RH",
      name: "Humidity",
      value: Math.round(data.humidity),
      unit: "%",
      limit: "—",
    },
  ];

  return (
    <div className="page">

      <header className="page-header">
        <div>
          <div className="eyebrow">SENSOR NETWORK</div>
          <h1>Live Monitoring</h1>
          <p>Real-time readings from environmental sensors</p>
        </div>

        <div className="header-status">
          <span className="online-dot"></span>
          <div>
            <strong>System Online</strong>
            <small>Live sensor readings</small>
          </div>
        </div>
      </header>

      <section className="monitoring-summary">
        <div>
          <span>CONNECTED SENSORS</span>
          <strong>4 / 4</strong>
        </div>

        <div>
          <span>MONITORING STATUS</span>
          <strong className="green-text">ACTIVE</strong>
        </div>

        <div>
          <span>DATA UPDATE</span>
          <strong>Every 3 seconds</strong>
        </div>
      </section>

      <section className="sensor-grid">

        {sensors.map((sensor) => (
          <div className="sensor-card" key={sensor.key}>

            <div className="sensor-card-top">
              <div className="sensor-code">
                {sensor.code}
              </div>

              <span className="status-pill safe-pill">
                NORMAL
              </span>
            </div>

            <span className="sensor-name">
              {sensor.name}
            </span>

            <div className="sensor-value">
              {sensor.value}
              <small>{sensor.unit}</small>
            </div>

            <div className="sensor-footer">
              <span>Current reading</span>
              <span>
                {sensor.limit !== "—"
                  ? `Limit: ${sensor.limit}`
                  : "Monitoring"}
              </span>
            </div>

          </div>
        ))}

      </section>

      <section className="panel monitoring-table-panel">

        <div className="panel-header">
          <div>
            <h2>Sensor Overview</h2>
            <p>Connected environmental parameters</p>
          </div>

          <span className="table-live">
            LIVE
          </span>
        </div>

        <div className="sensor-table">

          <div className="table-row table-heading">
            <span>PARAMETER</span>
            <span>VALUE</span>
            <span>UNIT</span>
            <span>STATUS</span>
          </div>

          {sensors.map((sensor) => (
            <div className="table-row" key={sensor.key}>
              <strong>{sensor.name}</strong>
              <strong>{sensor.value}</strong>
              <span>{sensor.unit}</span>
              <span className="table-status">
                <i></i>
                Normal
              </span>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}

export default Monitoring;