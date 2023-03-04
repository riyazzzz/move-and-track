import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDelarPage } from './add-delar.page';

describe('AddDelarPage', () => {
  let component: AddDelarPage;
  let fixture: ComponentFixture<AddDelarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDelarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDelarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
