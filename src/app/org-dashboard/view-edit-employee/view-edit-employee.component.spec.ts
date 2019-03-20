import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditEmployeeComponent } from './view-edit-employee.component';

describe('ViewEditEmployeeComponent', () => {
  let component: ViewEditEmployeeComponent;
  let fixture: ComponentFixture<ViewEditEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
