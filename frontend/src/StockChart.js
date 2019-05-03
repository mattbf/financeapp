import Chart from 'react-google-charts';

function StockChart(data) {
  // pass data from parent compnoent and map to chart
}

<Component
  initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
  didMount={async function(component) {
    const COUNTRY_CODE = 'lb'
    const INDICATOR = 'DT.DOD.DECT.CD'
    const response = await fetch(
      'https://api.worldbank.org/v2/countries/' +
        COUNTRY_CODE +
        '/indicators/' +
        INDICATOR +
        '?format=json',
    )
    const json = await response.json()
    const [metadata, data] = json
    {
      /* console.log(data,metadata) */
    }
    const columns = [
      { type: 'date', label: 'Year' },
      { type: 'number', label: 'Debt' },
    ]
    let rows = []
    const nonNullData = data.filter(row => row.value !== null)
    for (let row of nonNullData) {
      const { date, value } = row
      rows.push([new Date(Date.parse(date)), value])
    }
    component.setState({
      chartData: [columns, ...rows],
      dataLoadingStatus: 'ready',
    })
  }}
>
  {component => {
    return component.state.dataLoadingStatus === 'ready' ? (
      <Chart
        chartType="LineChart"
        data={component.state.chartData}
        options={{
          hAxis: {
            format: 'yyyy',
          },
          vAxis: {
            format: 'short',
          },
          title: 'Debt incurred over time.',
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    ) : (
      <div>Fetching data from API</div>
    )
  }}
</Component>

export default StockChart
