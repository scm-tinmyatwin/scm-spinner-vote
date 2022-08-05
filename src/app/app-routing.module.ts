import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerWheelComponent } from './pages/spinner-wheel/spinner-wheel.component';
import { StarsVotingRegisterComponent } from './pages/stars/stars-voting-register/stars-voting-register.component';
import { StarsVotingListComponent } from './pages/stars/stars-voting-list/stars-voting-list.component';
import { StarsVotingDetailComponent } from './pages/stars/stars-voting-detail/stars-voting-detail.component';
import { StarsVotingResultComponent } from './pages/stars/stars-voting-result/stars-voting-result.component';
import { VotingGuard } from './auth/vote.guard';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/stars/stars-voting-login/stars-voting-login.component';

import { QuizListComponent } from './pages/quiz/quiz-list/quiz-list.component';
import { QuizDetailComponent } from './pages/quiz/quiz-detail/quiz-detail.component';
import { QuizListDetailComponent } from './pages/quiz/quiz-list-detail/quiz-list-detail.component';
import { QuizRegisterComponent } from './pages/quiz/quiz-register/quiz-register.component';
import { QuizListUpdateComponent } from './pages/quiz/quiz-list-update/quiz-list-update.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserRegisterComponent } from './pages/user/user-register/user-register.component';

const routes: Routes = [
  { path: '', component: SpinnerWheelComponent },
  { path: 'spinner-wheel', component: SpinnerWheelComponent },
  { path: 'login', component: LoginComponent },

  // Voting-list
  { path: 'voting/:type/:id', component: StarsVotingRegisterComponent, canActivate: [AuthGuard] },
  { path: 'voting-list', component: StarsVotingListComponent, canActivate: [AuthGuard] },
  { path: 'voting-detail/:id', component: StarsVotingDetailComponent, canActivate: [AuthGuard, VotingGuard] },
  { path: 'voting-result/:id', component: StarsVotingResultComponent, canActivate: [AuthGuard] },

  // Quiz-list
  { path: 'quiz-list', component: QuizListComponent, canActivate: [AuthGuard] },
  { path: 'quiz-detail/:id', component: QuizDetailComponent, canActivate: [AuthGuard] },
  { path: 'quiz-list/:type/:id', component: QuizListDetailComponent, canActivate: [AuthGuard] },
  { path: 'quiz-list-register/:id', component: QuizRegisterComponent, canActivate: [AuthGuard] },
  { path: 'quiz-list-edit/:id', component: QuizListUpdateComponent, canActivate: [AuthGuard] },

  // User-list
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user/:type/:id', component: UserRegisterComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/spinner-wheel', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
