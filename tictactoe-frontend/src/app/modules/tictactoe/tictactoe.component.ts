import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameFacade} from "../../facade/game/game.facade";
import {StatusFacade} from "../../facade/status/status.facade";
import {DialogComponent} from "./dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {PlayerEnum} from "../../models/player.model";

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit, OnDestroy {
  private statusSubscription: Subscription | undefined;
  private playerSubscription: Subscription | undefined;
  private player: string = PlayerEnum.X;

  constructor(private readonly gameFacade: GameFacade,
              private readonly statusFacade: StatusFacade,
              private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.playerSubscription = this.gameFacade.player$.subscribe(player => this.player = player);
    this.statusSubscription = this.statusFacade.status$.subscribe(status => this.createDialog(status));
    this.statusFacade.getStatus();
    this.gameFacade.getCurrentPlayer();
  }

  createDialog(status: string): void {
    if (status === "WON") {
      this.openDialog(this.player + ' won');
    } else if (status === "DRAW") {
      this.openDialog('Draw');
    }
  }

  ngOnDestroy(): void {
    this.statusSubscription?.unsubscribe();
    this.playerSubscription?.unsubscribe();
  }

  private openDialog(message: string): void {
    let dialogRef = this.dialog.open(DialogComponent, {data: message});
    dialogRef.afterClosed().subscribe(() => {
      this.resetBoard();
    });
  }

  setPoint(): void {
    this.gameFacade.setPoint();
    this.gameFacade.tempPoint.coordinates = -1;
  }

  resetBoard(): void {
    this.gameFacade.resetGame();
  }
}
