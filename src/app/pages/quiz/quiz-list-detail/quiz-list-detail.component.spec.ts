import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListDetailComponent } from './quiz-list-detail.component';

describe('QuizListDetailComponent', () => {
  let component: QuizListDetailComponent;
  let fixture: ComponentFixture<QuizListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizListDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
