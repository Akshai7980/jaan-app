import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingLevel2Page } from './reading-level2.page';

describe('ReadingLevel2Page', () => {
  let component: ReadingLevel2Page;
  let fixture: ComponentFixture<ReadingLevel2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingLevel2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingLevel2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
