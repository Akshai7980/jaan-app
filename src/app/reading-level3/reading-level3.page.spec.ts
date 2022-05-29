import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingLevel3Page } from './reading-level3.page';

describe('ReadingLevel3Page', () => {
  let component: ReadingLevel3Page;
  let fixture: ComponentFixture<ReadingLevel3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingLevel3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingLevel3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
