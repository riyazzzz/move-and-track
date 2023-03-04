import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockUploaderPage } from './stock-uploader.page';

describe('StockUploaderPage', () => {
  let component: StockUploaderPage;
  let fixture: ComponentFixture<StockUploaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockUploaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockUploaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
