import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VortexgridComponent } from './vortexgrid.component';

describe('VortexgridComponent', () => {
  let component: VortexgridComponent;
  let fixture: ComponentFixture<VortexgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VortexgridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VortexgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
