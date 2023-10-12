import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetMailSendComponent } from './reset-mail-send.component';

describe('ResetMailSendComponent', () => {
  let component: ResetMailSendComponent;
  let fixture: ComponentFixture<ResetMailSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetMailSendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetMailSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
