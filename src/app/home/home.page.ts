import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';
const { Filesystem, Storage } = Plugins;

export const File_Key = 'files';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myFiles = []
  downloadUrl: any;
  downloadprogress: number;
  constructor(
    private fileOpener: FileOpener,
    private ajaxServices: AjaxService,
    private commonService: CommonService,
  ) {
    this.loadFile();
  }
  pdfUrl = "https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_500_kB.pdf"

  async loadFile() {
    const videoList = await Storage.get({
      key: File_Key
    })
    this.myFiles = JSON.parse(videoList.value) || [];
  }



  private getMimetype(name) {
    if (name.indexOf('pdf') >= 0) {
      return 'application/pdf'
    } else if (name.indexOf('png') >= 0) {
      return 'image/png'
    } else if (name.indexOf('mp4') >= 0) {
      return 'video/png'
    }
  }

  downloadFile(url?) {

    this.downloadUrl = url ? url : this.downloadUrl
    this.ajaxServices.ajaxGetFile(this.downloadUrl)
      .subscribe(async event => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.downloadprogress = Math.round((100 * event.loaded) / event.total)
        } else if (event.type === HttpEventType.Response) {
          this.downloadprogress = 0;
          const name = url.substr(url.lastIndexOf('/') + 1);
          // const base64 = await this.commonService.convertBlobToBase64(event.body) as string;
          const base64 = "data:text/html;charset=UTF-8,<h4 style=%22color: %23000; %22>Hello world!</h4>"

          const savedFile = await Filesystem.writeFile({
            path: name,
            data: base64,
            directory: FilesystemDirectory.Documents
          })
          console.log('Saved:' + savedFile.uri)
          const path = savedFile.uri;
          const mimeType = this.getMimetype(name)

          this.fileOpener.open(path, mimeType)
            .then(() => console.log('file open'))
            .catch(err => console.log('Error', err))

          this.myFiles.unshift(path);

          Storage.set({
            key: File_Key,
            value: JSON.stringify(this.myFiles)
          })
        }
      })
  }

  downloadFromHtml() {
    // parentdiv is the html element which has to be converted to PDF
    html2canvas(document.getElementById("parentdiv")).then(canvas => {

      var pdf = new jsPDF.jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');
      // var doc = new jsPDF('p', 'mm', 'a4');
      // var specialElementHandlers = {
      //   '#editor': function (element, renderer) {
      //     return true;
      //   }
      // };

      //   var ffg = "<html><head><title>Report Downloading</title> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/></head><style>table {border-collapse: collapse;width: 100% ;font-size: 11px;}th {background-color: #CCCCCC }td {background-color: white;}th, td {text-align: left;padding: 8pxborder: 1px solid black;}tr:nth-child(even){background-color: #f2f2f2 !important}</style><body style='font-family: KacstOffice,tahoma,arial,verdana,sans-serif ;font-size: 11px  !important'><br/><br/><br/><table width='100%' border='1'><thead><tr><th>ع ع</th><th>بدأ</th><th>موقع البدأ</th><th>انتهي</th><th>موقع الانتهاء</th><th>مدة التشغيل</th> <th>مدة التوقف</th> <th>مدة عمل المحرك بدونحركة</th><th>مدة السحب</th><th>عداد المسافة</th><th>Maximum Speed</th><th>اسم السائق</th></tr></thead></table></body></html>"
      //   doc.text(30,30,"s")
      //   doc.save('sample-file.pdf');
      // }
    }
    )};
    }
