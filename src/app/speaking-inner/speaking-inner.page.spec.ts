import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpeakingInnerPage } from './speaking-inner.page';

describe('SpeakingInnerPage', () => {
  let component: SpeakingInnerPage;
  let fixture: ComponentFixture<SpeakingInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakingInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakingInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
