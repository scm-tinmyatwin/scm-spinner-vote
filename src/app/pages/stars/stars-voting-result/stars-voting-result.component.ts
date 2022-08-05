import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/api/api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-stars-voting-result',
  templateUrl: './stars-voting-result.component.html',
  styleUrls: ['./stars-voting-result.component.scss'],
})
export class StarsVotingResultComponent implements OnInit, AfterViewInit {
  votingList$: Observable<any[]> | undefined;
  votingList: any = [];
  presenterList$: Observable<any[]> | undefined;
  presenterList: any = [];
  barChartList: any = [];
  starList: any = [];
  result: any[] = [];
  id: any;
  title: any;
  maxStars: any;
  loading = false;
  public barChartOptions!: ChartOptions;


  endVoting!: boolean;

  public barChartLabels = ['1 Star', '2 Star ', '3 Star'];
  public barChartType: ChartType = 'bar';
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

  public barChartData: ChartDataset[] = [];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')
    })
    this.getStarVotingList();
    this.getPresenterList();
    this.getBarChartOptions();
  }

  ngAfterViewInit() {
    fromEvent(window, 'resize').pipe(debounceTime(300))
      .subscribe(() => {
        console.log("re")
        this.getBarChartOptions();
      });
  }

  getBarChartOptions() {
    this.barChartOptions = {
      responsive: true,
      // legend: {
      //   display: false,
      //   labels: {
      //     fontSize: window.innerWidth < 768 ? Math.round(window.innerWidth / 64) : 20,
      //     fontColor: '#000000 ',
      //   }
      // },
      scales: {
        y: {
          beginAtZero: true,
          max: 50,
          ticks: {
            maxTicksLimit: 15,
            // fontColor: '#000000 ',
            callback: function (value, index, values) {
              return value;
            }
          }
        },
        // x: {
        //   ticks: {
        //     fontColor: '#000000 ',
        //   }
        // }
      }
    }
  }

  getStarVotingList() {
    this.loading = true;
    this.votingList$ = this.apiService.getStarVotingListByid(this.id);
    this.votingList$.subscribe((list) => {
      list.forEach((value) => {
        this.loading = false;
        this.title = value.title;
        this.endVoting = value.endVoting;
      });

    });
  }
  async getPresenterList() {
    this.loading = true;
    this.presenterList$ = await this.apiService.getPresenterList(this.id);
    this.presenterList$.subscribe((list) => {
      this.loading = false;
      this.presenterList = [];
      this.presenterList.push(list)
      this.getBarChartData(this.presenterList);
    })

  }

  getBarChartData(_presenterList: any) {
    this.barChartList = [];
    _presenterList[0].forEach((value: any, index: any) => {
      let maxList: any[] = [];
      this.barChartData = [];
      this.barChartData.push({
        data: [value.one_star, value.two_star, value.three_star],
        label: 'Votes ', backgroundColor: this.backgroundColor, hoverBackgroundColor: this.hoverBackground, barPercentage: 0.7
      });
      this.barChartList.push(this.barChartData)
      maxList.push({ star: '1 star', value: value.one_star })
      maxList.push({ star: '2 stars', value: value.two_star })
      maxList.push({ star: '3 stars', value: value.three_star })
      this.maxStars = this.barChartData[0].data;
      let maxStar = this.maxStars?.reduce((data1: any, data2: any) => Math.max(data1, data2));
      this.result[index] = maxList.filter((item: any) => item.value === maxStar);
    });
  }
}
