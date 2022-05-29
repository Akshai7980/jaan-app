import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  tabIconsArray = [
    {
      icon: '../../assets/icon/tab1.png',
      selected: '../../assets/icon/tab1-active.png'
    },
    {
      icon: '../../assets/icon/tab2.png',
      selected: '../../assets/icon/tab2-active.png'
    },
    {
      icon: '../../assets/icon/tab3.png',
      selected: '../../assets/icon/tab3-active.png'
    },
    {
      icon: '../../assets/icon/tab4.png',
      selected: '../../assets/icon/tab4-active.png'
    },
    {
      icon: '../../assets/icon/tab5.png',
      selected: '../../assets/icon/tab5-active.png'
    }
  ];
  tabSelected = '';

  constructor() {}

  setTabIcon() {

    this.tabSelected = this.tabs.getSelected();

  }

}
