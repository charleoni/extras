import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormrangosComponent } from './formrangos.component';

describe('FormrangosComponent', () => {
  let component: FormrangosComponent;
  let fixture: ComponentFixture<FormrangosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormrangosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormrangosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
