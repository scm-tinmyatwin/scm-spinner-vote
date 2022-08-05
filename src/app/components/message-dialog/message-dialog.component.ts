import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../../interfaces/interface';

type NewType = DialogData;
@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent implements OnInit {
  stars = '../../assets/images/stars.png';
  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewType,
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  public closeMe() {
    this.dialogRef.close({ event: 'Closed' });
  }

  public doAction() {
    this.dialogRef.close({ event: 'doAction' });
  }
}
