import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

const sdk = new ChartsEmbedSDK({
  baseUrl: 'https://charts.mongodb.com/charts-query_tester-hnjgdtd',
});

// embed a chart
const chart = sdk.createChart({
  chartId: '48043c78-f1d9-42ab-a2e1-f2d3c088f864',
});

// render the chart into a container
chart
  .render(document.getElementById('chart'))
  .catch(() => window.alert('Chart failed to initialise'));

// refresh the chart whenever #refreshButton is clicked
document
  .getElementById('refreshButton')
  .addEventListener('click', () => chart.refresh());

// embed a dashboard
const dashboard = sdk.createDashboard({
  dashboardId: '27b3085f-76fc-48ed-b0e9-cee5d0b40ac1',
});

// render the chart into a container
dashboard
  .render(document.getElementById('dashboard'))
  .catch(() => window.alert('Dashboard failed to initialise'));