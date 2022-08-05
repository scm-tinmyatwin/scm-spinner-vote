import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from 'src/app/api/api.service';
import { QuizListService } from 'src/app/services/quiz-list.service';

@Component({
  selector: 'app-quiz-register',
  templateUrl: './quiz-register.component.html',
  styleUrls: ['./quiz-register.component.scss']
})
export class QuizRegisterComponent implements OnInit {
  key: any;
  id: any;
  quizFormControl = new FormControl();

  quizForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    correct: new FormControl('', Validators.required),
  })

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private quizListService: QuizListService,
    private location: Location
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id')
    })
  }

  ngOnInit(): void {
  }

  register() {
    this.key = this.api.generateRandomString(16);
    if (this.quizForm.invalid) {
      return;
    } else {
      let registerList = {
        id: this.key,
        title: this.quizForm.value.title,
        desc: this.quizForm.value.description,
        correct: this.quizForm.value.correct,
        count: 0
      }
      let resp = this.quizListService.setOptionQuiz(this.id, this.key, registerList);
      if (resp) {
        this.location.back();
      }
    }
  }

}
