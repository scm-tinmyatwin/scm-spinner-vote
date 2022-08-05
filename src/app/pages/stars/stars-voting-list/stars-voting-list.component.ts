import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../../../user';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stars-voting-list',
  templateUrl: './stars-voting-list.component.html',
  styleUrls: ['./stars-voting-list.component.scss'],
})
export class StarsVotingListComponent implements OnInit {
  votingList$: Observable<any[]> | undefined;
  votingList: any = [];
  currentUser: any;
  loading = false;

  displayedColumns: string[] = [
    'title',
    'userName',
    'startTime',
    'endVoting',
    'status',
    'detail',
    'actions'
  ];
  dataSource: MatTableDataSource<PeriodicElement> | any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.votingList$ = this.apiService.getStarVotingList();
    this.votingList$.subscribe((list) => {
      this.votingList = []
      list.forEach((value) => {
        value.user_id = value.user_id.toString();
        this.votingList.push(value);
        this.loading = false;
      });
      this.dataSource = new MatTableDataSource(this.votingList);
    });
    this.authService.loggedIn$.subscribe((data: { uid: string | null; }) => {
      const userId = data.uid || localStorage.getItem('user_id') || "";
      this.authService.getCurrentUser(userId).subscribe((data: string | any[]) => {
        if (data.length > 0) {
          this.currentUser = data[0];
        }
      });
    });
  }
  endVoting(_id: string): void {
    let selectedList = this.votingList.filter((obj: any) => obj.id == _id);
    let updateList = {
      endVoting: selectedList[0].endVoting = !selectedList[0].endVoting,
    };
    const resp = this.apiService.updateStarVoting(_id, updateList);
  }

  goDetail(_id: any) {
    localStorage.setItem('id', _id)
    this.router.navigate(['/voting-detail', _id]);
  }

  deleteVoteList(deleteId: any): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: {
        title: 'Are You Sure?',
        message: 'Do you want to delete this list?',
        firstBtnMsg: 'Delete',
        secondBtnMsg: 'Cancel',
        status: 'quiz',
        type: 'message',
      },
      autoFocus: false,
      panelClass: 'layout-dialog',
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result.event == 'doAction') {
        this.apiService.deleteVoteListByID(deleteId);
      }
    });
  }

  editVoteList(_id: any): void {
    this.router.navigate(['/voting', 'edit', _id]);
  }
}
