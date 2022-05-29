import { Component, OnInit } from '@angular/core';
import { NavigationExtras  } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-speaking',
  templateUrl: './speaking.page.html',
  styleUrls: ['./speaking.page.scss'],
})
export class SpeakingPage implements OnInit {

  constructor(private common: CommonService) { }

  ngOnInit() {
  }

  openSection(sName: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        sectionName: sName,
      }
    };
    this.common.openPage('speaking-inner', 1, navigationExtras);
  }
}
