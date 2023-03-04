import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-grid-view-drv',
  templateUrl: './grid-view-drv.component.html',
  styleUrls: ['./grid-view-drv.component.scss'],
})
export class GridViewDrvComponent implements OnInit {
  @Input() commonData;
  @Input() search;
  @Input() displayCount: number = 30;
  displayData: Array<any>;
  currentPage: number = 1;
  myPlatform: string;
  data: any;
  constructor(
    private platform: Platform
  ) { }
  doInfinite(event) {
    //console.log("event trigger")
    setTimeout(() => {
      //console.log(this.commonData)
      this.displayData.push(...this.commonData.slice(this.currentPage * this.displayCount, (this.currentPage + 1) * this.displayCount));
      this.currentPage++;
      event.target.complete();
      if (this.displayData.length == this.commonData.length) {
        event.target.disabled = true;
      }
      //console.log("DISPLAY DATA----------------------\n", this.displayData)
    }, 500);
  }

  setDisplayData() {
    if (this.commonData.length > this.displayCount) {
      this.displayData = this.commonData.slice(0, this.displayCount);
    }
    else {
      this.displayData = this.commonData;
    }
  }
  ngOnInit() { 
    this.setDisplayData(); 
    this.myPlatform = this.platform.platforms()[0];
    // this.datas = this.commonData;
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
  }
  ngOnChanges() {
    this.setDisplayData();
    // this.datas = this.commonData;
    }
}
