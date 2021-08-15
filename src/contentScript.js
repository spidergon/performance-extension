import { getLCP, getFID, getCLS, getFCP, getTTFB } from 'web-vitals';
import { METRICS_DESC, getColor } from './utils';

const infoDiv = document.createElement('div');
infoDiv.style.position = 'fixed';
infoDiv.style.left = 0;
infoDiv.style.top = 0;
infoDiv.style.zIndex = 999999;
infoDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
infoDiv.style.color = 'black';
infoDiv.style.padding = '1em';
infoDiv.style.margin = '0.5em';
infoDiv.style.fontFamily = 'Arial';
infoDiv.style.border = '2px solid black';
document.body.appendChild(infoDiv);

const metrics = {};

const gatherMetrics = ({ name, value }) => {
  metrics[name] = value;

  // TODO: persist data into db (InfluxDB or other)

  chrome.runtime.sendMessage({
    type: 'performance:metric',
    name,
    value,
  });

  const metricsHTML = Object.keys(metrics)
    .map((k) => {
      const color = getColor(k, metrics[k]);

      return `<div title="${
        METRICS_DESC[k].title
      }" style="color: ${color};">${k}</div><div style="color: ${color};">${Math.round(
        metrics[k]
      )}</div>`;
    })
    .join('');

  infoDiv.innerHTML = `
<div style="font-weight: bold; font-size: x-large;">Perf Metrics</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 1rem;">
  <div style="font-style: italic;">Metric</div>
  <div style="font-style: italic;">Value</div>
  ${metricsHTML}
</div>
  `;
};

getLCP(gatherMetrics);
getFID(gatherMetrics);
getCLS(gatherMetrics);
getFCP(gatherMetrics);
getTTFB(gatherMetrics);
