import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConversationInner2Page } from './conversation-inner2.page';

describe('ConversationInner2Page', () => {
  let component: ConversationInner2Page;
  let fixture: ComponentFixture<ConversationInner2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationInner2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationInner2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
