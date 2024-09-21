import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndProcessComponent } from './end-process.component';

describe('EndProcessComponent', () => {
  let component: EndProcessComponent;
  let fixture: ComponentFixture<EndProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
