import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormturnosComponent } from './formturnos.component';

describe('FormturnosComponent', () => {
  let component: FormturnosComponent;
  let fixture: ComponentFixture<FormturnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormturnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
