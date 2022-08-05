import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/api/api.service';
import * as Constant from 'src/app/constants/group';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  users$!: Observable<any[]>;
  userList: any = [];
  itemList: any;
  filteredName: Observable<string[]> | undefined;
  typeList: any;
  groupList: any;
  key: any;
  type: any;
  id: any;
  loading = false;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    group: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    id: new FormControl(''),
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
    this.typeList = Constant.typeList;
    this.groupList = Constant.groupList;
    this.getUserList();
  }

  ngOnInit() { }

  private getUserList() {
    this.loading = true;
    this.users$ = this.api.getUserList();
    this.users$.subscribe((users) => {
      this.userList = []
      users.forEach((value) => {
        this.userList.push(value);
        this.loading = false;
      });
      this.itemList = this.userList;
      if (this.type == 'edit') {
        this.filterUserListById(this.itemList);
      }
    });
  }


  private filterUserListById(_itemList: any) {
    let selectedList = _itemList.filter((obj: any) => obj.id == this.id);
    if (selectedList.length !== 0) {
      this.userForm.controls['name'].setValue(selectedList[0].name);
      this.userForm.controls['group'].setValue(selectedList[0].group);
      this.userForm.controls['type'].setValue(selectedList[0].type);
      this.userForm.controls['id'].setValue(selectedList[0].id);
    }
  }

  register() {
    this.key = this.api.generateRandomString(16);
    if (this.userForm.invalid) {
      return;
    } else {
      this.api.setUserList(this.key, {
        id: this.key,
        group: this.userForm.value.group,
        amount: 0,
        isChanged: true,
        name: this.userForm.value.name,
        profile: '',
        selected: true,
        type: this.userForm.value.type
      });
      this.router.navigateByUrl('/user-list');
    }
  }

  update() {
    if (this.userForm.controls['name'].valueChanges) {
      this.api.deleteUserListById(this.id)
      this.api.setUserList(this.userForm.value.id, {
        id: this.userForm.value.id,
        group: this.userForm.value.group,
        amount: 0,
        isChanged: true,
        name: this.userForm.value.name,
        profile: '',
        selected: true,
        type: this.userForm.value.type
      });
    } else {
      let updateForm = {
        name: this.userForm.value.name,
        group: this.userForm.value.group,
        type: this.userForm.value.type,
      }
      this.api.updateUserList(this.id, updateForm)
    }
    this.router.navigateByUrl('/user-list');
  }
}