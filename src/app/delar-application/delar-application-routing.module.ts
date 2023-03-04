import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardPageModule),
  },
  {
    path: "company-vehicle",
    loadChildren: () =>
      import("./company-vehicle/company-vehicle.module").then(
        (m) => m.CompanyVehiclePageModule
      ),
  },
  {
    path: "add-delar",
    loadChildren: () =>
      import("./add-delar/add-delar.module").then((m) => m.AddDelarPageModule),
  },
  {
    path: "device-commands",
    loadChildren: () =>
      import("./device-commands/device-commands.module").then(
        (m) => m.DeviceCommandsPageModule
      ),
  },
  {
    path: "new-dashboard",
    loadChildren: () =>
      import("./new-dashboard/new-dashboard.module").then(
        (m) => m.NewDashboardPageModule
      ),
  },
  {
    path: "device-activation",
    loadChildren: () =>
      import("./device-activation/device-activation.module").then(
        (m) => m.DeviceActivationPageModule
      ),
  },
  {
    path: "vehicle-creation",
    loadChildren: () =>
      import("./vehicle-creation/vehicle-creation.module").then(
        (m) => m.VehicleCreationPageModule
      ),
  },
  {
    path: "stock-uploader",
    loadChildren: () =>
      import("./stock-uploader/stock-uploader.module").then(
        (m) => m.StockUploaderPageModule
      ),
  },
  {
    path: "stocks",
    loadChildren: () =>
      import("./stocks/stocks.module").then((m) => m.StocksPageModule),
  },
  {
    path: "subscription",
    loadChildren: () =>
      import("./subscription/subscription.module").then(
        (m) => m.SubscriptionPageModule
      ),
  },
  {
    path: "sales-report",
    loadChildren: () =>
      import("./sales-report/sales-report.module").then(
        (m) => m.SalesReportPageModule
      ),
  },
  {
    path: "profile-detail",
    loadChildren:
      "./profile-detail/profile-detail.module#ProfileDetailPageModule",
  },
  {
    path: "assert-status-list/:type",
    loadChildren:
      "./new-dashboard/assert-status-list/assert-status-list.module#AssertStatusListPageModule",
  },
  {
    path: "check-imei",
    loadChildren: "./check-imei/check-imei.module#CheckImeiPageModule",
  },
  {
    path: "certificate",
    loadChildren: "./certificate/certificate.module#CertificatePageModule",
  },
  {
    path: "custom-certificate",
    loadChildren:
      "./custom-certificate/custom-certificate.module#CustomCertificatePageModule",
  },
  // { path: 'renewal', loadChildren: './renewal/renewal.module#RenewalPageModule' },
  {
    path: "renewal",
    loadChildren: "./renewal/renewal.module#RenewalPageModule",
  },
  //sensorise pages
  {
    path: "purchase-detail",
    loadChildren:
      "./purchase-detail/purchase-detail.module#PurchaseDetailPageModule",
  },
  {
    path: "manufacture-detail",
    loadChildren:
      "./manufacture-detail/manufacture-detail.module#ManufactureDetailPageModule",
  },
  {
    path: "production-details",
    loadChildren:
      "./production-details/production-details.module#ProductionDetailsPageModule",
  },
  {
    path: "sales-detail",
    loadChildren: "./sales-detail/sales-detail.module#SalesDetailPageModule",
  },
  {
    path: "dealer-detail",
    loadChildren: "./dealer-detail/dealer-detail.module#DealerDetailPageModule",
  },
  {
    path: "ca-request",
    loadChildren: "./ca-request/ca-request.module#CARequestPageModule",
  },
  {
    path: "senorise-rsu",
    loadChildren: "./senorise-rsu/senorise-rsu.module#SenoriseRSUPageModule",
  },
  {
    path: "iccid-details",
    loadChildren: "./iccid-details/iccid-details.module#IccidDetailsPageModule",
  },
  {
    path: "ca-report",
    loadChildren: "./ca-report/ca-report.module#CaReportPageModule",
  },
  {
    path: "vehicle-registration",
    loadChildren:
      "./vehicle-registration/vehicle-registration.module#VehicleRegistrationPageModule",
  },
  {
    path: "rsu-details",
    loadChildren: "./rsu-details/rsu-details.module#RSUDetailsPageModule",
  },
  {
    path: "rsu-request",
    loadChildren: "./rsu-request/rsu-request.module#RSURequestPageModule",
  },
  {
    path: "dealer-vehicle-assign",
    loadChildren:
      "./dealer-vehicle-assign/dealer-vehicle-assign.module#DealerVehicleAssignPageModule",
  },
  {
    path: "warranty-expiry",
    loadChildren:
      "./warranty-expiry/warranty-expiry.module#WarrantyExpiryPageModule",
  },
  {
    path: "inventory-details",
    loadChildren:
      "./inventory-details/inventory-details.module#InventoryDetailsPageModule",
  },
  {
    path: "third-party-vin",
    loadChildren:
      "./third-party-vin/third-party-vin.module#ThirdPartyVinPageModule",
  },
  {
    path: "rsu-iccid-details",
    loadChildren:
      "./rsu-iccid-details/rsu-iccid-details.module#RsuIccidDetailsPageModule",
  },
  {
    path: "esim-purchase-details",
    loadChildren:
      "./esim-purchase-details/esim-purchase-details.module#EsimPurchaseDetailsPageModule",
  },
  {
    path: "esim-manufacture-details",
    loadChildren:
      "./esim-manufacture-details/esim-manufacture-details.module#EsimManufactureDetailsPageModule",
  },
  {
    path: "esim-production-detail",
    loadChildren:
      "./esim-production-detail/esim-production-detail.module#EsimProductionDetailPageModule",
  },
  {
    path: "esim-sales-detail",
    loadChildren:
      "./esim-sales-detail/esim-sales-detail.module#EsimSalesDetailPageModule",
  },
  {
    path: "esim-dealer-detail",
    loadChildren:
      "./esim-dealer-detail/esim-dealer-detail.module#EsimDealerDetailPageModule",
  },
  {
    path: "esim-ca-request",
    loadChildren:
      "./esim-ca-request/esim-ca-request.module#EsimCaRequestPageModule",
  },
  {
    path: "esim-ca-report",
    loadChildren:
      "./esim-ca-report/esim-ca-report.module#EsimCaReportPageModule",
  },
  {
    path: "esim-details",
    loadChildren: "./esim-details/esim-details.module#EsimDetailsPageModule",
  },
  {
    path: "esim-transport-details",
    loadChildren:
      "./esim-transport-details/esim-transport-details.module#EsimTransportDetailsPageModule",
  },
  {
    path: "esim-sales-invoice-details",
    loadChildren:
      "./esim-sales-invoice-details/esim-sales-invoice-details.module#EsimSalesInvoiceDetailsPageModule",
  },
  {
    path: "esim-customer-ca-details",
    loadChildren:
      "./esim-customer-ca-details/esim-customer-ca-details.module#EsimCustomerCaDetailsPageModule",
  },
  {
    path: "esim-device-detail-update",
    loadChildren:
      "./esim-device-detail-update/esim-device-detail-update.module#EsimDeviceDetailUpdatePageModule",
  },
  {
    path: "stock-assign",
    loadChildren: "./stock-assign/stock-assign.module#StockAssignPageModule",
  },
  {
    path: "dealer-stock-list",
    loadChildren:
      "./dealer-stock-list/dealer-stock-list.module#DealerStockListPageModule",
  },
  {
    path: "esim-renewal",
    loadChildren: "./esim-renewal/esim-renewal.module#EsimRenewalPageModule",
  },
  {
    path: "esim-device-renewal-request",
    loadChildren:
      "./esim-device-renewal-request/esim-device-renewal-request.module#EsimDeviceRenewalRequestPageModule",
  },
  {
    path: "esim-renewal-status-update",
    loadChildren:
      "./esim-renewal-status-update/esim-renewal-status-update.module#EsimRenewalStatusUpdatePageModule",
  },
  {
    path: "esim-accounts-mapping",
    loadChildren:
      "./esim-accounts-mapping/esim-accounts-mapping.module#EsimAccountsMappingPageModule",
  },
  {
    path: "esim-billing-plan",
    loadChildren:
      "./esim-billing-plan/esim-billing-plan.module#EsimBillingPlanPageModule",
  },
  {
    path: "esim-billing-generation",
    loadChildren:
      "./esim-billing-generation/esim-billing-generation.module#EsimBillingGenerationPageModule",
  },
  {
    path: "imei-full-details",
    loadChildren:
      "./imei-full-details/imei-full-details.module#ImeiFullDetailsPageModule",
  },
  {
    path: "dealer-hierarchy",
    loadChildren:
      "./dealer-hierarchy/dealer-hierarchy.module#DealerHierarchyPageModule",
  },  { path: 'device-renewal-invoice-details', loadChildren: './device-renewal-invoice-details/device-renewal-invoice-details.module#DeviceRenewalInvoiceDetailsPageModule' },
  { path: 'device-return-details', loadChildren: './device-return-details/device-return-details.module#DeviceReturnDetailsPageModule' },
  { path: 'device-topup-request', loadChildren: './device-topup-request/device-topup-request.module#DeviceTopupRequestPageModule' },
  { path: 'dealer-imeicheck-details', loadChildren: './dealer-imeicheck-details/dealer-imeicheck-details.module#DealerImeicheckDetailsPageModule' },
  { path: 'device-topup-invoice-details', loadChildren: './device-topup-invoice-details/device-topup-invoice-details.module#DeviceTopupInvoiceDetailsPageModule' },
  { path: 'device-extend-one-year-request', loadChildren: './device-extend-one-year-request/device-extend-one-year-request.module#DeviceExtendOneYearRequestPageModule' },
  { path: 'device-extend-oneyear-invoice-details', loadChildren: './device-extend-oneyear-invoice-details/device-extend-oneyear-invoice-details.module#DeviceExtendOneyearInvoiceDetailsPageModule' },
  { path: 'esim-dashboard', loadChildren: './esim-dashboard/esim-dashboard.module#EsimDashboardPageModule' },
  { path: 'device-certificate-invoice-details', loadChildren: './device-certificate-invoice-details/device-certificate-invoice-details.module#DeviceCertificateInvoiceDetailsPageModule' },
  { path: 'device-topup-request-details', loadChildren: './device-topup-request-details/device-topup-request-details.module#DeviceTopupRequestDetailsPageModule' },
  { path: 'device-extend-oneyear-request-details', loadChildren: './device-extend-oneyear-request-details/device-extend-oneyear-request-details.module#DeviceExtendOneyearRequestDetailsPageModule' },
  { path: 'device-activation-history', loadChildren: './device-activation-history/device-activation-history.module#DeviceActivationHistoryPageModule' },
  { path: 'device-topup-status-update', loadChildren: './device-topup-status-update/device-topup-status-update.module#DeviceTopupStatusUpdatePageModule' },
  { path: 'device-extend-status-update', loadChildren: './device-extend-status-update/device-extend-status-update.module#DeviceExtendStatusUpdatePageModule' },
  { path: 'device-certificate-request', loadChildren: './device-certificate-request/device-certificate-request.module#DeviceCertificateRequestPageModule' },
  { path: 'certificate-generation', loadChildren: './certificate-generation/certificate-generation.module#CertificateGenerationPageModule' },
  { path: 'dealer-assign', loadChildren: './dealer-assign/dealer-assign.module#DealerAssignPageModule' },
  { path: 'esim-home', loadChildren: './esim-home/esim-home.module#EsimHomePageModule' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DelarApplicationRoutingModule {}
