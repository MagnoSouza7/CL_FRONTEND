import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoPerdaComponent } from './motivo-perda.component';

describe('MotivoPerdaComponent', () => {
  let component: MotivoPerdaComponent;
  let fixture: ComponentFixture<MotivoPerdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoPerdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoPerdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
