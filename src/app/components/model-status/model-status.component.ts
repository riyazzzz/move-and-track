import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-model-status',
  templateUrl: './model-status.component.html',
  styleUrls: ['./model-status.component.scss'],
})
export class ModelStatusComponent implements OnInit {
  @Input() paint;
  @Input() model;
  @Input() status;
  @Input() color;
  constructor() { }

  ngOnInit() {}

}
