import {Injectable} from '@angular/core';
import {PointModel} from "../../models/point.model";
import {GameApi} from "../../api/game/game.api";
import {StatusFacade} from "../status/status.facade";

@Injectable({
  providedIn: 'root',
})
export class GameFacade {

  public player: string = "X";
  public board: string[] = [];

  constructor(private gameApi: GameApi, private statusFacade: StatusFacade) {
  }

  public setPoint(point: PointModel): void {
    this.gameApi.setPoint(point).subscribe(() => {
      this.getCurrentPlayer();
      this.statusFacade.getStatus();
    });
  }

  public getCurrentPlayer(): void {
    this.gameApi.getCurrentPlayer().subscribe(value => this.player = value);
  }

  public clearBoard(): void {
    this.gameApi.clearBoard().subscribe();
  }

  public getBoard(): void {
    this.gameApi.getBoard().subscribe(value => this.board = value);
  }
}
