import { Component, OnInit } from '@angular/core';
import { storageVariable } from 'src/environments/environment';

@Component({
  selector: 'app-grid-sort',
  templateUrl: './grid-sort.component.html',
  styleUrls: ['./grid-sort.component.scss'],
})
export class GridSortComponent implements OnInit {
  sortIcon: string;
  watchFilter: boolean = false;
  batteryStatusFilter: boolean = false;
  gsmStatusFilter: boolean = false;
  transmissionFilter: boolean = false;
  gpsFilter: boolean = false;
  subscriptionFilter: boolean = false;
  filterValue: any;
  manualFilter: unknown[];
  toggleWatch = false;
  filter: any;

  constructor() { }

  watchToggle() {
    this.toggleWatch = !this.toggleWatch;
    this.filterPage(null);
  }

  filterPage(selected) {
    if (selected == "watchMode") {
      this.watchFilter = !this.watchFilter;
      this.batteryStatusFilter = false;
      this.gsmStatusFilter = false;
      this.transmissionFilter = false;
      this.gpsFilter = false;
      this.subscriptionFilter = false;
    } else if (selected == "battery") {
      this.watchFilter = false;
      this.batteryStatusFilter = !this.batteryStatusFilter;
      this.gsmStatusFilter = false;
      this.transmissionFilter = false;
      this.gpsFilter = false;
      this.subscriptionFilter = false;
    } else if (selected == "gsm") {
      this.watchFilter = false;
      this.batteryStatusFilter = false;
      this.gsmStatusFilter = !this.gsmStatusFilter;
      this.transmissionFilter = false;
      this.gpsFilter = false;
      this.subscriptionFilter = false;
    } else if (selected == "gps") {
      this.watchFilter = false;
      this.batteryStatusFilter = false;
      this.gsmStatusFilter = false;
      this.transmissionFilter = false;
      this.gpsFilter = !this.gpsFilter;
      this.subscriptionFilter = false;
    } else if (selected == "transmission") {
      this.watchFilter = false;
      this.batteryStatusFilter = false;
      this.gsmStatusFilter = false;
      this.transmissionFilter = !this.transmissionFilter;
      this.gpsFilter = false;
      this.subscriptionFilter = false;
    } else if (selected == "subscription") {
      this.watchFilter = false;
      this.batteryStatusFilter = false;
      this.gsmStatusFilter = false;
      this.transmissionFilter = false;
      this.gpsFilter = false;
      this.subscriptionFilter = !this.subscriptionFilter;
    }


    let filter: any = Object.values(storageVariable.upDatedJsonData.liveDatas);
    if (this.watchFilter == true || this.batteryStatusFilter == true || this.gsmStatusFilter == true || this.transmissionFilter == true || this.gpsFilter == true || this.subscriptionFilter == true) {
      if (!this.filter) {
        if (this.watchFilter == true) {
          if (this.toggleWatch == true) {
            filter.sort(function (filter: any) {
              if (filter.watchmode == "ON" || filter.watchmode == 1) {
                return -1;
              } else {
                return 1;
              }
            });
          } else {
            filter.sort(function (filter: any) {
              if (filter.watchmode == "OFF" || filter.watchmode == 0) {
                return 1;
              } else {
                return -1;
              }
            });
          }
        }

        if (this.batteryStatusFilter == true) {
          filter.sort(function (filterA: any) {
            if (filterA.powerSupplyVoltage == "ON") {
              return 1;
            }
          });

          filter.sort(function (filterA: any) {
            if (filterA.powerSupplyVoltage == "OFF") {
              return -1;
            }

          });

          filter.sort(function (filterA: any) {
            if (filterA.powerSupplyVoltage == null) {
              return -1;
            }
          });

        }

        if (this.gsmStatusFilter == true) {
          filter.sort(function (filterA: any, filterB: any) {
            return filterA.gsmSignalStrength - filterB.gsmSignalStrength;
          });
        }

        if (this.gpsFilter == true) {
          filter.sort(function (filterA: any, filterB: any) {
            return filterA.gps - filterB.gps;
          });
        }

        if (this.transmissionFilter == true) {
          filter.sort(function (filterA: any, filterB: any) {
            return new Date(filterA.timeStamp).getTime() - new Date(filterB.timeStamp).getTime();
          });
        }

        if (this.subscriptionFilter == true) {
          filter.sort(function (filterA: any, filterB: any) {
            return new Date(filterA.warrantyExpiryDate).getTime() - new Date(filterB.warrantyExpiryDate).getTime();
          });
        }
      } else {
        filter = JSON.parse(localStorage.modalFilterData);
        if (this.watchFilter == true) {
          if (this.toggleWatch == true) {
            filter.sort(function (filter: any) {
              if (filter.watchmode == "ON" || filter.watchmode == 1) {
                return -1;
              } else {
                return 1;
              }
            });
          } else {
            filter.sort(function (filter: any) {
              if (filter.watchmode == "ON" || filter.watchmode == 1) {
                return 1;
              } else {
                return -1;
              }
            });
          }
        }

        if (this.batteryStatusFilter == true) {
          filter.sort(function (filterA: any) {
            if (filterA.powerSupplyVoltage == "ON") {
              return 1;
            }
          });

          filter.sort(function (filterA: any) {
            if (filterA.powerSupplyVoltage == "OFF") {
              return -1;
            }

          });

          filter.sort(function (filterA: any) {
            if (filterA.powerSupplyVoltage == null) {
              return -1;
            }
          });

        }

        if (this.gsmStatusFilter == true) {
          filter.sort(function (filterA: any, filterB: any) {
            return filterA.gsmSignalStrength - filterB.gsmSignalStrength;
          });
        }

        if (this.gpsFilter == true) {
          filter.sort(function (filterA: any, filterB: any) {
            return filterA.gps - filterB.gps;
          });
        }

        if (this.transmissionFilter == true) {
          filter.sort(function (filterA: any, filterB: any) {
            return new Date(filterA.timeStamp).getTime() - new Date(filterB.timeStamp).getTime();
          });
        }

        if (this.subscriptionFilter == true) {
          filter.sort(function (filterA: any, filterB: any) {
            return new Date(filterA.warrantyExpiryDate).getTime() - new Date(filterB.warrantyExpiryDate).getTime();
          });
        }
        localStorage.setItem('modalFilterData', JSON.stringify(filter));

      }
    } else {
      filter = [];
      this.filterValue = localStorage.statusChanger;
    }
    this.manualFilter = filter;
  }

  ngOnInit() {
    if (localStorage.modalFilterData) {
      this.filter = JSON.parse(localStorage.modalFilterData);
    }
  }

}
