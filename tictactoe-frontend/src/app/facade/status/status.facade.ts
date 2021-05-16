import {Injectable} from '@angular/core';
import {StatusApi} from "../../api/status/status.api";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class StatusFacade {

  private statusSubject = new BehaviorSubject<string>("IN_PROGRESS");
  public status$ = this.statusSubject.asObservable();

  constructor(private statusApi: StatusApi) {
  }

  public getStatus(): void {
    this.statusApi.getStatus().subscribe(value => this.statusSubject.next(value));
  }
}
