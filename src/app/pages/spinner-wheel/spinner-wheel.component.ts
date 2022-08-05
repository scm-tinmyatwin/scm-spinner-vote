import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { PeriodicElement } from '../../user';
import { ApiService } from 'src/app/api/api.service';
import { FilterPipe } from 'src/app/interfaces/filter.pipe';
import { Router } from '@angular/router';
import * as Constant from 'src/app/constants/group';

@Component({
  selector: 'app-spinner-wheel',
  templateUrl: './spinner-wheel.component.html',
  styleUrls: ['./spinner-wheel.component.scss'],
})
export class SpinnerWheelComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel: any;

  users$!: Observable<any[]>;
  arrayList: string[] = [];
  userList: any = [];
  itemList: any;
  isDisabled: any;
  item = 0;
  idToLandOn: any;
  items: any[] = [];
  groupList: any[] = [];
  loading = false;
  isSpinned = false;
  allChecked: boolean = true;
  isClosed: any;
  congratulationsEmoji = '../../assets/images/celebrate-party.png';
  spinArrow = '../../assets/images/spin-arrow.png';
  stars = '../../assets/images/stars.png';
  happySong = '../../assets/audio/alarm2.wav';
  selectAllGroup = true;

  filterPipe = new FilterPipe();

  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.CENTER;

  addNewUserForm = new FormGroup({
    newUser: new FormControl('', Validators.required),
  })

  colors: any = [
    '#0A7D8C',
    '#06B198',
    '#205A5D',
    '#1A555B',
    '#314254',
    '#468695',
    '#26C1C1',
    '#275F60',
    '#EAA34C',
    '#06B198',
    '#F25164',
    '#EE6C4D',
    '#FF827D',
    '#9586EC'
  ];

  displayedColumns: string[] = ['name', 'group', 'actions'];
  dataSource: MatTableDataSource<PeriodicElement> | any;

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private router: Router
  ) {
    this.getUserList();
    this.groupList = Constant.groupList;
  }

  ngOnInit(): void {
    setTimeout(async () => {
      this.wheel.reset();
    }, 3000);
  }

  getUserList() {
    this.loading = true;
    this.users$ = this.apiService.getUserList();
    this.users$.subscribe((users) => {
      this.item = users.length;
      this.userList = [];
      users.forEach((value) => {
        this.userList.push(value);
        this.loading = false;
      });
      this.itemList = this.userList;
      this.dataSource = new MatTableDataSource(this.itemList);
      if (this.router.url === '/spinner-wheel' || this.router.url === '/') {
        this.addDataToSpinner(this.itemList)
      }
    });
  }

  async addDataToSpinner(list: any) {
    let fontSize = '14';
    this.items = [];
    if (list.length <= 8) {
      fontSize = '18';
    } else if (list.length > 8 && list.length <= 16) {
      fontSize = '15';
    }
    list.forEach((value: any, id: any) => {
      if (value.selected == true) {
        this.items.push({
          fillStyle:
            this.colors[Math.floor(Math.random() * this.colors.length)],
          text: `${value.name}`,
          textFontFamily: 'Courier',
          id: value.name,
          textFillStyle: '#ffffff',
          textFontSize: fontSize,
          'textAlignment': 'inner',
          'textMargin': 80,
        })
      }
    }
    );
    if (this.items.length > 0) {
      this.idToLandOn =
        this.items[Math.floor(Math.random() * this.items.length)].id;
    }
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.wheel.reset();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByGroup(index: number) {
    if (!this.isSpinned) {
      this.groupList[index].selected = !this.groupList[index].selected;
      this.selectAllGroup = this.groupList.every(group => group.selected)
      const fiteredArr = this.filterPipe.transform(this.userList, this.groupList);
      this.itemList = fiteredArr;
      this.dataSource = new MatTableDataSource(fiteredArr);
      this.addDataToSpinner(fiteredArr)
    }
  }

  async spin() {
    this.isSpinned = true;
    if (this.items.length > 1) {
      this.isDisabled = true;
      this.idToLandOn =
        this.items[Math.floor(Math.random() * this.items.length)].id;
      await new Promise((resolve) => setTimeout(resolve, 0));
      this.wheel.spin();
    } else {
      this.isDisabled = false;
      this.isSpinned = false;
      this.dialog.open(MessageDialogComponent, {
        width: '400px',
        data: {
          title: 'Cannot spin the wheel.',
          message: 'At least, two users should have!',
          secondBtnMsg: 'OK',
          type: 'message',
        },
        panelClass: 'layout-dialog',
      });
    }
  }
  playAudio() {
    let audio = new Audio();
    audio.src = this.happySong;
    audio.load();
    audio.play();
  }

  async after() {
    this.isSpinned = false;
    this.isDisabled = false;
    this.playAudio();
    setTimeout(async () => {
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        width: '400px',
        data: {
          title: 'Congratulations',
          message: 'The winner is ',
          winner: this.idToLandOn,
          congraEmoji: this.congratulationsEmoji,
          firstBtnMsg: 'Remove User',
          secondBtnMsg: 'OK',
          status: 'spinner',
          type: 'message',
        },
        autoFocus: false,
        panelClass: 'layout-dialog',
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result?.event == 'doAction') {
          this.itemList.filter((obj: any) => {
            if (obj.name == this.idToLandOn) {
              obj.selected = !obj.selected;
            }
          });
          this.addDataToSpinner(this.itemList)
          this.dataSource = new MatTableDataSource(this.itemList);
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
        this.wheel.reset();
      });
    }, 1000);
  }

  async AddAllUser(all: boolean) {
    if (!this.isSpinned) {
      this.selectAllGroup = !this.selectAllGroup;
      if (this.selectAllGroup) {
        this.groupList.map(group => group.selected = true)
        this.itemList = this.userList;
        this.dataSource = new MatTableDataSource(this.userList);
        this.addDataToSpinner(this.userList)
      } else {
        this.groupList.map(group => group.selected = false)
        this.itemList = [];
        this.dataSource = new MatTableDataSource([]);
        this.addDataToSpinner([])
      }
    
    }
  }

  addNewUser() {
    let randomString = this.apiService.generateRandomString(16);
    this.itemList =[{
      amount: 0,
      group: "Others",
      id: randomString,
      isChanged: true,
      name: this.addNewUserForm.value.newUser,
      profile: "",
      selected: true,
      type: "user"
    }].concat(this.itemList)
    this.dataSource = new MatTableDataSource(this.itemList);
    this.addNewUserForm.reset();
    this.addDataToSpinner(this.itemList)
  }

  onChange(event: any, item: any) {

    this.allChecked = false;
    item.selected = !item.selected;
    this.itemList.filter((obj: any) => {
      if (obj.id == item.id) {
        obj.selected = item.selected;
      }
    });
    let selectedList = this.itemList.filter((obj: any) => obj.selected === true);
    this.allChecked = selectedList.length == this.itemList.length ? true : false;
    this.dataSource = new MatTableDataSource(this.itemList);
    this.addDataToSpinner(selectedList)
  }

  setAll(selected: boolean) {
    this.allChecked = selected;
    this.itemList.forEach((value: any) => value.selected = selected);
    this.addDataToSpinner(this.itemList)
  }

  deleteUserList(_id: any) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: {
        title: 'Are You Sure?',
        message: 'Do you want to delete this list?',
        firstBtnMsg: 'Delete',
        secondBtnMsg: 'Cancel',
        status: 'spinner',
        type: 'message',
      },
      autoFocus: false,
      panelClass: 'layout-dialog',
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result?.event == 'doAction') {
        this.itemList = this.itemList.filter((obj: any) => obj.id !== _id);
        this.dataSource = new MatTableDataSource(this.itemList);
        this.addDataToSpinner(this.itemList)
      }
    });

  }
}
