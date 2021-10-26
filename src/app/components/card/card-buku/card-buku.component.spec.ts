import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBukuComponent } from './card-buku.component';

describe('CardBukuComponent', () => {
  let component: CardBukuComponent;
  let fixture: ComponentFixture<CardBukuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBukuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBukuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
