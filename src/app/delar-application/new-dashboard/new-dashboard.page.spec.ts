import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewDashboardPage } from './new-dashboard.page';

describe('NewDashboardPage', () => {
  let component: NewDashboardPage;
  let fixture: ComponentFixture<NewDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
