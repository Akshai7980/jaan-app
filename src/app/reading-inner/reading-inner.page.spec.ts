import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingInnerPage } from './reading-inner.page';

describe('ReadingInnerPage', () => {
  let component: ReadingInnerPage;
  let fixture: ComponentFixture<ReadingInnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingInnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingInnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
