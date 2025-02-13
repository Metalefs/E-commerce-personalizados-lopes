import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComentarioComponent } from './card-comentario.component';

describe('CardComentarioComponent', () => {
  let component: CardComentarioComponent;
  let fixture: ComponentFixture<CardComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
