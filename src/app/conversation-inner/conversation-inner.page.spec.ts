import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConversationInnerPage } from './conversation-inner.page';

describe('ConversationInnerPage', () => {
  let component: ConversationInnerPage;
  let fixture: ComponentFixture<ConversationInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
