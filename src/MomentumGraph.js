import React  from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



function getOption (payload) {

  
const option =  {

    chart: {
        zoomType: 'xy'
    },
    
    title: {
        text: 'Momentum'
    },


    yAxis: {
        title: {
            text: 'Value'
        }
    },

    xAxis: {
        type: 'datetime',
        labels: {
          format: "{value:%H:%M %p}",
          rotation: -50,
          align: 'right'
        }
        // categories: payload.categories,
        // crosshair: true
    },

    tooltip: {
        formatter: function () {
  
          console.log('this.points', this.points)
          var point = this.points[0];
          var point1 = this.points[1];
          return (
            '<b>' +
            'Graph' +
            '</b><br/>' +
            Highcharts.dateFormat('%A %B %e %Y', this.x) +
            ':<br/>' +
            point.series.name + ' = ' +
            Highcharts.numberFormat(point.y, 2) 
            +'<br/>' +
            ( point1 ? point1.series.name + ' = ' +
            Highcharts.numberFormat(point1.y, 2) : '') 
          );
        },
        shared: true,
      },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            // pointStart: 2010
        }
    },

    series: [{
        name: 'DataAzuki',
        data: payload.seriesData1
    }, {
        name: 'kongxData',
        data: payload.seriesData2
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
}
 return option
}
const  Graph = ({payload}) => {



    let option = getOption(payload)

    return (
    <HighchartsReact highcharts={Highcharts} options={option} />
    )
}

export default Graph