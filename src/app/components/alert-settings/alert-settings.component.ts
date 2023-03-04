import { Component, OnInit, Input } from '@angular/core';
import { AjaxService } from 'src/app/services/ajax.service';
import { ActivatedRoute } from '@angular/router';
import { app, serverUrl, storageVariable } from 'src/environments/environment';
import { CommonService } from 'src/app/services/common.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-alert-settings',
  templateUrl: './alert-settings.component.html',
  styleUrls: ['./alert-settings.component.scss'],
})
export class AlertSettingsComponent implements OnInit {
  paraMap: string;
  @Input() paraVin;
  @Input() vin;
  alerts = ['overspeed', 'wokeup', 'stop', 'idel', 'engine status', 'power cut', 'movement']
  alertType = {
    'overspeed': 'M112.58 98.63l26.19 0c0.35,0 0.65,-0.28 0.66,-0.63l0.09 -3.07 -0.01 -2.44 -0.37 -5.75c-0.52,-5.42 -1.6,-10.29 -3.26,-15.39 -0.1,-0.34 -0.46,-0.53 -0.8,-0.43l-21.42 6.1c-0.75,0.21 -0.39,1.15 -0.28,1.71 0.59,3.24 0.76,6.85 0.62,10.17l-0.08 1.67c-0.28,2.83 -0.6,5.31 -1.34,8.06zm-106.86 -22.44c0,-38.92 31.55,-70.47 70.47,-70.47 38.92,0 70.47,31.55 70.47,70.47 0,38.92 -31.55,70.47 -70.47,70.47 -38.92,0 -70.47,-31.55 -70.47,-70.47zm146.67 0c0,-42.08 -34.12,-76.2 -76.2,-76.2 -42.08,0 -76.2,34.12 -76.2,76.2 0,42.08 34.12,76.2 76.2,76.2 42.08,0 76.2,-34.12 76.2,-76.2zm-132.92 -1.65l-4.44 -1.18c-0.36,-0.1 -0.74,0.13 -0.81,0.5 -1.14,5.63 -1.6,10.92 -1.25,16.66l0.91 7.57c0.06,0.32 0.33,0.54 0.65,0.54l1.77 0c0.67,0 0.66,-0.61 0.64,-1l0 -7.07c0.13,-2.94 0.74,-6.53 1.36,-9.44l1.63 -5.73c0.12,-0.36 -0.09,-0.75 -0.46,-0.85zm19.49 -26.19l-5.73 -6.71c-0.55,-0.64 -1.16,0.15 -1.61,0.59 -2.24,2.17 -5.25,5.58 -7,8.12 -3.87,5.46 -6.48,10.53 -8.61,16.87 -0.11,0.33 0.06,0.69 0.39,0.82l5.03 1.93c0.75,0.28 0.99,-0.7 1.37,-1.46 2.41,-4.82 5.09,-8.6 8.69,-12.6 1.62,-1.8 3.93,-3.92 5.83,-5.42l1.53 -1.19c0.3,-0.23 0.35,-0.66 0.11,-0.95zm29.68 -9.36l-0.86 -13.01c-0.05,-0.8 -0.89,-0.6 -1.32,-0.54 -4.67,0.6 -8.2,1.45 -12.69,2.98 -4.8,1.64 -9.94,4.33 -14.09,7.19l-1.95 1.39c-0.28,0.21 -0.35,0.61 -0.15,0.9l5.4 7.94c0.45,0.66 1.18,0.01 1.88,-0.36 5.51,-2.88 10.44,-4.56 16.59,-5.4l6.54 -0.39c0.38,-0.01 0.67,-0.33 0.65,-0.7zm8.28 1.64l7.25 -14.84c-3.59,-0.56 -6.12,-0.78 -9.74,-0.82 -0.36,-0.01 -0.65,0.27 -0.67,0.62l-0.66 13.81c-0.03,0.68 0.65,0.7 1.07,0.75l2.75 0.48zm2.04 49.37l16.72 -72.59c0.45,-1.95 -2.27,-2.92 -3.16,-1.11l-32.71 66.91c-2.48,5.08 -0.38,11.2 4.69,13.68 5.86,2.86 12.94,-0.41 14.46,-6.89zm-9.59 -7.57c2.77,0 5.01,2.24 5.01,5.01 0,2.77 -2.24,5.01 -5.01,5.01 -2.77,0 -5.01,-2.24 -5.01,-5.01 0,-2.77 2.24,-5.01 5.01,-5.01zm27.27 -33.35l9.47 -14.43c0.46,-0.7 -0.47,-1.07 -1.01,-1.38 -2.81,-1.6 -5.65,-2.97 -8.7,-4.14l-4.08 17.74 1.35 0.89 2.03 1.49c0.3,0.22 0.73,0.15 0.94,-0.17zm16.13 23.93l19.93 -8.01c0.74,-0.29 0.28,-1.04 0.1,-1.42 -2.66,-5.62 -5.59,-10.27 -9.58,-15.09 -3.33,-4.02 -6.91,-7.38 -11.03,-10.54 -0.28,-0.21 -0.68,-0.16 -0.9,0.11l-11.5 13.91c-0.49,0.6 0.29,1.09 0.77,1.61 4.07,4.3 6.64,7.99 9.15,13.33l2.19 5.7c0.12,0.36 0.52,0.54 0.87,0.4z',
    'wokeup': 'M5.72 76.19c0,-38.92 31.55,-70.47 70.47,-70.47 38.92,0 70.47,31.55 70.47,70.47 0,38.92 -31.55,70.47 -70.47,70.47 -38.92,0 -70.47,-31.55 -70.47,-70.47zm88.23 -4.43c0.87,0 1.66,0.51 2.02,1.29 0.36,0.8 0.23,1.72 -0.34,2.38l-28.87 33.31c-0.43,0.5 -1.05,0.76 -1.68,0.76 -0.33,0 -0.68,-0.07 -1,-0.24 -0.91,-0.46 -1.39,-1.48 -1.16,-2.47l6.03 -26.15 -10.53 0c-0.87,0 -1.66,-0.51 -2.02,-1.3 -0.36,-0.79 -0.23,-1.72 0.34,-2.37l28.87 -33.31c0.67,-0.77 1.78,-0.99 2.69,-0.53 0.91,0.46 1.38,1.49 1.15,2.48l-6.03 26.15 10.53 0zm-17.76 -44.41c1.22,0 2.22,-1 2.22,-2.22l0 -13.33c0,-1.22 -1,-2.22 -2.22,-2.22 -1.23,0 -2.22,1 -2.22,2.22l0 13.33c0,1.22 0.99,2.22 2.22,2.22zm2.22 113.24l0 -13.32c0,-1.23 -1,-2.22 -2.22,-2.22 -1.23,0 -2.22,0.99 -2.22,2.22l0 13.32c0,1.23 0.99,2.22 2.22,2.22 1.22,0 2.22,-0.99 2.22,-2.22zm35.46 -29.85c-0.87,-0.87 -2.27,-0.87 -3.14,0 -0.87,0.87 -0.87,2.27 0,3.14l9.42 9.42c0.43,0.43 1,0.65 1.57,0.65 0.57,0 1.14,-0.22 1.57,-0.65 0.87,-0.87 0.87,-2.27 0,-3.14l-9.42 -9.42zm-72.23 -69.09c0.87,-0.87 0.87,-2.27 0,-3.14l-9.42 -9.42c-0.87,-0.87 -2.27,-0.87 -3.14,0 -0.87,0.87 -0.87,2.28 0,3.14l9.42 9.42c0.44,0.44 1.01,0.65 1.58,0.65 0.56,0 1.13,-0.21 1.56,-0.65zm72.23 0l9.42 -9.42c0.87,-0.86 0.87,-2.27 0,-3.14 -0.87,-0.87 -2.27,-0.87 -3.14,0l-9.42 9.42c-0.87,0.87 -0.87,2.27 0,3.14 0.44,0.44 1,0.65 1.57,0.65 0.57,0 1.14,-0.21 1.57,-0.65zm13.39 36.77l13.32 0c1.23,0 2.22,-1 2.22,-2.22 0,-1.23 -0.99,-2.22 -2.22,-2.22l-13.32 0c-1.23,0 -2.22,0.99 -2.22,2.22 0,1.22 0.99,2.22 2.22,2.22zm-85.62 32.32c-0.86,-0.87 -2.27,-0.87 -3.14,0l-9.42 9.42c-0.87,0.87 -0.87,2.27 0,3.14 0.44,0.43 1.01,0.65 1.57,0.65 0.57,0 1.14,-0.22 1.57,-0.65l9.42 -9.42c0.87,-0.87 0.87,-2.27 0,-3.14zm-14.31 -34.54c0,-1.23 -0.99,-2.22 -2.22,-2.22l-13.32 0c-1.22,0 -2.22,0.99 -2.22,2.22 0,1.22 1,2.22 2.22,2.22l13.32 0c1.23,0 2.22,-1 2.22,-2.22zm61.76 0l-8.46 0c-0.68,0 -1.32,-0.31 -1.74,-0.84 -0.42,-0.53 -0.58,-1.22 -0.43,-1.88l4.66 -20.17 -19.83 22.89 8.46 0c0.67,0 1.31,0.31 1.73,0.84 0.43,0.52 0.58,1.21 0.43,1.88l-4.65 20.16 19.83 -22.88zm-12.9 44.41c24.48,0 44.41,-19.93 44.41,-44.41 0,-24.49 -19.93,-44.41 -44.41,-44.41 -24.49,0 -44.41,19.92 -44.41,44.41 0,24.48 19.92,44.41 44.41,44.41zm76.2 -44.42c0,-42.08 -34.12,-76.2 -76.2,-76.2 -42.08,0 -76.2,34.12 -76.2,76.2 0,42.08 34.12,76.2 76.2,76.2 42.08,0 76.2,-34.12 76.2,-76.2z',
    'stop': 'M5.72 76.19c0,-38.92 31.55,-70.47 70.47,-70.47 38.92,0 70.47,31.55 70.47,70.47 0,38.92 -31.55,70.47 -70.47,70.47 -38.92,0 -70.47,-31.55 -70.47,-70.47zm75.59 60.85c32.68,0 35.6,-25.24 35.6,-32.77 0,-7.53 0,-63.19 0,-63.19 0,-3.88 -3.14,-7.02 -7.02,-7.02 -3.88,0 -7.02,3.14 -7.02,7.02l0 30.43c0,1.29 -1.05,2.34 -2.34,2.34 -1.29,0 -2.34,-1.05 -2.34,-2.34l0 -44.47c0,-3.88 -3.14,-7.02 -7.02,-7.02 -3.88,0 -7.02,3.14 -7.02,7.02l0 39.79c0,1.29 -1.05,2.34 -2.34,2.34 -1.3,0 -2.34,-1.05 -2.34,-2.34l0 -44.47c0,-3.88 -3.15,-7.02 -7.03,-7.02 -3.87,0 -7.02,3.14 -7.02,7.02l0 44.47c0,1.29 -1.04,2.34 -2.34,2.34 -1.29,0 -2.34,-1.05 -2.34,-2.34l0 -35.11c0,-3.88 -3.14,-7.02 -7.02,-7.02 -3.87,0 -7.02,3.14 -7.02,7.02l0 58.51 -9.48 -12.97c-2.81,-4.33 -8.29,-5.78 -12.3,-3.3 -4.01,2.54 -5,8.07 -2.23,12.39 0,0 15.29,23.13 21.81,33.04 6.51,9.9 17.07,17.65 36.81,17.65zm71.08 -60.85c0,-42.08 -34.12,-76.2 -76.2,-76.2 -42.08,0 -76.2,34.12 -76.2,76.2 0,42.08 34.12,76.2 76.2,76.2 42.08,0 76.2,-34.12 76.2,-76.2z',
    'idel': 'M104.79 50.57l8.6 -10.25c7.06,6.98 12.17,15.93 14.44,25.94l-12.69 2.24 1.25 7.12 12.55 -2.21c0.13,1.5 0.2,3.02 0.2,4.56 0,8.68 -2.1,16.87 -5.82,24.11l-10.52 -6.07 -3.61 6.25 8.18 4.73 11.19 0c4.88,-8.78 7.48,-18.7 7.48,-29.02 0,-15.99 -6.23,-31.02 -17.53,-42.33 -11.31,-11.3 -26.34,-17.53 -42.32,-17.53 -15.99,0 -31.02,6.23 -42.33,17.53 -11.3,11.31 -17.53,26.34 -17.53,42.33 0,10.32 2.6,20.24 7.49,29.02l11.18 0 8.18 -4.73 -3.61 -6.25 -10.52 6.07c-3.72,-7.24 -5.82,-15.43 -5.82,-24.11 0,-1.54 0.07,-3.06 0.2,-4.56l12.55 2.21 1.25 -7.12 -12.69 -2.24c2.27,-10.01 7.38,-18.96 14.44,-25.94l8.6 10.25 5.54 -4.64 -8.67 -10.33c7.95,-5.97 17.62,-9.75 28.12,-10.46l0 13.71 7.23 0 0 -13.71c10.5,0.71 20.17,4.5 28.12,10.46l-8.67 10.33 5.54 4.64zm-99.07 25.62c0,-38.92 31.55,-70.47 70.47,-70.47 38.92,0 70.47,31.55 70.47,70.47 0,38.92 -31.55,70.47 -70.47,70.47 -38.92,0 -70.47,-31.55 -70.47,-70.47zm146.67 0c0,-42.08 -34.12,-76.2 -76.2,-76.2 -42.08,0 -76.2,34.12 -76.2,76.2 0,42.08 34.12,76.2 76.2,76.2 42.08,0 76.2,-34.12 76.2,-76.2zm-69.05 1.42c0.72,-2.6 -0.82,-5.3 -3.42,-6.02 -2.6,-0.71 -5.29,0.82 -6.01,3.42l-21.6 17.01 25.31 -10.92c2.51,0.53 5.03,-0.99 5.72,-3.49z',
    'engine status': 'M128.81 65.34l11.03 0 0 24.83 11.04 0 0 -16.55 11.04 0 2.76 8.28 0 33.12 -2.76 8.27 -11.04 0 0 -16.56 -11.04 0 0 24.84 -11.03 0 -22.08 0 0 11.05 -38.62 0 0 -11.05 -8.29 0 -16.55 -11.04 -16.57 0 0 -11.03 -11.02 0 0 22.07 -11.04 0 0 -68.98 11.04 0 0 24.83 11.02 0 0 -11.05 13.81 0c0,-1.51 1.24,-2.75 2.76,-2.75 0.96,0 1.8,0.48 2.3,1.23l14.25 -9.51 0 -16.55 22.08 0 0 -11.04 -38.63 0 0 -11.05 88.3 0 0 11.05 -38.62 0 0 11.04 22.06 0 0 13.8c1.53,0 2.77,1.23 2.77,2.75l11.03 0zm-20.29 16.03c-2.47,-4.22 -5.81,-7.56 -10.03,-10.03 -4.22,-2.47 -8.84,-3.7 -13.83,-3.7 -5.01,0 -9.62,1.23 -13.85,3.7 -4.22,2.45 -7.56,5.81 -10.02,10.03 -2.47,4.22 -3.69,8.84 -3.69,13.83 0,5.01 1.22,9.61 3.69,13.83 2.46,4.22 5.8,7.58 10.02,10.04 4.23,2.46 8.84,3.69 13.85,3.69 4.99,0 9.61,-1.23 13.83,-3.69 4.22,-2.46 7.56,-5.82 10.03,-10.04 2.47,-4.22 3.7,-8.82 3.7,-13.83 0,-4.99 -1.23,-9.61 -3.7,-13.83zm-10.87 20.33c0.45,0.45 0.68,0.99 0.68,1.61 0,0.64 -0.23,1.19 -0.68,1.66l-3.24 3.22c-0.45,0.46 -1,0.68 -1.64,0.68 -0.62,0 -1.16,-0.22 -1.62,-0.68l-6.49 -6.49 -6.5 6.49c-0.45,0.46 -0.99,0.68 -1.61,0.68 -0.66,0 -1.21,-0.22 -1.66,-0.68l-3.22 -3.22c-0.46,-0.47 -0.68,-1.02 -0.68,-1.66 0,-0.62 0.22,-1.16 0.68,-1.61l6.49 -6.5 -6.49 -6.49c-0.46,-0.46 -0.68,-1 -0.68,-1.62 0,-0.64 0.22,-1.19 0.68,-1.64l3.22 -3.24c0.45,-0.45 1,-0.68 1.66,-0.68 0.62,0 1.16,0.23 1.61,0.68l6.5 6.5 6.49 -6.5c0.46,-0.45 1,-0.68 1.62,-0.68 0.64,0 1.19,0.23 1.64,0.68l3.24 3.24c0.45,0.45 0.68,1 0.68,1.64 0,0.62 -0.23,1.16 -0.68,1.62l-6.5 6.49 6.5 6.5z',
    'power cut': 'M201.77 178.4c-17.9,-17.79 -26.98,-38.84 -26.98,-62.58l0 -34.54c0.17,-26.34 -17.54,-43.81 -32.76,-50.76 -4.29,-1.96 -8.81,-3.41 -13.42,-4.53l0 -2.35c0,-10.58 -8.61,-19.2 -19.2,-19.2 -10.59,0 -19.2,8.62 -19.2,19.2l0 2.71c-4.15,1.09 -8.22,2.42 -12.09,4.2 -16.82,7.75 -33.85,26.44 -34.01,50.71l0 34.56c0,24.54 -8.66,45.59 -25.75,62.57 -1.02,1.02 -1.39,2.51 -0.96,3.88 0.43,1.37 1.6,2.39 3.01,2.64l36.46 6.29c6.87,1.19 13.12,2.14 18.99,2.91 6.7,13.14 19.86,21.58 34.25,21.58 14.39,0 27.56,-8.45 34.26,-21.59 5.84,-0.78 12.05,-1.72 18.89,-2.9l36.45 -6.3c1.42,-0.24 2.57,-1.26 3.01,-2.63 0.43,-1.37 0.06,-2.86 -0.95,-3.87zm-47.14 -32.56l-82.4 -82.41c-1.86,-1.86 -4.87,-1.86 -6.74,0 -1.86,1.87 -1.86,4.88 0,6.74l82.41 82.4c0.93,0.93 2.15,1.44 3.36,1.44 1.22,0 2.44,-0.51 3.37,-1.44 1.86,-1.86 1.86,-4.87 0,-6.73zm-23.14 -29.02c0.43,0.5 1.07,0.86 1.72,0.71 0.64,0 1.29,-0.28 1.72,-0.71l11.53 -11.9c0.65,-0.72 0.86,-1.65 0.5,-2.58 -0.35,-0.86 -1.21,-1.43 -2.22,-1.43l-17.27 0 20 -34.68c0.43,-0.72 0.43,-1.51 0,-2.22 -0.43,-0.72 -1.22,-1.08 -2.08,-1.08l-45 0c-1.07,0 -2.01,0.5 -2.29,1.51l-3.66 12.18c-0.21,0.86 0,1.72 0.58,2.29l36.47 37.91zm-41.85 -16.13c-0.57,-0.57 -1.43,-0.78 -2.22,-0.64 -0.79,0.14 -1.43,0.72 -1.72,1.5l-7.31 20c-0.28,0.71 -0.07,1.57 0.36,2.22 0.43,0.64 1.36,1.14 2.08,1.14l0 0 0 0.43 21.06 0 -9.74 29.88c-0.36,1.08 0.07,2.08 1.07,2.65 0.36,0.22 0.79,0.22 1.22,0.22 0.65,0 1.29,-0.29 1.79,-0.79l22.43 -24.58c0.86,-0.93 0.86,-2.43 -0.07,-3.29l-28.95 -28.74zm8.24 -77.05c0,-6.35 5.17,-11.52 11.53,-11.52 6.35,0 11.52,5.17 11.52,11.52l0 0.75c-7.66,-1.09 -15.46,-1.03 -23.05,0.19l0 -0.94zm36.9 171.6c-5.84,7.92 -14.93,12.76 -24.67,12.76 -9.73,0 -18.83,-4.83 -24.66,-12.75l0 0c1.52,0.16 3,0.28 4.47,0.41 0.71,0.06 1.43,0.13 2.12,0.19 0.54,0.04 1.06,0.07 1.59,0.11 11.16,0.81 21.44,0.81 32.6,0.02 0.64,-0.05 1.26,-0.08 1.91,-0.13 0.84,-0.07 1.71,-0.16 2.56,-0.23 1.3,-0.11 2.59,-0.22 3.93,-0.36 0.05,-0.01 0.1,-0.01 0.15,-0.02z',
    'movement': 'M97.81 40.15l-59.24 0c-2.85,0 -5.17,2.31 -5.17,5.18l0 0.81 -21 2.42 37.21 4.84 -37.7 3.75 37.56 5.34 -37.56 3.26 21.49 4.05 0 10.17 107.06 0 0 -3.78c0,-1.85 -0.74,-3.61 -2.03,-4.9l-20.34 -20.11c-1.29,-1.28 -3.03,-2.01 -4.85,-2.01l-10.26 0 0 -3.84c0,-2.87 -2.31,-5.18 -5.17,-5.18zm-92.09 36.04c0,-38.92 31.55,-70.47 70.47,-70.47 38.92,0 70.47,31.55 70.47,70.47 0,38.92 -31.55,70.47 -70.47,70.47 -38.92,0 -70.47,-31.55 -70.47,-70.47zm146.67 0c0,-42.08 -34.12,-76.2 -76.2,-76.2 -42.08,0 -76.2,34.12 -76.2,76.2 0,42.08 34.12,76.2 76.2,76.2 42.08,0 76.2,-34.12 76.2,-76.2zm-31.32 25.32c0,2.95 -2.41,5.37 -5.36,5.37 -2.97,0 -5.36,-2.42 -5.36,-5.37 0,-2.97 2.39,-5.36 5.36,-5.36 2.95,0 5.36,2.39 5.36,5.36zm-16.11 0c0,5.92 4.82,10.73 10.75,10.73 5.92,0 10.73,-4.81 10.73,-10.73 0,-5.93 -4.81,-10.75 -10.73,-10.75 -5.93,0 -10.75,4.82 -10.75,10.75zm-45.41 10.73c5.93,0 10.72,-4.81 10.72,-10.73 0,-5.93 -4.79,-10.75 -10.72,-10.75 -5.94,0 -10.73,4.82 -10.73,10.75 0,5.92 4.79,10.73 10.73,10.73zm5.36 -10.73c0,2.95 -2.4,5.37 -5.36,5.37 -2.97,0 -5.37,-2.42 -5.37,-5.37 0,-2.97 2.4,-5.36 5.37,-5.36 2.96,0 5.36,2.39 5.36,5.36zm75.56 -18.68l-107.07 0 0 11.45c0,2.86 2.32,5.18 5.17,5.18l6.94 0c1,-6.87 6.92,-12.15 14.04,-12.15 7.12,0 13.04,5.28 14.04,12.15l28.07 0c1,-6.87 6.91,-12.15 14.04,-12.15 7.14,0 13.06,5.28 14.06,12.15l5.53 0c2.86,0 5.18,-2.32 5.18,-5.18l0 -11.45zm-10.91 -10.87l-19.68 0c-0.45,0 -0.81,-0.36 -0.81,-0.81l0 -15.2c0,-0.45 0.36,-0.81 0.81,-0.81l3.74 0c0.21,0 0.42,0.09 0.57,0.23l15.92 15.19c0.54,0.5 0.18,1.4 -0.55,1.4z'
  }
  alertData = {
    overspeedKm: '1',
    overspeedInterval: '1',
    stopInterval: '1',
    idelInterval: '1',
    noOptimeInterval: '1'
  }
  color = {
    'Idle': '#1f5baa',
    'Running': '#1eb15d',
    'Stop': '#FF0000',
    'Yet_to_transmit': '#7d410f',
    'No Transmission': '#000000',
    'Online': '#00E1BC',
    'Overspeed': '#f28918',
    'DoorOpen': '#FF851B',
    'HighTemp': '#FF0000',
    "PowerFail": '#412525',
    'Geofence': '#1f5baa',
    'Good': '#1eb15d'
  }
  alertMenu = {
    overspeed: false,
    stop: false,
    idle: false,
    nooptime: false,
    arrowup: true,
    arrowdown: false,
    overspeedarrowdown: false,
    overspeedarrowup: true,
    stoparrowdown: false,
    stoparrowup: true,
    idlearrowdown: false,
    idlearrowup: true,
    nooptimearrowup: true,
    nooptimearrowdown: false
  }

  alertConfig = {
    exceedlimit: false,
    intervalmin: false,
    stoplimit: false,
    stopminvalue: false,
    idleminvalue: false,
    idlelimitvalue: false,
    nooptimeminvalue: false
  }
  public overspeedToogle: boolean = false;
  public Wokeup: boolean = false;
  public stop: boolean = false;
  public idle: boolean = false;
  public engineStatus: boolean = false;
  public movement: boolean = false;
  public sos: boolean = false;
  public powercut: boolean = false;
  public noOptime: boolean = false;
  public noTransmission: boolean = false;
  public acstatus: boolean = false;
  towed: boolean = false;
  eventAlert: boolean = false;
  doorOpen = false
  eventAlert1: boolean = false;
  entryPoint: any;
  temp1: boolean = false;
  temp2: boolean = false;
  temp3: boolean = false;
  temp4: boolean = false;
  companyAlertShow: string[];
  profile: any;



  constructor(
    private activatedRoute: ActivatedRoute,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private alertController: AlertController,
  ) {
    this.entryPoint = app.entryPoint
  }

  toggleModal(type, value) {
    this.alertConfig[type.toLowerCase()] = value
  }
  menuToggle(type, val, arrow, value, arrowUp, values) {
    this.alertMenu[type.toLowerCase()] = val
    this.alertMenu[arrow.toLowerCase()] = value
    this.alertMenu[arrowUp.toLowerCase()] = values
  }

  submit(type, dataObj) {
    //console.log(dataObj)
  }

  async toggleChange(status, type, dataObj) {
    let text = this.paraMap == 'All' ? "This changes affect the whole vehicle belong to this company!" : "This changes affect this " + JSON.parse(localStorage.selectedVin).plateNo + " vehicle";
   
   
  

    let input: any = status != true ? [] : [{
      name: 'email notification',
      type: 'checkbox',
      label: 'Email notification',
      value: 'emailEnable',
      checked: false,
      disabled: !status
    }];
    if(this.paraMap != 'All' && type == 'SOS' && status ){
      input = []
      input.push({
        label: 'Phone number', 
        name: 'Phone number',
        placeholder: 'Enter Phone number to get SMS',
        type: 'text', //This generate the password
      })
    }
    const alert = await this.alertController.create({
      header: 'Warning',
      backdropDismiss: false,
      inputs: input,
      message: text,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          if (type == "OVERSPEED") {
            this.overspeedToogle = !status;
          } else if (type == "ENGINESTATUS") {
            this.engineStatus = !status
          } else if (type == "ACSTATUS") {
            this.acstatus = !status
          } else if (type == "IDLE") {
            this.idle = !status;
          } else if (type == "POWERCUT") {
            this.powercut = !status;
          } else if (type == "WOKEUP") {
            this.Wokeup = !status;
          } else if (type == "STOP") {
            this.stop = !status;
          } else if (type == "MOVEMENT") {
            this.movement = !status;
          } else if (type == "NOTRANSMISSION") {
            this.noTransmission = !status;
          } else if (type == "NOOPTIME") {
            this.noOptime = !status;
          } else if (type == "TOWED") {
            this.towed = !status;
          } else if (type == "EVENTALERT") {
            this.eventAlert = !status;
          } else if (type == "EVENTALERT1") {
            this.eventAlert1 = !status;
          } else if (type == "DOOROPEN") {
            this.doorOpen = !status;
          } else if (type == "TEMPERATURESENSOR1") {
            this.temp1 = !status;
          } else if (type == "TEMPERATURESENSOR2") {
            this.temp2 = !status;
          } else if (type == "TEMPERATURESENSOR3") {
            this.temp3 = !status;
          } else if (type == "TEMPERATURESENSOR4") {
            this.temp4 = !status;
          }else if (type == "SOS") {
            this.sos = !status;
          }
        }
      },
      {
        text: 'Confirm',
        handler: confirm => {
          status = status != true ? 0 : 1;
          let data = {
            "validity": "2",
            "time": "0:00_23:59",
            "companyId": localStorage.corpId,
            "branchId": localStorage.corpId,
            "userId": localStorage.userName,
            "status": status.toString(),
            "alerttype": type,
            "push": "1",
            "interval": parseInt(dataObj.interval) + '#Minutes',
            "range": dataObj.speed.toString(),
            "throughSMS": "0",
            "throughSMS1": "0",
            "throughEmail": "0",
            "throughEmail1": "0",
            "days": "Sun#Mon#Tue#Wed#Thu#Fri#Sat",
          }
          if (confirm) {
            if (confirm[0] == "emailEnable") {
              if (this.profile.fax != "") {
                data['throughEmail'] = "1";
                data['email'] = this.profile.fax;
              } else {
                this.commonService.presentToast("Email Id not known add your email in your profile")
              }
            }else if(Object.keys(confirm)[0] == 'Phone number'){
              data['mobile'] = confirm['Phone number'];
              data['throughSMS'] = '1'
            }
          }
          if (this.paraMap == 'All') {
            let vinBelongCorp: any = Object.values(storageVariable.upDatedJsonData.liveDatas);
            let vin = [];
            for (let i = 0; i < vinBelongCorp.length; i++) {
              vin.push({ "vin": vinBelongCorp[i].vin, "plateNo": vinBelongCorp[i].plateNo });
            }
            data["vehicleDatas"] = vin;
          } else {
            data["vehicleDatas"] = [{ "vin": JSON.parse(localStorage.selectedVin).vin, "plateNo": JSON.parse(localStorage.selectedVin).plateNo }]
          }
          const url = serverUrl.web + '/alert/automate/alertconfig';
          this.ajaxService.ajaxPostWithBody(url, JSON.stringify(data))
            .subscribe(res => {
              //console.log(res);
              // for (let i = 0; i < Object.keys(res).length; i++) { 
              const url2 = serverUrl.Admin + '/api/alerts/config';
              var body;
              if(this.paraMap == "All"){
              body = { "vin": "", "method": "alertconfigCompanyCache","companyId": localStorage.corpId,"userId":localStorage.userName}
              }else{
                body = { "vin": JSON.parse(localStorage.selectedVin).vin, "method": "alertconfigCache" }
              }
             
              this.ajaxService.ajaxPostWithString(url2, body)
                .subscribe(res => {
                  if (res == 'Done') {
                    this.commonService.presentToast('Settings changed successfully')
                  }
                })

              // }
            });
        }
      }]
    });

    await alert.present();


  }

  alertForCompany() {
    let url = serverUrl.web + '/device/bikeappalerts?vin=All' + '&compId=' + localStorage.corpId + '&userId=' + localStorage.userName;;
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        //console.log(res);
        let overspeedKm = [];
        let overspeedInterval = [];
        let overspeedStatus = [];
        let stopInterval = [];
        let stopStatus = [];
        let optimeInterval = [];
        let optimeStatus = [];
        let idleInterval = [];
        let idleStatus = [];
        let noTransmissionStatus = [];
        let engineStatus = [];
        let acStatus = [];
        let powercutStatus = [];
        let wokeupStatus = [];
        let movementStatus = [];
        let towedStatus = []
        let eventAlertStatus = [];
        let event1AlertStatus = []
        let temp1Status = [];
        let temp2Status = [];
        let temp3Status = [];
        let temp4Status = [];
        let doorOpen = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].alertType.toUpperCase() == "OVERSPEED") {
            overspeedStatus.push(res[i].status)
            overspeedKm.push(res[i].alertRange);
            if (res[i].refInterval)
              overspeedInterval.push(res[i].refInterval)
          } else if (res[i].alertType.toUpperCase() == "ENGINESTATUS") {
            engineStatus.push(res[i].status)
          } else if (res[i].alertType.toUpperCase() == "ACSTATUS") {
            acStatus.push(res[i].status)
          } else if (res[i].alertType.toUpperCase() == "IDLE") {
            idleStatus.push(res[i].status)
            if (res[i].refInterval)
              idleInterval.push(res[i].refInterval)
          } else if (res[i].alertType.toUpperCase() == "POWERCUT") {
            powercutStatus.push(res[i].status);
          } else if (res[i].alertType.toUpperCase() == "WOKEUP") {
            wokeupStatus.push(res[i].status)
          } else if (res[i].alertType.toUpperCase() == "STOP") {
            stopStatus.push(res[i].status);
            if (res[i].refInterval)
              stopInterval.push(res[i].refInterval)
          } else if (res[i].alertType.toUpperCase() == "MOVEMENT") {
            movementStatus.push(res[i].status);
          } else if (res[i].alertType.toUpperCase() == "NOTRANSMISSION") {
            noTransmissionStatus.push(res[i].status);
          } else if (res[i].alertType.toUpperCase() == "NOOPTIME") {
            optimeStatus.push(res[i].status);
            if (res[i].refInterval)
              optimeInterval.push(res[i].refInterval)
          } else if (res[i].alertType.toUpperCase() == "EVENTALERT") {
            eventAlertStatus.push(res[i].status);
          } else if (res[i].alertType.toUpperCase() == "EVENTALERT1") {
            event1AlertStatus.push(res[i].status);
          } else if (res[i].alertType.toUpperCase() == "DOOROPEN") {
            doorOpen.push(res[i].status);
          } else if (res[i].alertType.toUpperCase() == "TEMPERATURESENSOR1") {
            temp1Status.push(res[i].status);
          } else if (res[i].alertType.toUpperCase() == "TEMPERATURESENSOR2") {
            temp2Status.push(res[i].status);
          } else if (res[i].alertType.toUpperCase() == "TEMPERATURESENSOR3") {
            temp3Status.push(res[i].status);
          } else if (res[i].alertType.toUpperCase() == "TEMPERATURESENSOR4") {
            temp4Status.push(res[i].status);
          }
        }

        let counts = {};
        overspeedStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (overspeedStatus.length == counts[1]) {
          this.overspeedToogle = true;
        }

        counts = {};
        stopStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (stopStatus.length == counts[1]) {
          this.stop = true;
        }

        counts = {};
        acStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (acStatus.length == counts[1]) {
          this.acstatus = true;
        }

        counts = {};
        optimeStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (optimeStatus.length == counts[1]) {
          this.noOptime = true;
        }

        counts = {};
        idleStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (idleStatus.length == counts[1]) {
          this.idle = true;
        }

        counts = {};
        noTransmissionStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (noTransmissionStatus.length == counts[1]) {
          this.noTransmission = true;
        }

        counts = {};
        engineStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (engineStatus.length == counts[1]) {
          this.engineStatus = true;
        }

        counts = {};
        acStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (acStatus.length == counts[1]) {
          this.acstatus = true;
        }

        counts = {};
        doorOpen.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (doorOpen.length == counts[1]) {
          this.doorOpen = true;
        }

        counts = {};
        temp1Status.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (temp1Status.length == counts[1]) {
          this.temp1 = true;
        }

        counts = {};
        temp2Status.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (temp2Status.length == counts[1]) {
          this.temp2 = true;
        }

        counts = {};
        temp3Status.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (temp3Status.length == counts[1]) {
          this.temp3 = true;
        }

        counts = {};
        temp4Status.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (temp4Status.length == counts[1]) {
          this.temp4 = true;
        }

        counts = {};
        powercutStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (powercutStatus.length == counts[1]) {
          this.powercut = true;
        }

        counts = {};
        wokeupStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (wokeupStatus.length == counts[1]) {
          this.Wokeup = true;
        }

        counts = {};
        movementStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (movementStatus.length == counts[1]) {
          this.movement = true;
        }

        counts = {};
        wokeupStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (wokeupStatus.length == counts[1]) {
          this.Wokeup = true;
        }

        counts = {};
        towedStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (towedStatus.length == counts[1]) {
          this.towed = true;
        }

        counts = {};
        eventAlertStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (eventAlertStatus.length == counts[1]) {
          this.eventAlert = true;
        }

        counts = {};
        event1AlertStatus.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        if (event1AlertStatus.length == counts[1]) {
          this.eventAlert1 = true;
        }


        overspeedKm.sort((a, b) =>
          overspeedKm.filter(v => v === a).length
          - overspeedKm.filter(v => v === b).length
        ).pop();
        this.alertData.overspeedKm = overspeedKm[0]

        overspeedInterval.sort((a, b) =>
          overspeedInterval.filter(v => v === a).length
          - overspeedInterval.filter(v => v === b).length
        ).pop();
        this.alertData.overspeedInterval = (Math.round(parseInt(overspeedInterval[0]))).toString();

        idleInterval.sort((a, b) =>
          idleInterval.filter(v => v === a).length
          - idleInterval.filter(v => v === b).length
        ).pop();
        this.alertData.idelInterval = (Math.round(parseInt(idleInterval[0]))).toString();

         stopInterval.sort((a, b) =>
          stopInterval.filter(v => v === a).length
          - stopInterval.filter(v => v === b).length
        ).pop();
        this.alertData.stopInterval = (Math.round(parseInt(stopInterval[0]))).toString();

        optimeInterval.sort((a, b) =>
          optimeInterval.filter(v => v === a).length
          - optimeInterval.filter(v => v === b).length
        ).pop();
        this.alertData.noOptimeInterval = (Math.round(parseInt(optimeInterval[0]))).toString();

      })
  }

  alertForVehicle() {
    this.alertMenu = {
      overspeed: false,
      stop: false,
      idle: false,
      nooptime: false,
      arrowup: true,
      arrowdown: false,
      overspeedarrowdown: false,
      overspeedarrowup: true,
      stoparrowdown: false,
      stoparrowup: true,
      idlearrowdown: false,
      idlearrowup: true,
      nooptimearrowup: true,
      nooptimearrowdown: false
    }

    this.alertConfig = {
      exceedlimit: false,
      intervalmin: false,
      stoplimit: false,
      stopminvalue: false,
      idleminvalue: false,
      idlelimitvalue: false,
      nooptimeminvalue: false
    }
    this.overspeedToogle = false;
    this.Wokeup = false;
    this.stop = false;
    this.idle = false;
    this.engineStatus = false;
    this.movement = false;
    this.powercut = false;
    this.noOptime = false;
    this.noTransmission = false;
    this.towed = false;
    this.eventAlert = false;
    this.eventAlert1 = false;
    this.doorOpen = false;
    this.temp1 = false;
    this.temp2 = false;
    this.temp3 = false;
    this.temp4 = false;
    this.acstatus = false;

    let url = serverUrl.web + '/device/bikeappalerts?vin=' + JSON.parse(localStorage.selectedVin).vin + '&compId=' + localStorage.corpId + '&userId=' + localStorage.userName;
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        //console.log(res);
        for (let i = 0; i < res.length; i++) {
          if (res[i].alertType.toUpperCase() == "OVERSPEED") {
            if (res[i].status == 1)
              this.overspeedToogle = true;
            this.alertData.overspeedKm = (parseInt(res[i].alertRange)).toString();
            this.alertData.overspeedInterval = res[i].refInterval == undefined ? null : res[i].refInterval.toString();
          } else if (res[i].alertType.toUpperCase() == "ENGINESTATUS" && res[i].status == 1) {
            this.engineStatus = true;
          } else if (res[i].alertType.toUpperCase() == "IDLE" && res[i].status == 1) {
            this.idle = true;
            this.alertData.idelInterval = (Math.round(parseInt(res[i].refInterval))).toString();
          } else if (res[i].alertType.toUpperCase() == "ACSTATUS" && res[i].status == 1) {
            this.acstatus = true;
          } else if (res[i].alertType.toUpperCase() == "POWERCUT" && res[i].status == 1) {
            this.powercut = true;
          } else if (res[i].alertType.toUpperCase() == "WOKEUP" && res[i].status == 1) {
            this.Wokeup = true;
          } else if (res[i].alertType.toUpperCase() == "STOP") {
            if (res[i].status == 1)
              this.stop = true;
            this.alertData.stopInterval = (Math.round(parseInt(res[i].refInterval))).toString();
          } else if (res[i].alertType.toUpperCase() == "MOVEMENT" && res[i].status == 1) {
            this.movement = true
          } else if (res[i].alertType.toUpperCase() == "NOTRANSMISSION" && res[i].status == 1) {
            this.noTransmission = true;
          } else if (res[i].alertType.toUpperCase() == "NOOPTIME" && res[i].status == 1) {
            this.noOptime = true
            this.alertData.noOptimeInterval = (Math.round(parseInt(res[i].refInterval))).toString();
          } else if (res[i].alertType.toUpperCase() == "TOWED" && res[i].status == 1) {
            this.towed = true
          } else if (res[i].alertType.toUpperCase() == "EVENTALERT" && res[i].status == 1) {
            this.eventAlert = true
          } else if (res[i].alertType.toUpperCase() == "EVENTALERT1" && res[i].status == 1) {
            this.eventAlert1 = true
          } else if (res[i].alertType.toUpperCase() == "DOOROPEN" && res[i].status == 1) {
            this.doorOpen = true
          } else if (res[i].alertType.toUpperCase() == "TEMPERATURESENSOR1" && res[i].status == 1) {
            this.temp1 = true
          } else if (res[i].alertType.toUpperCase() == "TEMPERATURESENSOR2" && res[i].status == 1) {
            this.temp2 = true
          } else if (res[i].alertType.toUpperCase() == "TEMPERATURESENSOR3" && res[i].status == 1) {
            this.temp3 = true
          } else if (res[i].alertType.toUpperCase() == "TEMPERATURESENSOR4" && res[i].status == 1) {
            this.temp4 = true
          } else if (res[i].alertType.toUpperCase() == "SOS" && res[i].status == 1) {
            this.sos = true
          }
        }
      })
  }

  ngOnChanges() {

    this.paraMap = this.paraVin;
    if (this.paraMap == 'All') {
      this.alertForCompany();
    } else {
      this.alertForVehicle();
    }

  }
  ngOnInit() {
    
    this.companyAlertShow = JSON.parse(localStorage.getItem('mainMenu'));
    const url = serverUrl.web + '/user/getUserDetails'
    let jsonData = {
      "companyId": localStorage.getItem('corpId'),
      "userName": localStorage.getItem('userName')
    }
    this.ajaxService.ajaxPostMethod(url, jsonData).subscribe(res => {
      this.profile = res
    })
  }
}
