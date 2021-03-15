import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtipoidComponent } from './formtipoid.component';

describe('FormtipoidComponent', () => {
  let component: FormtipoidComponent;
  let fixture: ComponentFixture<FormtipoidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormtipoidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtipoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
