import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreVendaComponent } from './pre-venda.component';

describe('PreVendaComponent', () => {
  let component: PreVendaComponent;
  let fixture: ComponentFixture<PreVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
