import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Worksheet1Page } from './worksheet1.page';

describe('Worksheet1Page', () => {
  let component: Worksheet1Page;
  let fixture: ComponentFixture<Worksheet1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Worksheet1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Worksheet1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
