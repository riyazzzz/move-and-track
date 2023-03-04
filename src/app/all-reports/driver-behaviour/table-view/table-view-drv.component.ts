import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-table-view-drv',
  templateUrl: './table-view-drv.component.html',
  styleUrls: ['./table-view-drv.component.scss'],
})
export class TableViewDrvComponent implements AfterViewInit {
  constructor() { }
  @Input() tableData;
  @ViewChild('grid', { static: true }) myGrid;
  source: any = {
    localdata: []
  };
  mode = "yesterday";
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any = [];
  ngAfterViewInit(): void {
    this.myGrid.autoresizecolumns();
  }
  modeSelect(selectedTab) {
    this.mode = selectedTab;
  }
  exportData(type) {
    if (type == "print") {
      let gridContent = this.myGrid.exportdata('html');
      let newWindow = window.open('', '', 'width=800, height=500'),
        document = newWindow.document.open(),
        pageContent =
          '<!DOCTYPE html>\n' +
          '<html>\n' +
          '<head>\n' +
          '<meta charset="utf-8" />\n' +
          '<title>jQWidgets Grid</title>\n' +
          '</head>\n' +
          '<body>\n' + gridContent + '\n</body>\n</html>';
      document.write(pageContent);
      document.close();
      newWindow.print();
    } else {
      this.myGrid.exportdata(type, 'jqxGrid');
    }
  }
  ngOnChanges(changes): void {
    if (changes.tableData.currentValue != undefined) {
      this.source = { localdata: changes.tableData.currentValue.localData };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.columns = [{
        text: 'Driver', datafield: 'driver', cellsalign: 'center', align: 'center'
      },
      {
        text: 'Plate No.', datafield: 'plateNo', cellsalign: 'center', align: 'center'
      },
      {
        text: 'Overall Score', datafield: 'overAllScore', cellsalign: 'center', align: 'center',
        cellsrenderer: function (row, column, value) {
          return "<div style='margin:20%'><span style='padding:0 20%;background:green;color:white'>+" + value + "</span></div>";
        }
      },
      { text: 'Excessive Idling', datafield: 'excessiveIdling', cellsalign: 'center', align: 'center' },
      { text: 'Running Duration', datafield: 'runningDuration', cellsalign: 'center', align: 'center' },
      { text: 'Engine ON Duration', datafield: 'engineOnDuration', cellsalign: 'center', align: 'center' },
      {
        text: 'Top Speed', datafield: 'topSpeed', cellsalign: 'center', align: 'center',
        cellsrenderer: function (row, column, value) {
          return "<div style='margin:27% 20%'><span style='padding:0 20%;background:orange;color:white'>+" + value + "</span></div>";
        }
      },
      {
        text: 'Average Speed', datafield: 'averageSpeed', cellsalign: 'center', align: 'center',
        cellsrenderer: function (row, column, value) {
          return "<div style='margin:20%'><span style='padding:0 20%;background:yellow;'>+" + value + "</span></div>";
        }
      },
      {
        text: 'Harsh Braking', datafield: 'harshBraking', cellsalign: 'center', align: 'center',
        cellsrenderer: function (row, column, value) {
          return "<div style='margin:20%'><span style='padding:0 20%;background:brown;color:white'>+" + value + "</span></div>";
        }
      },
      { text: 'Harsh Acceleration', datafield: 'harshAcceleration', cellsalign: 'center', align: 'center' },
      { text: 'Drift', datafield: 'drift', cellsalign: 'center', align: 'center' },
      { text: 'Tilt', datafield: 'tilt', cellsalign: 'center', align: 'center' },
      { text: 'Distance Travelled', datafield: 'distanceTravelled', cellsalign: 'center', align: 'center' },
      { text: 'Average Fuel Consumption', datafield: 'averageFuelConsumption', cellsalign: 'center', align: 'center' }
      ];
    }
  }

}
