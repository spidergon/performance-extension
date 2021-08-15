import { getTTFB, getLCP, getFID, getFCP, getCLS } from 'web-vitals';

const DESC = {
  CLS: 'Cumulative Layout Shift',
  FCP: 'First Contentful Paint',
  FID: 'First Input Delay',
  LCP: 'Largest Contentful Paint',
  TTFB: 'Time to First Byte (Reduce server response times)',
};

const infoDiv = document.createElement('div');
infoDiv.style.position = 'fixed';
infoDiv.style.left = 0;
infoDiv.style.top = 0;
infoDiv.style.zIndex = 999999;
infoDiv.style.backgroundColor = 'black';
infoDiv.style.color = 'white';
infoDiv.style.opacity = 0.7;
infoDiv.style.padding = '1rem';
infoDiv.style.fontFamily = 'Arial';
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
    .map((k) => `<div title="${DESC[k]}">${k}</div><div>${Math.round(metrics[k])}</div>`)
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

getCLS(gatherMetrics);
getFCP(gatherMetrics);
getFID(gatherMetrics);
getLCP(gatherMetrics);
getTTFB(gatherMetrics);
