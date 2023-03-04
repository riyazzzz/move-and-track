import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sensorise-list',
  templateUrl: './sensorise-list.component.html',
  styleUrls: ['./sensorise-list.component.scss'],
})
export class SensoriseListComponent implements OnInit {
  @Input()value;
  completeddatas;
  constructor(private modalController: ModalController,) { }
  async closeModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    this.completeddatas =this.value
  }

}
