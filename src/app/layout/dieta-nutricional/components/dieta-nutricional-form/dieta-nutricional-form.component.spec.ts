import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaNutricionalFormComponent } from './dieta-nutricional-form.component';

describe('DietaNutricionalFormComponent', () => {
  let component: DietaNutricionalFormComponent;
  let fixture: ComponentFixture<DietaNutricionalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaNutricionalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaNutricionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
