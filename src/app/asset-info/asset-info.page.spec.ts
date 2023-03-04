import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInfoPage } from './asset-info.page';

describe('AssetInfoPage', () => {
  let component: AssetInfoPage;
  let fixture: ComponentFixture<AssetInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
