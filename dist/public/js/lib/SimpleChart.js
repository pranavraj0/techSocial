window.onload = function () {
  var renderChart = function (chartData, chartContainer, Ticker = "Ticker") {
    var chart1 = new CanvasJS.Chart(chartContainer,
      {
        animationEnabled: true,
        gridThickness: 0,
        title: {
          text: Ticker
        },
        axisY: {
          title: "Price", minimum: 0, maximum: 6, includeZero: false,
          stripLines: [
            {
              value: 0,
              showOnTop: true,
              color: "gray",
              thickness: 2
            }
          ]
        },
        data: chartData
      });
    chart1.render();
  }


  var stocks = window.instance;

 for (const element of stocks) {
   var dataPoints1 = []
   
   for(const prices of element.PastPrices){
    dataPoints1.push({
      y: prices.value
      });
   }
   console.log(typeof dataPoints1[0])
   

   var data1 = [{
    type: "line",
    dataPoints: dataPoints1
  }];
  
  renderChart(data1, element.ticker, element.ticker);
}
}


