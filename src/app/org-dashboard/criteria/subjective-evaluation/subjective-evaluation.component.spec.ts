import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectiveEvaluationComponent } from './subjective-evaluation.component';

describe('SubjectiveEvaluationComponent', () => {
  let component: SubjectiveEvaluationComponent;
  let fixture: ComponentFixture<SubjectiveEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectiveEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectiveEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
