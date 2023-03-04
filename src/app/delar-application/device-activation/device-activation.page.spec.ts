import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeviceActivationPage } from './device-activation.page';

describe('DeviceActivationPage', () => {
  let component: DeviceActivationPage;
  let fixture: ComponentFixture<DeviceActivationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceActivationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceActivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
