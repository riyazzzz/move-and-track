import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-student-livetrack',
  templateUrl: './student-livetrack.page.html',
  styleUrls: ['./student-livetrack.page.scss'],
})
export class StudentLivetrackPage implements OnInit {

  constructor(
    private location: Location,
    public router: Router,
    private websocketService: WebsocketService,
  ) { }
  locationBack() {
    this.router.navigateByUrl('student-dashboard')
  }
connectWebsocket(){
 // this.websocketService.setProductService(this);
    if (!this.websocketService.isAlive('livetrack')) {
      this.websocketService.connectSocket(JSON.parse(localStorage.selectedVin), "livetrack");
    }
}
wsOnError() {
  setTimeout(() => {
    this.websocketService.connectSocket(JSON.parse(localStorage.selectedVin), "livetrack");
  }, 60000);

}

  ngOnInit() {
    this.connectWebsocket()
  }

}
