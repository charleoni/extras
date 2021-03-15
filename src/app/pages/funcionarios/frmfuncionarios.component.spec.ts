import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmfuncionariosComponent } from './frmfuncionarios.component';

describe('FrmfuncionariosComponent', () => {
  let component: FrmfuncionariosComponent;
  let fixture: ComponentFixture<FrmfuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmfuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmfuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
