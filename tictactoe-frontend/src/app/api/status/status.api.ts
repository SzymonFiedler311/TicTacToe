import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class StatusApi {

  private readonly getStatusUrl = environment.apiUrl + '/getStatus';

  constructor(private http: HttpClient) {
  }

  public getStatus(): Observable<string> {
    return this.http.get<string>(this.getStatusUrl);
  }

}
