import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TictactoeComponent} from './modules/tictactoe/tictactoe.component';
import {BoardComponent} from './modules/tictactoe/board/board.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DialogComponent} from './modules/tictactoe/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpErrorInterceptor} from "./modules/error/http-error.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    TictactoeComponent,
    BoardComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
