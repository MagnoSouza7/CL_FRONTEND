import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioEditalComponent } from './comentario-edital.component';

describe('ComentarioEditalComponent', () => {
  let component: ComentarioEditalComponent;
  let fixture: ComponentFixture<ComentarioEditalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarioEditalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioEditalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
