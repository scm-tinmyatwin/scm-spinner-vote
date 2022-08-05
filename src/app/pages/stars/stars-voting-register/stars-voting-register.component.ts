import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-stars-voting-register',
  templateUrl: './stars-voting-register.component.html',
  styleUrls: ['./stars-voting-register.component.scss'],
})
export class StarsVotingRegisterComponent implements OnInit {
  users$!: Observable<any[]>;
  userList: any = [];
  votingList$: Observable<any[]> | undefined;
  votingList: any = [];
  presenterList$: Observable<any[]> | undefined;
  presenterList: any = [];
  itemList: any;
  voteFormControl = new FormControl();
  filteredName: Observable<string[]> | undefined;
  selectedValue: any;
  key: any;
  type: any;
  id: any;
  loading = false;
  multiple = true;

  voteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    username: new FormControl([]),
  });

  currentTime = new Date(Date.now());
  constructor(
    public api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.type = params.get('type');
      this.id = params.get('id');
    })
    this.getUserList();
    if (this.type == 'edit') {
      this.filterVotingListById();
    }
  }

  ngOnInit() { }

  private getUserList() {
    this.loading = true;
    this.users$ = this.api.getUserList();
    this.users$.subscribe((users) => {
      users.forEach((value) => {
        this.userList.push(value);
        this.loading = false;
      });
      this.itemList = this.userList;
    });
  }

  private filterVotingListById() {
    this.loading = true;
    this.votingList$ = this.api.getStarVotingList();
    this.votingList$.subscribe((list) => {
      this.votingList = []
      list.forEach((value) => {
        this.votingList.push(value);
        this.loading = false;
      });
      let selectedList = this.votingList.filter((obj: any) => obj.id == this.id);
      if (selectedList.length !== 0) {
        this.voteForm.controls['title'].setValue(selectedList[0].title);
        this.getPresenterList(selectedList[0].id)
      }
    });
  }

  private getPresenterList(_id: string) {
    this.loading = true;
    this.presenterList$ = this.api.getPresenterList(_id);
    this.presenterList$.subscribe((list) => {
      this.loading = false;
      this.voteForm.controls['username'].setValue(list);
    });
  }

  register() {
    let presenterList: any[] = [];
    this.voteForm.value.username.forEach((value: any) => {
      presenterList.push(value.name)
    });
    this.key = this.api.generateRandomString(16);
    if (this.voteForm.invalid) {
      return;
    } else {
      let resp = this.api.setStarVoting(this.key, {
        id: this.key,
        endVoting: false,
        startTime: this.currentTime,
        title: this.voteForm.value.title,
        user_id: presenterList,
        votedUser: [],
      });
      this.voteForm.value.username.forEach((value: any) => {
        this.addPresenterList(value.name, this.key);
      });
      this.router.navigateByUrl('/voting-list');
    }
  }

  addPresenterList(presenterName: string, _id: string) {
    let key = this.api.generateRandomString(16);
    let registerList = {
      id: key,
      one_star: 0,
      two_star: 0,
      three_star: 0,
      name: presenterName,
    }
    this.api.setPresenterList(_id, key, registerList);
  }
  update() {
    let presenterList: any[] = [];
    this.voteForm.value.username.forEach((value: any) => {
      presenterList.push(value.name)
    });
    let updateForm = {
      title: this.voteForm.value.title
    }
    this.api.updateStarVoting(this.id, updateForm)
    this.router.navigateByUrl('/voting-list');
  }
}
