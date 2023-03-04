import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddImeiCompanyPage } from './add-imei-company.page';

describe('AddImeiCompanyPage', () => {
  let component: AddImeiCompanyPage;
  let fixture: ComponentFixture<AddImeiCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImeiCompanyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddImeiCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
