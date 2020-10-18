import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreinoStepperComponent } from './treino-stepper.component';

describe('TreinoStepperComponent', () => {
  let component: TreinoStepperComponent;
  let fixture: ComponentFixture<TreinoStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreinoStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreinoStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
