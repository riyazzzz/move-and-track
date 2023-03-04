import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAlert'
})
export class SearchAlertPipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
    if (!items) return [];
    let data: any;
    if (!terms) {
      data = items;
    }
    else {
      terms = terms.toLowerCase();
      data = items.filter(it => {
        if (it.plateNo != null){
          if(terms.replace(/ /g,'') == "enginestatuson"||terms.replace(/ /g,'')== "engineon"||terms.replace(/ /g,'')== "on" || terms.replace(/ /g,'')== "statuson"){
            return it.description.toLowerCase().includes('on');
          }else if(terms.replace(/ /g,'')== "enginestatusoff" ||terms.replace(/ /g,'') == "engineoff" ||terms.replace(/ /g,'')== "off" || terms.replace(/ /g,'')== "statusoff" ||terms.replace(/ /g,'')== "enginestatusof" ||terms.replace(/ /g,'') == "engineof" ||terms.replace(/ /g,'')== "of" || terms.replace(/ /g,'')== "statusof"){
            return it.description.toLowerCase().includes('off');
          }
          return it.plateNo.replace(/ /g,'').toLowerCase().includes(terms.replace(/ /g,'')) || it.alertTypes.replace(/ /g,'').toLowerCase().includes(terms.replace(/ /g,''));
        }
        else{
          return false;
      }
      });
    }
    return data.sort(function (a: any, b: any) {
      return new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime();
    });
  }
}
