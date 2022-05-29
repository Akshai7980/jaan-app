import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingLevel6Page } from './reading-level6.page';

describe('ReadingLevel6Page', () => {
  let component: ReadingLevel6Page;
  let fixture: ComponentFixture<ReadingLevel6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingLevel6Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingLevel6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
