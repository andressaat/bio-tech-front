import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoFisicaFormComponent } from './avaliacao-fisica-form.component';

describe('AvaliacaoFisicaFormComponent', () => {
  let component: AvaliacaoFisicaFormComponent;
  let fixture: ComponentFixture<AvaliacaoFisicaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliacaoFisicaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoFisicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
