import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompanyVehiclePage } from './company-vehicle.page';

describe('CompanyVehiclePage', () => {
  let component: CompanyVehiclePage;
  let fixture: ComponentFixture<CompanyVehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyVehiclePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyVehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
