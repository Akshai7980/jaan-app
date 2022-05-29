import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadingPage } from './reading.page';

describe('ReadingPage', () => {
  let component: ReadingPage;
  let fixture: ComponentFixture<ReadingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
