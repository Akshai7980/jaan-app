import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConversationInner3Page } from './conversation-inner3.page';

describe('ConversationInner3Page', () => {
  let component: ConversationInner3Page;
  let fixture: ComponentFixture<ConversationInner3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationInner3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationInner3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
