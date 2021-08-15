import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getColor } from './utils';
import './App.css';

const METRICS = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'];

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        type: 'performance:metric:request',
      },
      (d) => {
        setData(d);
      }
    );
  }, []);

  return (
    <div>
      <h1>Page Metrics</h1>
      <table>
        <thead>
          <tr>
            <th width="20%"></th>
            {METRICS.map((metric) => (
              <th key={metric} width="16%">
                {metric}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((url) => (
            <tr key={url}>
              <td>{url.slice(0, 30)}</td>
              {METRICS.map((metric) => {
                const value = Math.round((data[url][metric] || { average: 0 }).average);

                return (
                  <td
                    style={{ color: getColor(metric, value) }}
                    key={[url, metric].join('')}
                    width="16%"
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
