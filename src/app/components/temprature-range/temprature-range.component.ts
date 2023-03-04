import { Component, Input, OnInit } from '@angular/core';
import * as HighCharts from "highcharts";
import { Options } from "highcharts";
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';
@Component({
  selector: 'app-temprature-range',
  templateUrl: './temprature-range.component.html',
  styleUrls: ['./temprature-range.component.scss'],
})
export class TempratureRangeComponent implements OnInit {
  show = false;
  tempraturerange = [{ "Hours": [] }, { "temp1": [], "temp2": [], "temp3": [], "temp4": [] }]
  headings: string[];
  values: any;
  series = [];
  today = new Date();
  @Input() gridView;
  tempraturerangeHeading = [];
  constructor(
    private ajaxService: AjaxService
  ) { }


  // chartOptions: HighCharts.Options = {
  //   chart: {
  //     renderTo: 'tempratureRange',
  //     type: 'area',
  //     height: 200,
  //     zoomType: 'x'
  //   },
  //   title: {
  //     text: null
  //   },
  //   xAxis: {
  //     categories: this.tempraturerangeHeading,
  //     title: {
  //       text: "Hours"
  //     }
  //   },

  //   credits: {
  //     enabled: false
  //   },
  //   tooltip: {
  //     enabled: true
  //   },
  //   yAxis: [{
  //     min: -40,
  //     max: 40,
  //     allowDecimals: true,
  //     title: {
  //       text: "Temperature (°C)"
  //     },
  //   }],
  //   legend: {
  //     layout: 'vertical',
  //     align: 'right',
  //     verticalAlign: 'middle'
  //   },
  //   plotOptions: {
  //     area: {
  //       dataLabels: {
  //         enabled: false,
  //         color: 'black',
  //         borderWidth: 0,
  //         style: {
  //           textOutline: "none"
  //         }
  //       }
  //     }
  //   },
  //   series: this.series
  // }

  chartOptions: HighCharts.Options = {
    chart: {
      renderTo: 'tempratureRange',
      type: 'line',
      height: 200,
      zoomType: 'x'
    },
    title: {
      text: null
    },
    xAxis: {
      categories: this.tempraturerangeHeading,
    },

    credits: {
      enabled: false
    },
    tooltip: {
      enabled: true,
      formatter: function () {
        return 'Temperature Sensor <b>' + this.point.series.name + '</b><br> Range: <b>' + this.y +
          '</b> at <b>' + this.x + '</b>';
      }
    },
    yAxis: [{
      min: -40,
      max: 40,
      allowDecimals: true,
      title: {
        text: "Temperature (°C)"
      },
    }],
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false
        }
      }
    },
    series: this.series
  }

  ngOnChanges() {
    if (this.gridView) {
      const data = {
        "vin": this.gridView,
        "fromDate": this.today.toJSON().split("T")[0] + " 00:00:00",
        "toDate": this.today.toJSON().split("T")[0] + " 23:59:59",
      }
      const url = serverUrl.web + "/simcard/chartSummary/temperature"
      this.ajaxService.ajaxPostWithBody(url, data)
        .subscribe(res => {
          this.values = [];
          this.headings = [];
          this.series = [];
          this.tempraturerange = res
          this.values = Object.values(this.tempraturerange[1]);
          this.headings = Object.keys(this.tempraturerange[1]);
          for (let i = 0; i < this.tempraturerange[0].Hours.length; i++) {
            this.tempraturerangeHeading.push(this.tempraturerange[0].Hours[i])
          }
          for (let i = 0; i < Object.keys(this.tempraturerange[1]).length; i++) {
            this.series.push({
              type: undefined,
              name: Object.keys(this.tempraturerange[1])[i],
              data: Object.values(this.tempraturerange[1])[i]
            })
          }
          this.chartOptions.series = [];
          this.chartOptions.series = this.series
          HighCharts.chart("tempratureRange", this.chartOptions);

        });
    }

  }
  ngOnInit() {
    HighCharts.chart("tempratureRange", this.chartOptions);
    this.headings = Object.keys(this.tempraturerange[1]);
  }

}
