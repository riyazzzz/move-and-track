import { NgModule } from "@angular/core";
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  Router,
} from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  // { path: '', redirectTo: '/tabs/members/dashboard', pathMatch: 'full' },
  { path: "", redirectTo: "/tabs/members/dashboard", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "list",
    loadChildren: () =>
      import("./list/list.module").then((m) => m.ListPageModule),
  },
  // {
  //   path: 'members',
  //   canActivate: [AuthGuard],
  //   loadChildren: './members/member-routing.module#MemberRoutingModule'
  // },
  // { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  //{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: "tabs", loadChildren: "./tabs/tabs.module#TabsPageModule" },
  {
    path: "livetrack/:id2",
    loadChildren: "./livetrack/livetrack.module#LivetrackPageModule",
  },
  {
    path: "trackhistory",
    loadChildren: "./trackhistory/trackhistory.module#TrackhistoryPageModule",
  },
  {
    path: "asset-info",
    loadChildren: "./asset-info/asset-info.module#AssetInfoPageModule",
  },
  {
    path: "geofence/:type/:vin",
    loadChildren: "./geofence/geofence.module#GeofencePageModule",
  },
  {
    path: "reports/:plateNo",
    loadChildren: "./reports/reports.module#ReportsPageModule",
  },
  {
    path: "reports-form",
    loadChildren:
      "./reports/reports-form/reports-form.module#ReportsFormPageModule",
  },
  { path: "nearby", loadChildren: "./nearby/nearby.module#NearbyPageModule" },
  { path: "entry", loadChildren: "./entry/entry.module#EntryPageModule" },
  {
    path: "settings/:type",
    loadChildren: "./settings/settings.module#SettingsPageModule",
  },
  {
    path: "detail-view",
    loadChildren:
      "./gridview-tab/detail-view/detail-view.module#DetailViewPageModule",
  },
  {
    path: "generalform",
    loadChildren:
      "./managefleets/generalform/generalform.module#GeneralformPageModule",
  },
  {
    path: "diagnosis",
    loadChildren: "./diagnosis/diagnosis.module#DiagnosisPageModule",
  },
  // gokul changes
  {
    path: "manage-fleet/:pagecomp",
    loadChildren: "./manage-fleet/manage-fleet.module#ManageFleetPageModule",
  },
  { path: "ticket", loadChildren: "./ticket/ticket.module#TicketPageModule" },
  {
    path: "ticket-conversation",
    loadChildren:
      "./ticket/ticket-conversation/ticket-conversation.module#TicketConversationPageModule",
  },
  {
    path: "maintanence",
    loadChildren: "./maintanence/maintanence.module#MaintanencePageModule",
  },
  { path: "camera", loadChildren: "./camera/camera.module#CameraPageModule" },
  {
    path: "add-camera",
    loadChildren: "./camera/add-camera/add-camera.module#AddCameraPageModule",
  },
  {
    path: "diagnosis-user",
    loadChildren: () =>
      import("./diagnosis-user/diagnosis-user.module").then(
        (m) => m.DiagnosisUserPageModule
      ),
  },
  {
    path: "tabs-login",
    loadChildren: "./tabs-login/tabs-login.module#TabsLoginPageModule",
  },
  {
    path: "stations/:type",
    loadChildren: "./nearby/stations/stations.module#StationsPageModule",
  },
  // { path: 'student-overview', loadChildren: './parent-app/student-overview/student-overview.module#StudentOverviewPageModule' },
  // { path: 'rout-map', loadChildren: './parent-app/rout-map/rout-map.module#RoutMapPageModule' },
  // { path: 'student-livetrack', loadChildren: './parent-app/student-livetrack/student-livetrack.module#StudentLivetrackPageModule' },
  {
    path: "about",
    loadChildren: "./parent-app/about/about.module#AboutPageModule",
  },
  {
    path: "parent-tab",
    loadChildren:
      "./parent-app/parent-tab/parent-tab.module#ParentTabPageModule",
  },
  {
    path: "student-dashboard",
    loadChildren:
      "./parent-app/student-dashboard/student-dashboard.module#StudentDashboardPageModule",
  },
  {
    path: "route-trip",
    loadChildren:
      "./skt/route/route-trip/route-trip.module#RouteTripPageModule",
  },
  {
    path: "student-details",
    loadChildren:
      "./skt/student/student-details/student-details.module#StudentDetailsPageModule",
  },
  {
    path: "class-table",
    loadChildren:
      "./skt/classdetails/class-table/class-table.module#ClassTablePageModule",
  },
  {
    path: "parent-table",
    loadChildren:
      "./skt/parent/parent-table/parent-table.module#ParentTablePageModule",
  },
  {
    path: "tag-table",
    loadChildren: "./skt/tag/tag-table/tag-table.module#TagTablePageModule",
  },
  {
    path: "gate-table",
    loadChildren: "./skt/gate/gate-table/gate-table.module#GateTablePageModule",
  },
  // { path: 'student-attendence', loadChildren: './skt/attendence/student-attendence/student-attendence.module#StudentAttendencePageModule' },
  {
    path: "school-enable",
    loadChildren:
      "./skt/enable/school-enable/school-enable.module#SchoolEnablePageModule",
  },
  {
    path: "excel-validation",
    loadChildren:
      "./skt/excel-validation/excel-validation.module#ExcelValidationPageModule",
  },
  {
    path: "broadcast-sms",
    loadChildren:
      "./skt/broad/broadcast-sms/broadcast-sms.module#BroadcastSmsPageModule",
  },
  {
    path: "attendence-report",
    loadChildren:
      "./parent-app/attendence-report/attendence-report.module#AttendenceReportPageModule",
  },
  {
    path: "change-number",
    loadChildren: "./change-number/change-number.module#ChangeNumberPageModule",
  },
  {
    path: "poc-geolocation",
    loadChildren:
      "./poc-geolocation/poc-geolocation.module#PocGeolocationPageModule",
  },
  // { path: 'expense-maintenance', loadChildren: './expense-maintenance/expense-maintenance.module#ExpenseMaintenancePageModule' },
  {
    path: "trip-summary/:type/:vin",
    loadChildren: "./trip-summary/trip-summary.module#TripSummaryPageModule",
  },
  {
    path: "odometer-history",
    loadChildren:
      "./armoron/odometer-history/odometer-history.module#OdometerHistoryPageModule",
  },
  {
    path: "ais-dashboard",
    loadChildren: "./ais-dashboard/ais-dashboard.module#AisDashboardPageModule",
  },
  {
    path: "advanced-expense-maintenance",
    loadChildren:
      "./advanced-expense-maintenance/advanced-expense-maintenance.module#AdvancedExpenseMaintenancePageModule",
  },
  {
    path: "expense-maintenance",
    loadChildren:
      "./fms/expense-maintanence/expense-maintanence.module#ExpenseMaintenancePageModule",
  },
  { path: "trip", loadChildren: "./fms/trip/trip.module#TripPageModule" },
  {
    path: "fms-dashboard",
    loadChildren:
      "./fms/fms-dashboard/fms-dashboard.module#FmsDashboardPageModule",
  },
  {
    path: "fms-login",
    loadChildren: "./fms/fms-login/fms-login.module#FmsLoginPageModule",
  },
  {
    path: "fms-tripreport",
    loadChildren:
      "./fms/fms-tripreport/fms-tripreport.module#FmsTripreportPageModule",
  },
  {
    path: "income-maintanence",
    loadChildren:
      "./fms/income-maintanence/income-maintanence.module#IncomeMaintanencePageModule",
  },
  {
    path: "skt-excell",
    loadChildren: "./skt/skt-excell/skt-excell.module#SktExcellPageModule",
  },
  {
    path: "inventory",
    loadChildren: "./fms/inventory/inventory.module#InventoryPageModule",
  },
  {
    path: "job-card-details",
    loadChildren:
      "./fms/job-card-details/job-card-details.module#JobCardDetailsPageModule",
  },
  {
    path: "currency-settings",
    loadChildren:
      "./fms/currency-settings/currency-settings.module#CurrencySettingsPageModule",
  },
  {
    path: "fmsreports",
    loadChildren: "./fms/fmsreports/fmsreports.module#FmsreportsPageModule",
  },
  {
    path: "fmsreports-form",
    loadChildren:
      "./fms/fmsreports/fmsreports-form/fmsreports-form.module#FmsreportsFormPageModule",
  },
  {
    path: "fms-manage",
    loadChildren: "./fms/fms-manage/fms-manage.module#FmsManagePageModule",
  },
  {
    path: "fms-profile",
    loadChildren: "./fms/fms-profile/fms-profile.module#FmsProfilePageModule",
  },
  {
    path: "fms-operators",
    loadChildren:
      "./fms/fms-operators/fms-operators.module#FmsOperatorsPageModule",
  },
  {
    path: "aklive-track",
    loadChildren: "./aklive-track/aklive-track.module#AkliveTrackPageModule",
  },

  // { path: 'trip', loadChildren: '.' }

  // { path: 'student-alert-report', loadChildren: './skt/student-alert-report/student-alert-report.module#StudentAlertReportPageModule' },
  // { path: 'dealer-slide', loadChildren: './dashboard/dealer-slide/dealer-slide.module#DealerSlidePageModule' },
  // { path: 'dealer-intro-slide', loadChildren: './dealer-intro-slide/dealer-intro-slide.module#DealerIntroSlidePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
