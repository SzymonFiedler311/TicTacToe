import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameFacade} from "../../../facade/game/game.facade";
import {Subscription} from "rxjs";
import {PlayerEnum} from "../../../models/player.model";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnDestroy, OnInit {
  private player: string = PlayerEnum.X;
  board: string[] = [];
  private playerSubscription: Subscription | undefined;
  private boardSubscription: Subscription | undefined;

  constructor(private readonly gameFacade: GameFacade) {
  }

  ngOnInit(): void {
    this.playerSubscription = this.gameFacade.player$.subscribe(player => this.player = player);
    this.boardSubscription = this.gameFacade.board$.subscribe(board => this.board = board);
    this.gameFacade.getCurrentPlayer();
    this.gameFacade.getBoard();
  }

  setTempPoint(boardCell: number) {
    this.clearPreviousSelection(boardCell);
    if (!this.board[boardCell]) {
      this.gameFacade.tempPoint = {
        coordinates: boardCell
      };
      this.board[boardCell] = this.player;
    }
  }

  private clearPreviousSelection(boardCell: number) {
    let coordinates = this.gameFacade.tempPoint.coordinates;
    if (boardCell !== coordinates) {
      this.board[coordinates] = '';
    }
  }

  ngOnDestroy(): void {
    this.playerSubscription?.unsubscribe();
    this.boardSubscription?.unsubscribe();
  }
}
