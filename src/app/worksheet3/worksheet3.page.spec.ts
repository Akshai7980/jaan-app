import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Worksheet3Page } from './worksheet3.page';

describe('Worksheet3Page', () => {
  let component: Worksheet3Page;
  let fixture: ComponentFixture<Worksheet3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Worksheet3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Worksheet3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
