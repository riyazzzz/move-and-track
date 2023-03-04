import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendence-report',
  templateUrl: './attendence-report.page.html',
  styleUrls: ['./attendence-report.page.scss'],
})
export class AttendenceReportPage implements OnInit {

  dateForm: FormGroup;
  date: any = moment();
  currentDate: any = `${this.date.format('MMMM ')}${this.date.format('YYYY ')}`;
  daysArr;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  next: boolean = false;
  absent: any;
  present: any = [];


  dateFromMoment: moment.Moment;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    public router: Router,) {
  }

  initDateRange() {
    var today: any = new Date();
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();
    today = year + '-' + month;
    this.currentDate = today;
   
    this.dateForm = this.formBuilder.group({
      dateFrom: ["", Validators.required],
      presentFrom: ["", Validators.required],
      holidayFrom: ["", Validators.required],
    });
  }
  ngOnInit() {

    this.initDateRange();
    this.daysArr = this.createCalendar(this.date);
    this.submit();
  }


  submit() {
   
    const url = serverUrl.web + `/parentapp/attendance?stin=12345&period=${this.currentDate}`;
    this.ajaxService.ajaxGet(url).subscribe(res => {
      var data = res;
    
        this.next = false;
        this.date = moment(this.currentDate, 'YYYY MM');
        if (this.currentDate !== "") {
          
          if (this.currentDate == data.month) {
            //form data
            this.dateForm.patchValue({
              dateFrom: data.absent,
              presentFrom: data.present,
              holidayFrom: data.holiday,
            });
  
            this.daysArr = this.createCalendar(moment(this.currentDate, 'YYYY MM'))
          }
        
        }
        
      else{
        this.commonService.presentToast("Please try again later.");
      }
     
    })

  }

  locationBack() {
    this.router.navigateByUrl('student-overview')
  
  }

  
  createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  }

  nextMonth() {
    this.date.add(1, 'M');
    this.daysArr = this.createCalendar(this.date);
    this.next = true;
  }

  previousMonth() {
    this.date.subtract(1, 'M');
    this.daysArr = this.createCalendar(this.date);
    this.next = true;
  }


  isAbsent(day) {
    if (!day) {
      return false;
    }
    const absentArr = this.dateForm.value.dateFrom;
    const dayString = day ? day.format('YYYY-MM-DD') : '';
    if (this.dateForm.valid) {
      return absentArr.includes(dayString)
    }
    return false;
  }


  isPresent(day) {
    if (!day) {
      return false;
    }
    const presentArr = this.dateForm.value.presentFrom;
    const dayString = day ? day.format('YYYY-MM-DD') : '';
    if (this.dateForm.valid) {
      return presentArr.includes(dayString)
    }
    return false;
  }

  isHoliday(day) {
    if (!day) {
      return false;
    }
    const holidayArr = this.dateForm.value.holidayFrom;
    const dayString = day ? day.format('YYYY-MM-DD') : '';
    if (this.dateForm.valid) {
      return holidayArr.includes(dayString)
    }
    return false;
  }

}


