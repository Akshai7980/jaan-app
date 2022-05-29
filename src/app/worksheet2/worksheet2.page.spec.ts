import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Worksheet2Page } from './worksheet2.page';

describe('Worksheet2Page', () => {
  let component: Worksheet2Page;
  let fixture: ComponentFixture<Worksheet2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Worksheet2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Worksheet2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
