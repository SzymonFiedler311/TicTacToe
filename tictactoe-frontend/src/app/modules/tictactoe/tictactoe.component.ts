import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameFacade} from "../../facade/game/game.facade";
import {StatusFacade} from "../../facade/status/status.facade";
import {DialogComponent} from "./dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit, OnDestroy {
  private statusSubscription: Subscription | undefined;
  private playerSubscription: Subscription | undefined;
  private player: string = '';


  constructor(private readonly gameFacade: GameFacade,
              private readonly statusFacade: StatusFacade,
              private readonly dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.statusSubscription?.unsubscribe();
    this.playerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.playerSubscription = this.gameFacade.player$.subscribe(player => this.player = player);
    this.statusSubscription = this.statusFacade.status$.subscribe(status => {
      if (status === "WON") {
          this.openDialog(this.player + ' won');
      } else if (status === "DRAW") {
        this.openDialog('Draw');
      }
    });
    this.statusFacade.getStatus();
    this.gameFacade.getCurrentPlayer();
  }

  openDialog(message: string) {
    let dialogRef = this.dialog.open(DialogComponent, {data: message});
    dialogRef.afterClosed().subscribe(() => {
      this.resetBoard();
    });
  }

  setPoint() {
    this.gameFacade.setPoint();
    this.gameFacade.tempPoint.coordinates = -1;
  }

  resetBoard() {
    this.gameFacade.resetGame();
  }
}
