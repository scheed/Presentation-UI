import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationContainerComponent } from './presentation-container.component';

describe('PresentationContainerComponent', () => {
  let component: PresentationContainerComponent;
  let fixture: ComponentFixture<PresentationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentationContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
