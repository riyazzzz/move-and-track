import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehicleCreationPage } from './vehicle-creation.page';

describe('VehicleCreationPage', () => {
  let component: VehicleCreationPage;
  let fixture: ComponentFixture<VehicleCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCreationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
