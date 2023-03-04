import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({ name: 'searchmanage' })
export class SearchManageFleetsService {

  constructor() { }
  transform(items: any[], terms: string): any[] {
    if (!items) return [];
    if (!terms) return items;
    terms = terms.toLowerCase();
    return items.filter(showList => {
      if (showList != null) {
        if (showList.name) {
          return showList.name.toLowerCase().includes(terms);
        }
        if (showList.email) {
          return showList.email.toLowerCase().includes(terms);
        }
        if (showList.companyName) {
          return showList.companyName.toLowerCase().includes(terms);
        }
        if (showList.type) {
          return showList.type.toLowerCase().includes(terms);
        }
        if (showList.state) {
          return showList.state.toLowerCase().includes(terms);
        }
        if (showList.companyId) {
          return showList.companyId.toLowerCase().includes(terms);
        }
        if (showList.plateNo) {
          return showList.plateNo.toLowerCase().includes(terms);
        }
        if (showList.imeiNo) {
          return showList.imeiNo.toLowerCase().includes(terms);
        }
        if (showList.make) {
          return showList.make.toLowerCase().includes(terms);
        }
        if (showList.model) {
          return showList.model.toLowerCase().includes(terms);
        }
        if (showList.icon) {
          return showList.icon.toLowerCase().includes(terms);
        }
        if (showList.icon) {
          return showList.icon.toLowerCase().includes(terms);
        }

      }
      else {
        return false;
      }
    });
  }
}
