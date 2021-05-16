import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PointModel} from "../../models/point.model";

@Injectable({
  providedIn: 'root',
})
export class GameApi {

  private readonly setPointUrl = environment.apiUrl + '/setPoint';
  private readonly getCurrentPlayerUrl = environment.apiUrl + '/getPlayer';
  private readonly resetGameUrl = environment.apiUrl + '/resetGame';
  private readonly getBoardUrl = environment.apiUrl + '/getBoard';

  constructor(private http: HttpClient) {
  }

  public setPoint(point: PointModel): Observable<void> {
    return this.http.post<void>(this.setPointUrl, point);
  }

  public getCurrentPlayer(): Observable<string> {
    return this.http.get<string>(this.getCurrentPlayerUrl);
  }

  public resetGame(): Observable<void> {
    return this.http.get<void>(this.resetGameUrl);
  }

  public getBoard(): Observable<string[]> {
    return this.http.get<string[]>(this.getBoardUrl);
  }
}
