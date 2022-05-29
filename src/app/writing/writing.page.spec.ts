import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WritingPage } from './writing.page';

describe('WritingPage', () => {
  let component: WritingPage;
  let fixture: ComponentFixture<WritingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WritingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
