import {Injectable} from '@angular/core';
import {StatusApi} from "../../api/status/status.api";

@Injectable({
  providedIn: 'root',
})
export class StatusFacade {

  public status: string = "IN_PROGRESS";

  constructor(private statusApi: StatusApi) {
  }

  public getStatus(): void {
    this.statusApi.getStatus().subscribe(value => this.status = value);
  }
}
