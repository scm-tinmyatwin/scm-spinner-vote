import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxWheelModule } from 'ngx-wheel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxLoadingModule } from 'ngx-loading';
import { MatRadioModule } from '@angular/material/radio';
import { FilterPipe } from './interfaces/filter.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { SpinnerWheelComponent } from './pages/spinner-wheel/spinner-wheel.component';
import { StarsVotingRegisterComponent } from './pages/stars/stars-voting-register/stars-voting-register.component';
import { StarsVotingListComponent } from './pages/stars/stars-voting-list/stars-voting-list.component';
import { StarsVotingDetailComponent } from './pages/stars/stars-voting-detail/stars-voting-detail.component';
import { StarsVotingResultComponent } from './pages/stars/stars-voting-result/stars-voting-result.component';
import { LoginComponent } from './pages/stars/stars-voting-login/stars-voting-login.component';
import { AuthService } from './services/auth.service';
import { QuizListComponent } from './pages/quiz/quiz-list/quiz-list.component';
import { QuizDetailComponent } from './pages/quiz/quiz-detail/quiz-detail.component';
import { QuizRegisterComponent } from './pages/quiz/quiz-register/quiz-register.component';
import { QuizListUpdateComponent } from './pages/quiz/quiz-list-update/quiz-list-update.component';
import { QuizListDetailComponent } from './pages/quiz/quiz-list-detail/quiz-list-detail.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserRegisterComponent } from './pages/user/user-register/user-register.component';
import { AuthInterceptor } from './interceptors/auth-http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MessageDialogComponent,
    SpinnerWheelComponent,
    StarsVotingRegisterComponent,
    StarsVotingListComponent,
    StarsVotingDetailComponent,
    StarsVotingResultComponent,
    LoginComponent,
    QuizListComponent,
    QuizDetailComponent,
    QuizRegisterComponent,
    QuizListUpdateComponent,
    QuizListDetailComponent,
    FilterPipe,
    UserListComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxWheelModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatRadioModule,
    MatCheckboxModule,
    NgxLoadingModule,
    NgSelectModule,
    MatSelectModule
  ],
  providers: [DatePipe, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
