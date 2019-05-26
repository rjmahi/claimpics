import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import { config } from '../utils/config';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SubmitphotosService {

  HOME_INSP_URL = config.API_URL;
  BUCKET_NAME = config.BUCKET_NAME;

  constructor(public http: Http) {

  }

  public submitSinglePhoto(id: String, claimNumber: String, ts: String, key: String, imgdata: String): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const url = this.HOME_INSP_URL + config.UTILS_CONTEXT + "/uploadimage";
    var location = claimNumber + "_" + id + "_" + ts;
    var bucketName = this.BUCKET_NAME;
    var finalObj = {
      folderName: location,
      key: key,
      bucketName: bucketName,
      fileType: "image/jpeg",
      fileData: imgdata

    }

    return this.http
      .post(url, finalObj, options)
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
  public submitHomeData(id: String, claimNumber: String, ts: String, obj: Object): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const url = this.HOME_INSP_URL + config.CLAIMPICS_CONTEXT + "/submit";
    var folderName = claimNumber + "_" + id + "_" + ts;
    var bucketName = this.BUCKET_NAME;
    if (obj) {
      obj["folderName"] = folderName;
      obj["bucketName"] = bucketName;
    }

    return this.http
      .post(url, obj, options)
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
