import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPublicaComponent } from './consulta-publica.component';

describe('ConsultaPublicaComponent', () => {
  let component: ConsultaPublicaComponent;
  let fixture: ComponentFixture<ConsultaPublicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPublicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
