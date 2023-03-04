import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchuser',
  pure: true
})
export class SearchuserPipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
    if (!items) return [];
    if (!terms) return items;
   terms = terms.toLowerCase()
   return items.filter((value)=>{
        if(value.userName){
        return value.userName.toLowerCase().includes(terms);
       }else if (value.contact != null){
        return value.contact.replace(/ /g,'').toLowerCase().includes(terms.replace(/ /g,''));
       }
      })
    
  }

}
