import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor() { }
  
  addUser(user){
    let gridDataa=[]
    if(localStorage.getItem('gridDataa')){
      gridDataa = JSON.parse(localStorage.getItem('gridDataa'));
      gridDataa = [user, ...gridDataa];
    }else{
      gridDataa = [user]
    }
    localStorage.setItem('gridDataa', JSON.stringify(gridDataa));

    
    
  }
  
   
  }
    

   
  


