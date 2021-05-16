import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  onErrorCaught(snackRef: MatSnackBar, error: string): void {
    snackRef.open(error, 'OK', {duration: 3000})
  }
}
