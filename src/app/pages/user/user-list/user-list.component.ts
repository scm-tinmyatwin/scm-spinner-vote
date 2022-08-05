import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { PeriodicElement } from '../../../user';
import { ApiService } from 'src/app/api/api.service';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: any = [];
  currentUser: any;
  loading = false;

  displayedColumns: string[] = [
    'no',
    'name',
    'type',
    'group',
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
    this.getUserList();
  }

  getUserList() {
    this.loading = true;
    this.apiService.getUserList().subscribe(data => {
      this.userList = data;
      this.dataSource = new MatTableDataSource(this.userList);
      this.loading = false;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUserList(deleteId: any): void {
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
      if (result?.event == 'doAction') {
        this.apiService.deleteUserListById(deleteId);
      }
    });
  }

  editUserList(_id: any): void {
    this.router.navigate(['/user', 'edit', _id]);
  }
}
