import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaNutricionalComponent } from './dieta-nutricional.component';

describe('DietaNutricionalComponent', () => {
  let component: DietaNutricionalComponent;
  let fixture: ComponentFixture<DietaNutricionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaNutricionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaNutricionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
