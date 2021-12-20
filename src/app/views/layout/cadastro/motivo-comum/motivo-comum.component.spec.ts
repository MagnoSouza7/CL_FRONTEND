import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoComumComponent } from './motivo-comum.component';

describe('MotivoComumComponent', () => {
  let component: MotivoComumComponent;
  let fixture: ComponentFixture<MotivoComumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoComumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoComumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
