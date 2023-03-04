import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DeviceExtendOneyearInvoiceDetailsPage } from "./device-extend-oneyear-invoice-details.page";

describe("DeviceExtendOneyearInvoiceDetailsPage", () => {
  let component: DeviceExtendOneyearInvoiceDetailsPage;
  let fixture: ComponentFixture<DeviceExtendOneyearInvoiceDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceExtendOneyearInvoiceDetailsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceExtendOneyearInvoiceDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
