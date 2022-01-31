window.onload = function () {
  var renderChart = function (chartData, chartContainer, Ticker = "Ticker", Amount = 0) {
    var chart1 = new CanvasJS.Chart(chartContainer,
      {
        animationEnabled: false,
        title: {
          text: Ticker + "                                                             " + Amount,
          fontColor: "#2f4f4f",
          fontSize: 20
        },
        axisY: {
          title: "Price", minimum: 0, maximum: 6, includeZero: false, gridThickness: 1
        },
        data: chartData
      });
    chart1.render();
  }


  var stocks = window.instance;

 for (const element of stocks) {
   var dataPoints1 = [];
   for(const prices of element.PastPrices){
    dataPoints1.push({
      y: prices.value
      });
   }
    console.log(element.ticker + " " + dataPoints1.length);
   var data1 = [{
    markerType: "none",
    type: "line",
    dataPoints: dataPoints1
  }];
  renderChart(data1, element.ticker, element.ticker, element.Price);
}
}


