import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizListService {
  db: any;
  quizList$: Observable<any[]> | undefined;

  constructor(private firestore: AngularFirestore) { }

  getQuizList(): Observable<any> {
    return this.firestore.collection('quizVoting', ref => ref.orderBy('title')).valueChanges();
  }

  getQuizListById(_id: any): Observable<any> {
    return this.firestore.collection('quizVoting', ref => ref.where('id', '==', _id)).valueChanges();
  }

  getSubQuizList(quizId: any): Observable<any> {
    return this.firestore.collection('quizVoting/' + quizId + "/quizList", ref => ref.orderBy('title')).valueChanges();
  }

  setQuizList(key: any, list: any) {
    this.firestore.collection('quizVoting').doc(key).set(list);
    return 'success';
  }

  setOptionQuiz(quizId: any, key: any, list: any) {
    this.firestore.collection('quizVoting').doc(quizId).collection('quizList').doc(key).set(list);
    return 'success';
  }

  updateQuizList(_id: string, list: any) {
    const quizRef = this.firestore.collection('quizVoting');
    const response = quizRef.doc(_id).set(list, { merge: true });
    return response;
  }

  updateOptionList(quizId: any, _id: any, list: any) {
    return this.firestore.collection('quizVoting').doc(quizId).collection('quizList').doc(_id).set(list, { merge: true })
  }

  deleteQuizListByID(_id: any,) {
    const quizRef = this.firestore.collection('quizVoting');
    const response = quizRef.doc(_id).delete();
    return response;
  }

  deleteOptionQuizByID(quizId: any, _id: string) {
    return this.firestore.collection('quizVoting').doc(quizId).collection('quizList').doc(_id).delete();
  }
}
