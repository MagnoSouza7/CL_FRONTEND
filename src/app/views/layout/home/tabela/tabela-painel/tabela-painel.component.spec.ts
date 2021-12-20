import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPainelComponent } from './tabela-painel.component';

describe('TabelaPainelComponent', () => {
  let component: TabelaPainelComponent;
  let fixture: ComponentFixture<TabelaPainelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaPainelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
