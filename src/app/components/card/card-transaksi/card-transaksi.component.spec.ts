import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTransaksiComponent } from './card-transaksi.component';

describe('CardTransaksiComponent', () => {
  let component: CardTransaksiComponent;
  let fixture: ComponentFixture<CardTransaksiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTransaksiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
