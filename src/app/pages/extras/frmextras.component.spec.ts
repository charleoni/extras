import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmextrasComponent } from './frmextras.component';

describe('FrmextrasComponent', () => {
  let component: FrmextrasComponent;
  let fixture: ComponentFixture<FrmextrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmextrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmextrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
