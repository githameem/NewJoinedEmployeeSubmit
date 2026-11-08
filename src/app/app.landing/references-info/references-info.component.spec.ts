import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesInfoComponent } from './references-info.component';

describe('ReferencesInfoComponent', () => {
  let component: ReferencesInfoComponent;
  let fixture: ComponentFixture<ReferencesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferencesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
