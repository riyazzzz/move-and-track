import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { AjaxService } from 'src/app/services/ajax.service';
import { CommonService } from 'src/app/services/common.service';
import { serverUrl } from '../../../environments/environment';
enableRipple(true);
@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.scss'],
  // template:``
})


export class AddFeatureComponent implements OnInit {
  nodeData;
  featuresName;
  selectedArray = []
  sampleData;
  @Input() value;
  @ViewChild('sample', { static: false })
  @ViewChild('treeview', { static: false }) tree: TreeViewComponent;


  constructor(private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService,
  ) { }
  data;
  public field: Object = {};
  // set the CheckBox to the TreeView
  public showCheckBox: boolean = true;
  public autoCheck: boolean = true;
  //set the checknodes to the TreeView  
  //public checkedNodes: string[] = ['2','6'];
  public allowEditing: boolean = true;
  public nodeChecked(args): void {
    alert("The checked node's id is: " + this.tree.checkedNodes);

    localStorage.setItem('userFeatuure', args.target);
    console.log(args.target.value)
  }
  public isChecked(args): void {


  }


  getBack() {
    this.modalController.dismiss();
  }

  selectData(data) {
    if (data.isChecked == false) {
      this.selectedArray.push(data);
    } else {
      let newArray = this.selectedArray.filter(function (el) {
        return el.id !== data.id;
      });
      this.selectedArray = newArray;
    }
    console.log(this.selectedArray);
    //   if (data.isChecked == false){
    //      this.selectedArray.push(data.name);
    //      for(var i=0;i<this.selectedArray.length;i++){
    //        if(this.selectedArray[i] == data.name){
    //         const id = this.selectedArray.indexOf(data.name);
    //         this.selectedArray.splice(id,  1);
    //        }
    //      }

  }

  submitData() {

    // this.nodeData = this.tree.checkedNodes;
    // console.log(this.nodeData,"Checked");
    // this.sampleData= this.data.filter(data => !this.tree.checkedNodes.includes(data.id+"") ?  data.isChecked = false : data.isChecked = true) ;
    // console.log(this.sampleData,"+++++++++++++++");
    // localStorage.setItem('userFeature',JSON.stringify(this.sampleData));
    var postDatas = [];
    for (var i = 0; i < this.selectedArray.length; i++) {
      // postDatas += this.sampleData[i].name+','
      postDatas.push(this.selectedArray[i].name)
    }
    var data={"compId":this.value.companyId,"userId":this.value.userName,"oldCategoryRole":"CompanyAdmin"}
    const url=serverUrl.web + '/user/update/userfeatures?compId='+this.value.companyId+'&userId='+this.value.userName
      this.ajaxService.ajaxPostWithString(url,postDatas).subscribe(res=>{
        var resData = JSON.parse(res);
        (resData.message == "Persisted") ? this.commonService.presentToast('Updated successfully') : this.commonService.presentToast('Please try again');
        this.modalController.dismiss();
      })
  }



  ngOnInit() {
    console.log(this.value.userName);
    var data = { "userId": this.value.userName, "companyId": this.value.companyId }
    const url1 = serverUrl.web + '/user/get/userfeatures?userId=' + this.value.userName + '&companyId=' + this.value.companyId
    this.ajaxService.ajaxGetWithString(url1).subscribe(res => {
      console.log(res);
      this.data = JSON.parse(res);
      // this.data=[{expanded: true, hasChild: true, name: "Alert", id: 0, isChecked: false},
      // {name: "Geo fence", pid: 0, id: 1, isChecked: true},
      // {name: "Alerts", pid: 0, id: 2, isChecked: true},
      // {expanded: true, hasChild: true, name: "Assets", id: 3, isChecked: false},
      // {name: "Users", pid: 3, id: 4, isChecked: true},
      // {name: "Operators", pid: 3, id: 5, isChecked: true},
      // {name: "Manage", pid: 3, id: 6, isChecked: true},
      // {expanded: true, hasChild: true, name: "Charts", id: 7, isChecked: false},
      // {name: "Odometer Summary", pid: 7, id: 8, isChecked: true},
      // {name: "Speedometer Summary", pid: 7, id: 9, isChecked: true},
      // {name: "Top 5 Engine Hours", pid: 7, id: 10, isChecked: true},
      // {name: "Top 5 Odometer Vehicles", pid: 7, id: 11, isChecked: true},
      // {name: "Alert Count Summery", pid: 7, id: 12, isChecked: true},
      // {name: "Top 5 Overspeed Vehicles", pid: 7, id: 13, isChecked: true},
      // {name: "Top 5 Unused Assets", pid: 7, id: 14, isChecked: true},
      // {name: "Distribution Summary", pid: 7, id: 15, isChecked: true},
      // {name: "Unused Vehicles Summary", pid: 7, id: 16, isChecked: true}]
      this.field = { dataSource: this.data, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].isChecked == true) {
          this.selectedArray.push(this.data[i])
        }
      }
    })

  }

}
