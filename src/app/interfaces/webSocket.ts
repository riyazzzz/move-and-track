import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export abstract class websocket{
    abstract wsResponse(string): void ;
    //abstract wsAlertResponse(string) : void;
    abstract wsOnError(): void ;
}