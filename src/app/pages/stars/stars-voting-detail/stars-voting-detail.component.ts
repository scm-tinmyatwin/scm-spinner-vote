import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-stars-voting-detail',
  templateUrl: './stars-voting-detail.component.html',
  styleUrls: ['./stars-voting-detail.component.scss'],
})
export class StarsVotingDetailComponent implements OnInit {
  id: any;
  title: any;
  userName: any;
  votingList$: Observable<any[]> | undefined;
  votingList: any = [];
  presenterList$: Observable<any[]> | undefined;
  presenterList: any = [];
  loading = false;
  allSelected = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public datepipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')
    })
    this.getStarVotingList();
    this.getPresenterList();
  }

  async ngOnInit() {
  }

  getStarVotingList() {
    this.loading = true;
    this.votingList$ = this.apiService.getStarVotingListByid(this.id);
    this.votingList$.subscribe((list) => {
      this.votingList = [];
      list.forEach((value) => {
        this.votingList.push(value);
        this.loading = false;
      });
      this.title = this.votingList[0].title;
    },(error) => {
      console.log(error)
    });
  }

  getPresenterList() {
    this.loading = true;
    this.presenterList$ = this.apiService.getPresenterList(this.id);
    this.presenterList$.subscribe((list) => {
      this.presenterList = [];
      list.forEach((value) => {
        value.selectedStar = 0
        this.presenterList.push(value);
        this.loading = false;
      });
    },(error) => {
      console.log(error)
    });
  }

  setVoteStar(value: number, index: any) {
    this.presenterList[index].selectedStar = value;
    this.allSelected = this.presenterList.every((presenter: any) => presenter.selectedStar !== 0);
  }

  vote() {
    let message = "";
    this.presenterList.map((element: any, index: number) => {
      element.one_star = element.selectedStar === 1 ? element.one_star + 1 : element.one_star;
      element.two_star = element.selectedStar === 2 ? element.two_star + 1 : element.two_star;
      element.three_star = element.selectedStar === 3 ? element.three_star + 1 : element.three_star;
      message += `${element.name}(${element.selectedStar}${element.selectedStar === 1 ? 'star' : 'stars'})${this.presenterList.length - 1 === index ? '.' : ', '}`
    });
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: {
        title: 'Are You Sure?',
        message: 'Do you want to vote for ' + message,
        firstBtnMsg: 'Vote',
        secondBtnMsg: 'Cancel',
        status: 'star-vote',
        type: 'message',
      },
      autoFocus: false,
      panelClass: 'layout-dialog',
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result.event == 'doAction') {
        this.updateVotedUser();
      }
    });

  }

  updateVotedUser() {
    const userId = localStorage.getItem('user_id') || "";
    let votedList: string[] = [];
    //add voted user list
    if (this.votingList[0].votedUser.length == 0 && userId) {
      votedList.push(userId)
    } else {
      votedList = this.votingList[0].votedUser;
      const hasclientId = votedList.find((obj: any) => obj === userId);
      if (!hasclientId) {
        votedList.push(userId);
      }
    }
    this.presenterList.forEach((element: any) => {
      delete element.selectedStar;
      this.apiService.updatePresenterList(this.id, element.id, element)
    });
    this.apiService.updateStarVoting(this.id, { votedUser: votedList });
    this.router.navigate(['/voting-result', this.id]);
  }
}
