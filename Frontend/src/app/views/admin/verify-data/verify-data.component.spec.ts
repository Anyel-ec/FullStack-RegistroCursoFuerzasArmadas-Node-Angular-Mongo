import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDataComponent } from './verify-data.component';

describe('VerifyDataComponent', () => {
  let component: VerifyDataComponent;
  let fixture: ComponentFixture<VerifyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
