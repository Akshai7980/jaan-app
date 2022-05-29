import { Component, OnInit } from '@angular/core';
import { NavigationExtras  } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  constructor(private common: CommonService) { }

  ngOnInit() {
  }

  openSection(sName: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        sectionName: sName,
      }
    };

    this.common.openPage('conversation-inner', 1, navigationExtras);

  }

}
