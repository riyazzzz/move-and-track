import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VtsUserDiagnosisComponent } from './vts-user-diagnosis.component';

describe('VtsUserDiagnosisComponent', () => {
  let component: VtsUserDiagnosisComponent;
  let fixture: ComponentFixture<VtsUserDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtsUserDiagnosisComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VtsUserDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
