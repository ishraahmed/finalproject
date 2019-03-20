import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllEmplloyeeComponent } from './view-all-emplloyee.component';

describe('ViewAllEmplloyeeComponent', () => {
  let component: ViewAllEmplloyeeComponent;
  let fixture: ComponentFixture<ViewAllEmplloyeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllEmplloyeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllEmplloyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
