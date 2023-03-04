import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';


const httpOptionsWithJson = {
  headers: new HttpHeaders(
    {
      'Authorization': 'Basic d1d0MkJzcTVFd3hIZ2o0SW85alA6YXBta3Q=',
      'Content-Type': 'application/json'
    })
};

const httpOptionsWithJson2 = {
  headers: new HttpHeaders(
    {
      'Authorization': 'Basic d1d0MkJzcTVFd3hIZ2o0SW85alA6YXBta3Q=',
      
    }),  
 
};


@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  constructor(
    private http: HttpClient,
    public toastController: ToastController) { }

  async toast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  handleError = (error: HttpErrorResponse) => {
    this.toast('Something bad happened; please try again later.');
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  ticketGet(url: string): Observable<any> {
    return this.http.get(url, httpOptionsWithJson)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  ticketPost(url: string, data: any): Observable<any> {
    return this.http.post(url, data, httpOptionsWithJson)
        .pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
}

ticketPostImage(url: string, data: FormData): Observable<any> {
  return this.http.post(url, data, httpOptionsWithJson2)
      .pipe(
          map(this.extractData),
          catchError(this.handleError)
      );
}
}
