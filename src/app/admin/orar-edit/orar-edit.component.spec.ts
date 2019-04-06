import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrarEditComponent } from './orar-edit.component';

describe('OrarEditComponent', () => {
  let component: OrarEditComponent;
  let fixture: ComponentFixture<OrarEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrarEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
