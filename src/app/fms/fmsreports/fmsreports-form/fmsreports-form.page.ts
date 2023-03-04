import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName, FormGroup } from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { AjaxService } from '../../../services/ajax.service';
@Component({
  selector: 'app-fmsreports-form',
  templateUrl: './fmsreports-form.page.html',
  styleUrls: ['./fmsreports-form.page.scss'],
})
export class FmsreportsFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
