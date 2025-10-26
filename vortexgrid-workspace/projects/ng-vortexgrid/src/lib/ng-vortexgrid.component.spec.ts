import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VortexGridTableComponent } from './ng-vortexgrid.component';

describe('NgVortexGridTableComponent', () => {
  let component: VortexGridTableComponent;
  let fixture: ComponentFixture<VortexGridTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VortexGridTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VortexGridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
