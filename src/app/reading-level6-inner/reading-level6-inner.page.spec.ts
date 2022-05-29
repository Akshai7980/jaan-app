import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingLevel6InnerPage } from './reading-level6-inner.page';

describe('ReadingLevel6InnerPage', () => {
  let component: ReadingLevel6InnerPage;
  let fixture: ComponentFixture<ReadingLevel6InnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingLevel6InnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingLevel6InnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
