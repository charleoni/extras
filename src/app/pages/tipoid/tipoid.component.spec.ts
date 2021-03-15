import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoidComponent } from './tipoid.component';

describe('TipoidComponent', () => {
  let component: TipoidComponent;
  let fixture: ComponentFixture<TipoidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
