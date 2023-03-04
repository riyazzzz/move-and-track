import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({name: 'searchDealer'})

export class SearchFilterService {
  
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
