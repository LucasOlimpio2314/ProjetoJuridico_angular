import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProcessos } from './lista-processos';

describe('ListaProcessos', () => {
  let component: ListaProcessos;
  let fixture: ComponentFixture<ListaProcessos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProcessos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProcessos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
