import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertsComponent } from "./alerts/alerts.component";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SearchAlertPipe } from "../services/searchAlert.pipe";
import { SearchuserPipe } from "../services/searchuser.pipe";
import { GridviewCardComponent } from "./gridview-card/gridview-card.component";
import { ReportsCardComponent } from "./reports-card/reports-card.component";
import { ReportModal2Component } from "./report-modal2/report-modal2.component";
import { ExecutiveSummaryCardComponent } from "./executive-summary-card/executive-summary-card.component";
import { VtsInfoComponent } from "../asset-info/vts-info/vts-info.component";
import { WeekOdometerComponent } from "./week-odometer/week-odometer.component";
import { GridfilterComponent } from "./gridfilter/gridfilter.component";
import { GridSortComponent } from "./grid-sort/grid-sort.component";
import { AlertSettingsComponent } from "./alert-settings/alert-settings.component";
import { FormsModule } from "@angular/forms";
import { AlertCardComponent } from "./alert-card/alert-card.component";
import { SearchReportService } from "../services/search-report.service";
import { VehicleFunctionComponent } from "./vehicle-function/vehicle-function.component";
import { VtslivetrackComponent } from "../livetrack/vtslivetrack/vtslivetrack.component";
import { GridCardWebsiteComponent } from "./grid-card-website/grid-card-website.component";
import { VtsTrackhistoryComponent } from "../trackhistory/vts-trackhistory/vts-trackhistory.component";
import { VtsNearbyComponent } from "../nearby/vts-nearby/vts-nearby.component";
import { TemperatureSettingsComponent } from "./temperature-settings/temperature-settings.component";
import { TempratureCardComponent } from "./temprature-card/temprature-card.component";
import { VtsGeofenceComponent } from "../geofence/vts-geofence/vts-geofence.component";
import { OverallSettingsComponent } from "./overall-settings/overall-settings.component";
import { VtsReportsComponent } from "../reports/vts-reports/vts-reports.component";
import { VtsReportFormComponent } from "../reports/vts-report-form/vts-report-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicSelectableModule } from "ionic-selectable";
import { Routes, RouterModule } from "@angular/router";
import { OverspeedPage } from "../all-reports/overspeed/overspeed.page";
import { OverallSummaryPage } from "../all-reports/overall-summary/overall-summary.page";
import { TripSummaryPage } from "../all-reports/trip-summary/trip-summary.page";
import { ExecutiveSummaryComponent } from "../all-reports/executive-summary/executive-summary.component";
import { DriverBehaviourComponent } from "../all-reports/driver-behaviour/driver-behaviour.component";
import { StatusSummaryComponent } from "../all-reports/status-summary/status-summary.component";
import { AlertReportComponent } from "../all-reports/alert-report/alert-report.component";
import { SpeedReportComponent } from "../all-reports/speed-report/speed-report.component";
import { MovementReportComponent } from "../all-reports/movement-report/movement-report.component";
import { TempraturePage } from "../all-reports/temprature/temprature.page";
import { DoorOpenCountComponent } from "../all-reports/door-open-count/door-open-count.component";
import { DoorOpenReportComponent } from "../all-reports/door-open-report/door-open-report.component";
import { DoorSummaryReportComponent } from "../all-reports/door-summary-report/door-summary-report.component";
import { GridViewComponent } from "../all-reports/executive-summary/grid-view/grid-view.component";
import { TableViewComponent } from "../all-reports/executive-summary/table-view/table-view.component";
import { TableViewDrvComponent } from "../all-reports/driver-behaviour/table-view/table-view-drv.component";
import { GridViewDrvComponent } from "../all-reports/driver-behaviour/grid-view/grid-view-drv.component";
import { GridStatusComponent } from "../all-reports/status-summary/grid-status/grid-status.component";
import { TableStatusComponent } from "../all-reports/status-summary/table-status/table-status.component";
import { GridAlertComponent } from "../all-reports/alert-report/grid-alert/grid-alert.component";
import { TableAlertComponent } from "../all-reports/alert-report/table-alert/table-alert.component";
import { GridOverspeedComponent } from "../all-reports/overspeed/grid-overspeed/grid-overspeed.component";
import { TableOverspeedComponent } from "../all-reports/overspeed/table-overspeed/table-overspeed.component";
import { GridSpeedComponent } from "../all-reports/speed-report/grid-speed/grid-speed.component";
import { TableSpeedComponent } from "../all-reports/speed-report/table-speed/table-speed.component";
import { GridMovementComponent } from "../all-reports/movement-report/grid-movement/grid-movement.component";
import { TableMovementComponent } from "../all-reports/movement-report/table-movement/table-movement.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { TemperatureGridViewComponent } from "./temperature-grid-view/temperature-grid-view.component";
import { SharedModModule } from "../shared-mod/shared-mod.module";
import { TableComponent } from "./table/table.component";
import { TempratureRangeComponent } from "./temprature-range/temprature-range.component";
// changes by gokul
import { FleetFormComponent } from "./fleet-form/fleet-form.component";
import { ManageFleetTableComponent } from "./manage-fleet-table/manage-fleet-table.component";
import { jqxDropDownListComponent } from "jqwidgets-ng/jqxdropdownlist";
import { OperatorComponent } from "../manage-fleet/operator/operator.component";
import { OperatorformComponent } from "../manage-fleet/operator/operatorform/operatorform.component";
import { ProfileComponent } from "../manage-fleet/profile/profile.component";
import { UsersComponent } from "../manage-fleet/users/users.component";
import { AddTicketComponent } from "../ticket/add-ticket/add-ticket.component";
import { TicketCardComponent } from "../ticket/ticket-card/ticket-card.component";
//  import {TicketConversationComponent} from '../ticket/ticket-conversation/ticket-conversation.component';
import { UserformComponent } from "../manage-fleet/users/userform/userform.component";
import { MaintanenceFormComponent } from "../maintanence/maintanence-form/maintanence-form.component";
import { MaintanenceTableComponent } from "../maintanence/maintanence-table/maintanence-table.component";
import { MaintanenceCardComponent } from "../maintanence/maintanence-card/maintanence-card.component";
import { TicketconnectorComponent } from "./ticketconnector/ticketconnector.component";
import { ModelStatusComponent } from "./model-status/model-status.component";
import { LatLongMapPickerPage } from "../settings/lat-long-map-picker/lat-long-map-picker.page";
import { VtsUserDiagnosisComponent } from "../diagnosis-user/vts-user-diagnosis/vts-user-diagnosis.component";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { OperatorCardComponent } from "../manage-fleet/operator-card/operator-card.component";
import { UserCardComponent } from "../manage-fleet/user-card/user-card.component";
import { ManageFleetCardComponent } from "../components/manage-fleet-card/manage-fleet-card.component";
import { AlarmreportComponent } from "../all-reports/alarmreport/alarmreport.component";
import { AddFeatureComponent } from "../manage-fleet/add-feature/add-feature.component";
import { FileUploadModule } from "ng2-file-upload";
import { SubscriptionAlertComponent } from "../gridview-tab/subscription-alert/subscription-alert.component";
import { NodataImageComponent } from "./nodata-image/nodata-image.component";
import { SearchManageFleetsService } from "../services/search-manage-fleets.service";
import { FuelreportComponent } from "../all-reports/fuelreport/fuelreport.component";
import { ConversationTabPage } from "../ticket/conversation-tab/conversation-tab.page";
import { SensorConfigurationComponent } from "./sensor-configuration/sensor-configuration.component";
import { PrimitiveMaintananceComponent } from "../all-reports/primitive-maintanance/primitive-maintanance.component";
import { WeekOdometerReportComponent } from "../all-reports/week-odometer-report/week-odometer-report.component";
import { AttendanceReportComponent } from "../all-reports/attendance-report/attendance-report.component";
import { StudentAlertReportPage } from "../all-reports/student-alert-report/student-alert-report.page";
import { AcreportComponent } from "../all-reports/acreport/acreport.component";
// import{ExpenseTableComponent} from '../expense-maintenance/expense-table/expense-table.component';

import { TripCardComponent } from "../components/trip-card/trip-card.component";
import { NewTripSummaryComponent } from "../all-reports/new-trip-summary/new-trip-summary.component";
import { VtsTripSummaryComponent } from "../trip-summary/vts-trip-summary/vts-trip-summary.component";
import { ScheduleMaintenanceComponent } from "../components/schedule-maintenance/schedule-maintenance.component";
import { CommonTableComponent } from "../components/common-table/common-table.component";
import { AddrenewalComponent } from "../delar-application/addrenewal/addrenewal.component";
import { RenewalTableComponent } from "../delar-application/renewal-table/renewal-table.component";
import { VtsTripDetailsComponent } from "./vts-trip-details/vts-trip-details.component";
// FMS Menus
import { AddExpenseComponent } from "../fms/expense-maintanence/add-expense/add-expense.component";
import { TripTableComponent } from "../fms/trip/trip-table/trip-table.component";
import { TripFormComponent } from "../fms/trip/trip-form/trip-form.component";
import { ExpenseFormComponent } from "../fms/expense-maintanence/expense-form/expense-form.component";
import { ExpenseTableComponent } from "../fms/expense-maintanence/expense-table/expense-table.component";
import { IncomeTableComponent } from "../fms/income-maintanence/income-table/income-table.component";
import { IncomeFormComponent } from "../fms/income-maintanence/income-form/income-form.component";
import { AddIncomeComponent } from "../fms/income-maintanence/add-income/add-income.component";
import { JobCardTableComponent } from "../fms/job-card-details/job-card-table/job-card-table.component";
import { JobCardFormComponent } from "../fms/job-card-details/job-card-form/job-card-form.component";
import { IncomeandexpenseReportComponent } from "../fms/fms-tripreport/incomeandexpense-report/incomeandexpense-report.component";
import { IncomeandexpensegroupReportComponent } from "../fms/fms-tripreport/incomeandexpensegroup-report/incomeandexpensegroup-report.component";
import { InventoryTableComponent } from "../fms/inventory/inventory-table/inventory-table.component";
import { FmsReportsComponent } from "../fms/fmsreports/fms-reports/fms-reports.component";
import { FmsReportsFormComponent } from "../fms/fmsreports/fms-reports-form/fms-reports-form.component";
import { ManageTableComponent } from "../fms/fms-manage/manage-table/manage-table.component";
import { AddManageFormComponent } from "../fms/fms-manage/add-manage-form/add-manage-form.component";
import { OperatorTableComponent } from "../fms/fms-operators/operator-table/operator-table.component";
import { OperatorFormComponent } from "../fms/fms-operators/operator-form/operator-form.component";
import { ProfileFmsComponent } from "../fms/fms-profile/profile-fms/profile-fms.component";
const routes: Routes = [
  {
    path: "overspeedReport",
    component: OverspeedPage,
  },
  {
    path: "overallSummaryReport",
    component: OverallSummaryPage,
  },
  {
    path: "tripSummaryReport",
    component: TripSummaryPage,
  },
  {
    path: "executiveSummaryReport",
    component: ExecutiveSummaryComponent,
  },
  {
    path: "driverBehavior",
    component: DriverBehaviourComponent,
  },
  {
    path: "statusSummary",
    component: StatusSummaryComponent,
  },
  {
    path: "alertReport",
    component: AlertReportComponent,
  },
  {
    path: "speedReport",
    component: SpeedReportComponent,
  },
  {
    path: "movementReport",
    component: MovementReportComponent,
  },
  {
    path: "temprature",
    component: TempraturePage,
  },
  {
    path: "doorOpenReport",
    component: DoorOpenReportComponent,
  },
  {
    path: "doorSummaryReport",
    component: DoorSummaryReportComponent,
  },
  {
    path: "doorCountReport",
    component: DoorOpenCountComponent,
  },
  {
    path: "latlongData",
    component: LatLongMapPickerPage,
  },
  {
    path: "alarmreport",
    component: AlarmreportComponent,
  },
  {
    path: "fuelreport",
    component: FuelreportComponent,
  },
  {
    path: "primitiveMaintanance",
    component: PrimitiveMaintananceComponent,
  },
  {
    path: "weekodometerreport",
    component: WeekOdometerReportComponent,
  },
  {
    path: "attendencereport",
    component: AttendanceReportComponent,
  },
  {
    path: "studentalert",
    component: StudentAlertReportPage,
  },
  {
    path: "acreport",
    component: AcreportComponent,
  },
];
@NgModule({
  declarations: [
    IncomeandexpensegroupReportComponent,
    IncomeandexpenseReportComponent,
    InventoryTableComponent,
    JobCardTableComponent,
    ManageTableComponent,
    OperatorTableComponent,
    JobCardFormComponent,
    AddManageFormComponent,
    OperatorFormComponent,
    IncomeTableComponent,
    AddIncomeComponent,
    IncomeFormComponent,
    TripTableComponent,
    RenewalTableComponent,
    CommonTableComponent,
    TripCardComponent,
    ConversationTabPage,
    AlertsComponent,
    NewTripSummaryComponent,
    StudentAlertReportPage,
    AcreportComponent,
    AttendanceReportComponent,
    ManageFleetCardComponent,
    SearchReportService,
    SearchManageFleetsService,
    SearchuserPipe,
    SearchAlertPipe,
    GridviewCardComponent,
    ReportsCardComponent,
    ReportModal2Component,
    ExecutiveSummaryCardComponent,
    VtsInfoComponent,
    WeekOdometerComponent,
    GridSortComponent,
    AlertSettingsComponent,
    GridfilterComponent,
    AlertCardComponent,
    VehicleFunctionComponent,
    VtslivetrackComponent,
    VtsTrackhistoryComponent,
    GridCardWebsiteComponent,
    VtsNearbyComponent,
    TemperatureSettingsComponent,
    TempratureCardComponent,
    VtsGeofenceComponent,
    OverallSettingsComponent,
    VtsReportsComponent,
    FmsReportsComponent,
    FmsReportsFormComponent,
    VtsReportFormComponent,
    OverspeedPage,
    OverallSummaryPage,
    TripSummaryPage,
    VtsTripSummaryComponent,
    ScheduleMaintenanceComponent,
    AddFeatureComponent,
    ExecutiveSummaryComponent,
    GridViewComponent,
    TableViewComponent,
    MaintanenceCardComponent,
    LatLongMapPickerPage,
    PrimitiveMaintananceComponent,
    WeekOdometerReportComponent,
    TripSummaryPage,
    ExecutiveSummaryComponent,
    GridViewComponent,
    TableViewComponent,
    MaintanenceCardComponent,
    LatLongMapPickerPage,
    SensorConfigurationComponent,
    DriverBehaviourComponent,
    TableViewDrvComponent,
    GridViewDrvComponent,
    StatusSummaryComponent,
    TicketconnectorComponent,
    AlarmreportComponent,
    GridStatusComponent,
    ExpenseFormComponent,
    TableStatusComponent,
    AlertReportComponent,
    GridAlertComponent,
    TableAlertComponent,
    TempratureRangeComponent,
    FuelreportComponent,
    GridOverspeedComponent,
    AddExpenseComponent,
    TripFormComponent,
    VtsUserDiagnosisComponent,
    TableOverspeedComponent,
    SpeedReportComponent,
    GridSpeedComponent,
    TableSpeedComponent,
    ModelStatusComponent,
    MovementReportComponent,
    FleetFormComponent,
    ManageFleetTableComponent,
    jqxDropDownListComponent,
    GridMovementComponent,
    TableMovementComponent,
    TempraturePage,
    TableComponent,
    DoorOpenReportComponent,
    SubscriptionAlertComponent,
    OperatorCardComponent,
    UserCardComponent,
    DoorSummaryReportComponent,
    DoorOpenCountComponent,
    TemperatureGridViewComponent,
    MaintanenceFormComponent,
    MaintanenceTableComponent,
    OperatorComponent,
    OperatorformComponent,
    ProfileComponent,
    ProfileFmsComponent,
    UsersComponent,
    AddTicketComponent,
    TicketCardComponent,
    UserformComponent,
    NodataImageComponent,
    ExpenseTableComponent,
    VtsTripDetailsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule.forChild(routes),
    FormsModule,
    FileUploadModule,
    IonicSelectableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    SharedModModule,
  ],
  entryComponents: [
    IncomeFormComponent,
    JobCardFormComponent,
    AddManageFormComponent,
    OperatorFormComponent,
    AddIncomeComponent,
    AddExpenseComponent,
    ExpenseFormComponent,
    TripFormComponent,
    ConversationTabPage,
    FleetFormComponent,
    SubscriptionAlertComponent,
    AddFeatureComponent,
    OperatorformComponent,
    UserformComponent,
    AddTicketComponent,
    MaintanenceFormComponent,
  ],
  exports: [
    RenewalTableComponent,
    ConversationTabPage,
    SearchuserPipe,
    AddExpenseComponent,
    CommonTableComponent,
    TripCardComponent,
    jqxDropDownListComponent,
    IncomeTableComponent,
    IncomeandexpensegroupReportComponent,
    IncomeandexpenseReportComponent,
    JobCardTableComponent,
    OperatorTableComponent,
    ManageTableComponent,
    InventoryTableComponent,
    TripTableComponent,
    IncomeFormComponent,
    JobCardFormComponent,
    OperatorFormComponent,
    AddManageFormComponent,
    AddIncomeComponent,
    AlertsComponent,
    SensorConfigurationComponent,
    VtsReportFormComponent,
    AttendanceReportComponent,
    FmsReportsFormComponent,
    AddFeatureComponent,
    FuelreportComponent,
    TableComponent,
    SearchManageFleetsService,
    AcreportComponent,
    VtsReportsComponent,
    NodataImageComponent,
    WeekOdometerReportComponent,
    FmsReportsComponent,
    TempratureCardComponent,
    TripFormComponent,
    LatLongMapPickerPage,
    ManageFleetCardComponent,
    TemperatureSettingsComponent,
    StudentAlertReportPage,
    NewTripSummaryComponent,
    AlertCardComponent,
    VtsUserDiagnosisComponent,
    VtsNearbyComponent,
    OperatorCardComponent,
    UserCardComponent,
    OverallSettingsComponent,
    GridCardWebsiteComponent,
    VtslivetrackComponent,
    VtsTrackhistoryComponent,
    VehicleFunctionComponent,
    VtsTripSummaryComponent,
    ScheduleMaintenanceComponent,
    GridviewCardComponent,
    ExpenseFormComponent,
    VtsGeofenceComponent,
    ExpenseTableComponent,
    ReportsCardComponent,
    ReportModal2Component,
    SubscriptionAlertComponent,
    ExecutiveSummaryCardComponent,
    VtsInfoComponent,
    ModelStatusComponent,
    WeekOdometerComponent,
    PrimitiveMaintananceComponent,
    GridSortComponent,
    TicketconnectorComponent,
    SearchReportService,
    AlertSettingsComponent,
    MaintanenceFormComponent,
    MaintanenceTableComponent,
    AlarmreportComponent,
    GridfilterComponent,
    OverspeedPage,
    OverallSummaryPage,
    TempratureRangeComponent,
    TripSummaryPage,
    ExecutiveSummaryComponent,
    GridViewComponent,
    TableViewComponent,
    MaintanenceCardComponent,
    DriverBehaviourComponent,
    TableViewDrvComponent,
    GridViewDrvComponent,
    StatusSummaryComponent,
    GridStatusComponent,
    TableStatusComponent,
    AlertReportComponent,
    GridAlertComponent,
    TableAlertComponent,
    GridOverspeedComponent,
    TableOverspeedComponent,
    SpeedReportComponent,
    GridSpeedComponent,
    TableSpeedComponent,
    MovementReportComponent,
    GridMovementComponent,
    TableMovementComponent,
    TempraturePage,
    TemperatureGridViewComponent,
    FleetFormComponent,
    ManageFleetTableComponent,
    DoorOpenReportComponent,
    DoorSummaryReportComponent,
    DoorOpenCountComponent,
    OperatorComponent,
    OperatorformComponent,
    ProfileComponent,
    ProfileFmsComponent,
    UsersComponent,
    AddTicketComponent,
    TicketCardComponent,
    UserformComponent,
    VtsTripDetailsComponent,
  ],
})
export class ComponentsModule {}
