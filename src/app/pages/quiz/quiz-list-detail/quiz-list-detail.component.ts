import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { QuizListService } from 'src/app/services/quiz-list.service';
import { PeriodicElement } from 'src/app/user';

@Component({
  selector: 'app-quiz-list-detail',
  templateUrl: './quiz-list-detail.component.html',
  styleUrls: ['./quiz-list-detail.component.scss']
})
export class QuizListDetailComponent implements OnInit {
  quizListById$: Observable<any[]> | undefined;
  quizListById: any = [];
  quizList: any = [];
  type: any;
  id: any;
  loading = false;

  displayedColumns: string[] = [
    'title',
    'description',
    'correct',
    'voteCount',
    'actions'
  ];
  dataSource: MatTableDataSource<PeriodicElement> | any;

  updateForm = new FormGroup({
    title: new FormControl('', Validators.required),
  })

  constructor(
    private quizListService: QuizListService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id')
      this.type = params.get('type');
    })
  }

  async ngOnInit() {
    await this.getQuizListById();
    await this.getSubQuizList();
  }

  async getQuizListById() {
    this.loading = true;
    this.quizListService.getQuizListById(this.id).subscribe((list) => {
      if (list.length > 0) {
        this.loading = false;
        this.quizList = list
        this.updateForm.controls['title'].setValue(this.quizList[0].title);
      }
      this.loading = false;
    });
  }

  async getSubQuizList() {
    this.loading = true;
    this.quizListById$ = this.quizListService.getSubQuizList(this.id);
    this.quizListById$.subscribe((list) => {
      this.quizListById = []
      list.forEach((value) => {
        this.quizListById.push(value);
        this.loading = false;
      });
      this.dataSource = new MatTableDataSource(this.quizListById);
    });
  }

  editList(_id: any) {
    this.router.navigate(['/quiz-list-edit', _id]);
  }

  deleteList(_id: any) {
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
      panelClass: 'layout-dialog',
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result?.event == 'doAction') {
        this.quizListService.deleteOptionQuizByID(this.id, _id)
      }
    });
  }

  registerList() {
    this.router.navigate(['/quiz-list-register', this.id]);
  }

  registerTitle() {
    let updateList = {
      endVoting: false,
      id: this.id,
      startTime: new Date(Date.now()),
      title: this.updateForm.value.title,
      votedUser: []
    }
    const result = this.quizListService.setQuizList(this.id, updateList)
    if (result === 'success') {
      localStorage.setItem('collectionId', this.id)
      this.dialog.open(MessageDialogComponent, {
        data: {
          title: "Infromation",
          message: 'New quiz was successfully added.And add quiz list.',
          secondBtnMsg: "OK"
        }
      });
    }
  }

  updateTitle() {
    let selectedList = this.quizList.filter((obj: any) => obj.id == this.id);
    let title = this.updateForm.value.title;
    let collectionId = selectedList[0].id
    this.quizListService.updateQuizList(collectionId, { title: title })
    this.router.navigate(['/quiz-list']);
  }
}
