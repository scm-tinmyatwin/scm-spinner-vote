import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  db: any;
  votingList$: Observable<any[]> | undefined;
  userList$: Observable<any[]> | undefined;

  constructor(private firestore: AngularFirestore) { }

  generateRandomString(length: any) {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  // User List
  getUserList(): Observable<any> {
    return this.firestore.collection('users', ref => ref.orderBy('name')).valueChanges();
  }

  setUserList(key: any, list: any) {
    this.firestore.collection('users').doc(key).set(list);
    return 'success';
  }

  getUserById(_id: string): Observable<any> {
    return this.firestore.collection('users', ref => ref.where('id', '==', _id)).valueChanges();
  }

  updateUserList(_id: string, list: any) {
    const userRef = this.firestore.collection('users');
    const response = userRef.doc(_id).set(list, { merge: true });
    return response;
  }

  deleteUserListById(_id: string) {
    const userRef = this.firestore.collection('users');
    const response = userRef.doc(_id).delete();
    return response;
  }

  // Start Voting
  setStarVoting(key: any, list: any) {
    this.firestore.collection('starVoting').doc(key).set(list);
    return 'success';
  }

  getStarVotingList(): Observable<any> {
    return this.firestore.collection('starVoting', ref => ref.orderBy('title')).valueChanges();
  }

  getStarVotingListByid(_id: string): Observable<any> {
    return this.firestore.collection('starVoting', ref => ref.where('id', '==', _id)).valueChanges();
  }

  updateStarVoting(_id: string, list: any) {
    const votingRef = this.firestore.collection('starVoting');
    const response = votingRef.doc(_id).set(list, { merge: true });
    return response;
  }

  deleteVoteListByID(_id: string) {
    const votingRef = this.firestore.collection('starVoting');
    const response = votingRef.doc(_id).delete();
    return response;
  }

  //Sub collection Presenter List

  getPresenterList(presenterId: any): Observable<any> {
    return this.firestore.collection('starVoting/' + presenterId + "/presenterList").valueChanges();
  }

  setPresenterList(presenterId: any, key: any, list: any) {
    this.firestore.collection('starVoting').doc(presenterId).collection("/presenterList").doc(key).set(list);
    return 'success';
  }

  updatePresenterList(presenterId: any, _id: any, list: any) {
    return this.firestore.collection('starVoting').doc(presenterId).collection("/presenterList").doc(_id).set(list, { merge: true })
  }

  deletePresenterListByID(presenterId: any, _id: string) {
    return this.firestore.collection('starVoting').doc(presenterId).collection("/presenterList").doc(_id).delete();
  }
}
