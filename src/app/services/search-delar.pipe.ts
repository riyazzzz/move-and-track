import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDelar'
})
export class SearchDelarPipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
    if (!items) return [];
    if (!terms) return items;
    terms = terms.toLowerCase();
    return items.filter(it => {
      if (it.imei != null){
        return it.imei.replace(/ /g,'').toLowerCase().includes(terms.replace(/ /g,''));
      }else if(it.name){
          return it.name.toLowerCase().includes(terms);
      }
      else
        return false;
    });
  }
}
