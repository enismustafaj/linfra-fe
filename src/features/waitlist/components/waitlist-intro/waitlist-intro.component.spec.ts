import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistIntroComponent } from './waitlist-intro.component';

describe('WaitlistIntroComponent', () => {
  let component: WaitlistIntroComponent;
  let fixture: ComponentFixture<WaitlistIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitlistIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitlistIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
