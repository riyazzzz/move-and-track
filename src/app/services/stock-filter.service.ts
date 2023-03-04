import { Injectable, Pipe } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({name: 'search'})
export class StockFilterService {

  constructor() { }
  transform(items: any[], terms: string): any[] {
    if (!items) return [];
    if (!terms) return items;
    terms = terms.toLowerCase();
    return items.filter(showList => {
      if (showList != null){
        if(showList.companyName){
          return showList.companyName.toLowerCase().includes(terms);
        }
         if(showList.plateno){
          return showList.plateno.toLowerCase().includes(terms);
        }
         if(showList.imei){
          return showList.imei.toLowerCase().includes(terms);
        }
      }
      else{
        return false;
      }
    });
  }
}
