import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeProfileComponent } from './create-employee-profile.component';

describe('CreateEmployeeProfileComponent', () => {
  let component: CreateEmployeeProfileComponent;
  let fixture: ComponentFixture<CreateEmployeeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmployeeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
