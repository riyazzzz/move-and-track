import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements AfterViewInit {
  constructor(
    private platform: Platform
  ) { }
  @Input() tableData;
  @ViewChild('grid', { static: true }) myGrid;
  source: any = {
    localdata: []
  };
  mode = "yesterday";
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any = [];
  dateValue: Date;
  window: boolean = false;
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
      this.columns = [
        {
          text: 'Plate No. | Operator | Group', datafield: 'plateOperGroup', cellsalign: 'center', align: 'center',
          cellsrenderer: function (row, column, value) {
            let val = JSON.parse(value);
            return '<div class="row"><img width="15px" src="assets/executive_summary_icon/vehicle.svg">' +
              val["plateNo"] +
              '</div><div class="row">------</div><div class="row" style="display:flex"><div style="width:50%"><img width="15px" src="assets/executive_summary_icon/operator.svg">' +
              val["operator"] +
              '</div><div style="width:50%"><img width="15px" src="assets/executive_summary_icon/group.svg">' +
              val["group"] + '</div></div>';
          }
        },
        { text: 'Running Duration', classname: 'greencolumn', datafield: 'runningDuration', cellsalign: 'center', align: 'center', color: 'green' },
        { text: 'Stop Duration', classname: 'redcolumn', datafield: 'stopDuration', cellsalign: 'center', align: 'center' },
        { text: 'Idle Duration', classname: 'bluecolumn', datafield: 'idleDuration', cellsalign: 'center', align: 'center' },
        { text: 'Towed Duration', classname: 'pinkcolumn', datafield: 'towedDuration', cellsalign: 'center', align: 'center' },
        { text: 'Max Speed', datafield: 'maxSpeed', cellsalign: 'center', align: 'center' },
        { text: 'Odometer', datafield: 'odometer', cellsalign: 'center', align: 'center' },
        {
          text: 'Alert Count', datafield: 'alertCount', cellsalign: 'center', align: 'center',
          cellsrenderer: function (row, column, value) {
            let val = JSON.parse(value);
            var htmlContain = "";
            for (var i = 0; i < Object.keys(val).length; i++) {
              if (i % 2 == 0)
                htmlContain += '<br><div class="row" style="display:inline-flex;border-right: 1px solid #a0a0a0;padding: 0px 6px;">' + Object.keys(val)[i] + '<div style="color: white;height: 20px;width: 20px;border-radius: 20px;text-align:center;background:orange;margin-left: 10px;">' + Object.values(val)[i] + '</div></div>';
              else
                htmlContain += '<div class="row" style="display:inline-flex;border-right: 1px solid #a0a0a0;padding: 0px 6px;">' + Object.keys(val)[i] + '<div style="color: white;height: 20px;width: 20px;border-radius: 20px;text-align:center;background:orange;margin-left: 10px;">' + Object.values(val)[i] + '</div></div>';
            }
            return htmlContain;
          }
        },
        { text: 'Begin Time', datafield: 'beginTime', cellsalign: 'center', align: 'center' },
        { text: 'Begin Location', datafield: 'beginLocation', cellsalign: 'center', align: 'center' },
        { text: 'End Time', datafield: 'endTime', cellsalign: 'center', align: 'center' },
        { text: 'End Location', datafield: 'endLocation', cellsalign: 'center', align: 'center' }
      ];
    }
  }
  ngOnInit() {
    if(this.platform.is("desktop")){
      this.window = true;
    }
  }

}
