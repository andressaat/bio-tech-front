import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoFormComponent } from './pagamento-form.component';

describe('PagamentoFormComponent', () => {
  let component: PagamentoFormComponent;
  let fixture: ComponentFixture<PagamentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
