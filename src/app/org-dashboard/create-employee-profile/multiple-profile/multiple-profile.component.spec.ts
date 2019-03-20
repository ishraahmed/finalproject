import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleProfileComponent } from './multiple-profile.component';

describe('MultipleProfileComponent', () => {
  let component: MultipleProfileComponent;
  let fixture: ComponentFixture<MultipleProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
