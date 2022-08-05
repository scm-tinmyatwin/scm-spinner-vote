import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

import { QuizListService } from 'src/app/services/quiz-list.service';
import { PeriodicElement } from 'src/app/user';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  quizList$: Observable<any[]> | undefined;
  quizList: any = [];
  currentUser: any;
  loading = false;

  displayedColumns: string[] = [
    'title',
    'startTime',
    'status',
    'endVoting',
    'detail',
    'actions'
  ];
  dataSource: MatTableDataSource<PeriodicElement> | any;

  constructor(
    private quizListService: QuizListService,
    private router: Router,
    private dialog: MatDialog,
    private apiService: ApiService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.quizList$ = this.quizListService.getQuizList();
    this.quizList$.subscribe((list) => {
      this.quizList = []
      list.forEach((value) => {
        this.quizList.push(value);
        this.loading = false;
      });
      this.dataSource = new MatTableDataSource(this.quizList);
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

  goDetail(_id: any) {
    this.router.navigate(['/quiz-detail', _id]);
  }

  goQuizListEdit(_id: any) {
    localStorage.setItem('collectionId', _id)
    this.router.navigate(['/quiz-list', 'edit', _id]);
  }

  deleteQuizList(_id: any) {
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
        this.quizListService.deleteQuizListByID(_id);
      }
    });
  }

  registerList() {
    this.router.navigate(['/quiz-list', 'register', this.apiService.generateRandomString(16)]);
  }

  endVoting(_id: string): void {
    let selectedList = this.quizList.filter((obj: any) => obj.id == _id);
    let updateList = {
      endVoting: selectedList[0].endVoting = !selectedList[0].endVoting,
    };
    this.quizListService.updateQuizList(_id, updateList);
  }
}
