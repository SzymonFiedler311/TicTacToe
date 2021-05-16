import {Injectable} from '@angular/core';
import {PointModel} from "../../models/point.model";
import {PlayerEnum} from "../../models/player.model";
import {GameApi} from "../../api/game/game.api";
import {StatusFacade} from "../status/status.facade";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GameFacade {

  private boardSubject = new BehaviorSubject<string[]>([]);
  public board$ = this.boardSubject.asObservable();

  private playerSubject = new BehaviorSubject<string>(PlayerEnum.X);
  public player$ = this.playerSubject.asObservable();

  public tempPoint: PointModel = {coordinates: -1};

  constructor(private gameApi: GameApi, private statusFacade: StatusFacade) {
  }

  public setPoint(): void {
    this.playerSubject.next(this.playerSubject.value == PlayerEnum.X ? PlayerEnum.O : PlayerEnum.X);
    this.gameApi.setPoint(this.tempPoint).subscribe(() => {
      this.getCurrentPlayer();
      this.statusFacade.getStatus();
    });
  }

  public getCurrentPlayer(): void {
    this.gameApi.getCurrentPlayer().subscribe(value => this.playerSubject.next(value));
  }

  public resetGame(): void {
    this.gameApi.resetGame().subscribe(() => {
      this.getCurrentPlayer();
      this.getBoard();
    });
  }

  public getBoard(): void {
    this.gameApi.getBoard().subscribe(value => this.boardSubject.next(value));
  }
}
