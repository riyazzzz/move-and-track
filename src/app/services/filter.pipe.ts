import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], terms: string, count: number, statusGrid: string[], manualFilter: string[]): any[] {
    if (!items) return [];
    if (terms) {
      if (manualFilter.length > 0) {
        return manualFilter;
      } else {
        let data: Array<Object>;
        if (terms !== "All" && terms !== "Vin") {
          data = items.filter(it => {
            return it.status === terms;
          });
        } else if (terms === "All") {
          data = items;
        }
        else {
          let vinData = [];
          for (let i = 0; i < statusGrid.length; i++) {
            items.filter(it => {
              if (it.vin === statusGrid[i]) {
                vinData.push(it);
              }
              return vinData;
            });
          }
          data = vinData;
        }
        // data.sort(function (a: any, b: any) {
        //   return new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime();
        // });

        localStorage.setItem('maxLength', data.length.toString());

        let data1: Array<Object> = [];
        for (let i = 0; i < count; i++) {
          if (data[i]) {
            data1.push(data[i]);
          } else {
            break;
          }
        }
        if (localStorage.gridDataLength !== data1.length.toString()) {
          localStorage.setItem('updateGridData', 'true');
        }
        localStorage.setItem('gridDataLength', data1.length.toString());
        localStorage.setItem('gridData', JSON.stringify(data1));

        return data1;
      }
    }
  }

}

