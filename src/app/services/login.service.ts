import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { config } from '../utils/config';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  HOME_INSP_URL = config.API_URL + config.CLAIMPICS_CONTEXT;
  LOCATION_URL = config.API_URL;
  constructor(public http: Http) {

  }
  public login(id: string, claimNumber: string): Observable<any> {
    sessionStorage.clear();
    let ts = generateTimeStamp();
    const url = this.HOME_INSP_URL + "/validateautoclaim";
    var finalObj = {
      id: id,
      claimNumber: claimNumber
    }
    return this.http
      .post(url, finalObj)
      .map((response: Response) => {
        if (response) {
          sessionStorage.setItem("ts", ts);
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("claimNumber", claimNumber);
          sessionStorage.setItem('loggedInUser', "true");
          return response.json();
        }
      })
      .catch((error: any) => {
        console.log("****error" + error);
        return Observable.throw(error);
      });
  }
  public getAddress(location: Object): Observable<any> {

    const url = this.LOCATION_URL + "/util/location-address";

    return this.http
      .post(url, location)
      .map((response: Response) => {
        if (response) {
          return response.json();
        }
      })
      .catch((error: any) => {
        console.log("****error" + error);
        return Observable.throw(error);
      });
  }

}

function generateTimeStamp() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var ts = date.getFullYear() + "-" + month + "-" + date.getDate() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return ts;
}
