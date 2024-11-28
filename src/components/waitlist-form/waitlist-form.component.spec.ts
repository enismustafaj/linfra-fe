import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistFormComponent } from './waitlist-form.component';

describe('WaitlistFormComponent', () => {
  let component: WaitlistFormComponent;
  let fixture: ComponentFixture<WaitlistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitlistFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitlistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
