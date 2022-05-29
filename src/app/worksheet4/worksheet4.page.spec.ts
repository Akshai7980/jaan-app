import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Worksheet4Page } from './worksheet4.page';

describe('Worksheet4Page', () => {
  let component: Worksheet4Page;
  let fixture: ComponentFixture<Worksheet4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Worksheet4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Worksheet4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
