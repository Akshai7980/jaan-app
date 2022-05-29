import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingLevel1InnerPage } from './reading-level1-inner.page';

describe('ReadingLevel1InnerPage', () => {
  let component: ReadingLevel1InnerPage;
  let fixture: ComponentFixture<ReadingLevel1InnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingLevel1InnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingLevel1InnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
