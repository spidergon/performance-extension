const METRICS_DESC = {
  LCP: {
    title: 'Largest Contentful Paint',
    goodTreshold: 2500,
    mediumTreshold: 4000,
  },
  FID: {
    title: 'First Input Delay',
    goodTreshold: 100,
    mediumTreshold: 300,
  },
  CLS: {
    title: 'Cumulative Layout Shift',
    goodTreshold: 100,
    mediumTreshold: 250,
  },
  FCP: {
    title: 'First Contentful Paint',
    goodTreshold: 1800,
    mediumTreshold: 3000,
  },
  TTFB: {
    title: 'Time to First Byte (Reduce server response times)',
    goodTreshold: 500,
    mediumTreshold: 600,
  },
};

function getColor(metric, value) {
  if (value <= METRICS_DESC[metric].goodTreshold) {
    return 'green';
  } else if (value <= METRICS_DESC[metric].mediumTreshold) {
    return 'orange';
  } else {
    return 'red';
  }
}

export { METRICS_DESC, getColor };
