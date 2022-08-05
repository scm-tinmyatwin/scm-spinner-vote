import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChartType, ChartOptions } from 'chart.js';
// services
import { QuizListService } from 'src/app/services/quiz-list.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  quizList$: Observable<any[]> | undefined;
  quizList: any = [];
  quizListById$: Observable<any[]> | undefined;
  quizListById: any = [];
  votedUser: any = [];
  selectedList: any;
  id: any;
  title: any;
  isDisabled = false;
  isEndVoting = false;
  loading = false;
  correctTitle: any = '';
  public barChartType: ChartType = 'bar';

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          maxTicksLimit: 15,
          callback: function (value, index, values) {
            return value;
          }
        }
      },
    }
  }

  public barChartLabels = [];
  public barChartLegend = true;
  public barChartPlugins = [];

  private backgroundColor = [
    'rgb(77, 0, 90)',
    'rgba(255, 99, 13)',
    'rgb(219, 30 ,191)'
  ];
  private hoverBackground = [
    'rgb(172, 36, 195)',
    'rgb(251 ,168, 122)',
    'rgb(217, 128 ,204)',
  ]

  public barChartData = [
    { data: [], label: 'Votes ', backgroundColor: this.backgroundColor, hoverBackgroundColor: this.hoverBackground, barPercentage: 0.7 },
  ];

  constructor(
    private quizListService: QuizListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id')
    })
  }

  async ngOnInit() {
    await this.getQuizListById();
    await this.getSubQuizList();
  }

  async getQuizListById() {
    this.loading = true;
    this.quizList$ = this.quizListService.getQuizListById(this.id);
    this.quizList$.subscribe((list) => {
      this.quizList = []
      list.forEach((value) => {
        this.quizList.push(value);
        this.loading = false;
      });
      const userId = localStorage.getItem('user_id') || "";
      this.selectedList = this.quizList.filter((obj: any) => obj.id == this.id);
      if (this.selectedList[0]?.votedUser?.find((obj: any) => obj == userId)) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
      this.isEndVoting = this.selectedList[0].endVoting;
      this.title = this.selectedList[0].title;
    });
  }

  async getSubQuizList() {
    this.loading = true;
    let lastAnswer = '';
    this.quizListById$ = this.quizListService.getSubQuizList(this.id);
    this.quizListById$.subscribe((list) => {
      this.quizListById = []
      list.forEach((value) => {
        this.quizListById.push(value);
        this.loading = false;
      });
      this.barChartData[0].data = [];
      this.barChartLabels = [];
      this.quizListById.forEach((value: any) => {
        this.barChartData[0].data?.push(value.count);
        this.barChartLabels.push(value.title)
      });
      let titleList = this.quizListById.filter((obj: any) => obj.correct == 'true');
      if (titleList.length > 0) {
        lastAnswer = titleList[titleList.length - 1].title;
      }
      titleList.forEach((element: any) => {
        if (element.title !== lastAnswer) {
          this.correctTitle += element.title + ' and ';
        }
      });
      this.correctTitle += lastAnswer + " .";
    });
  }

  submitVote(count: any, _id: any) {
    //add voted user list
    const userId = localStorage.getItem('user_id') || ""
    if (this.selectedList[0].votedUser.length == 0) {
      this.votedUser.push(userId)
    } else {
      this.selectedList[0].votedUser.forEach((element: any) => {
        this.votedUser.push(element)
      });
      this.votedUser.push(userId)
    }
    let updateList = {
      votedUser: this.votedUser
    };
    count += 1;
    this.quizListService.updateQuizList(this.id, updateList);
    this.quizListService.updateOptionList(this.id, _id, { count: count }).then(data => {
      this.isDisabled = true;
      this.router.navigate(['/quiz-list']);
    });
  }
}
