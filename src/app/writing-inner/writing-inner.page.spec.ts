import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WritingInnerPage } from './writing-inner.page';

describe('WritingInnerPage', () => {
  let component: WritingInnerPage;
  let fixture: ComponentFixture<WritingInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritingInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WritingInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
