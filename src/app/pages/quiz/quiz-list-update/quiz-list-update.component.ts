import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizListService } from 'src/app/services/quiz-list.service';
import { Location } from '@angular/common';

type NewType = Observable<any[]>;

@Component({
  selector: 'app-quiz-list-update',
  templateUrl: './quiz-list-update.component.html',
  styleUrls: ['./quiz-list-update.component.scss']
})
export class QuizListUpdateComponent implements OnInit {
  key: any;
  id: any;
  loading = false;
  quizFormControl = new FormControl();
  collectionId: any;
  quizListById$: NewType | undefined;
  quizListById: any = [];

  quizForm = new FormGroup({
    title: new FormControl(''),
    desc: new FormControl('', Validators.required),
    correct: new FormControl('', Validators.required),
  })

  constructor(
    private quizListService: QuizListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id')
    })
  }

  ngOnInit(): void {
    this.collectionId = localStorage.getItem('collectionId');
    this.getSubQuizList();
  }

  getSubQuizList() {
    this.loading = true;
    this.quizListById$ = this.quizListService.getSubQuizList(this.collectionId);
    this.quizListById$.subscribe((list: any) => {
      this.quizListById = []
      list.forEach((value: any) => {
        this.quizListById.push(value);
        this.loading = false;
      });
      let selectedList = this.quizListById.filter((obj: any) => obj.id == this.id);
      this.quizForm.controls['title'].setValue(selectedList[0].title);
      this.quizForm.controls['desc'].setValue(selectedList[0].desc);
      this.quizForm.controls['correct'].setValue(selectedList[0].correct);
    });
  }

  updateQuizList() {
    this.quizListService.updateOptionList(this.collectionId, this.id, this.quizForm.value);
    this.location.back();
  }
}
