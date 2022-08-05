import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListUpdateComponent } from './quiz-list-update.component';

describe('QuizListUpdateComponent', () => {
  let component: QuizListUpdateComponent;
  let fixture: ComponentFixture<QuizListUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizListUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
