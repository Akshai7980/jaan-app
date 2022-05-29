import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-header-more',
  templateUrl: './header-more.page.html',
  styleUrls: ['./header-more.page.scss'],
})
export class HeaderMorePage implements OnInit {

  @Input() data = [];

  constructor(public common: CommonService) { }

  ngOnInit() {
  }

  selectOption(data: any) {
    this.common.popoverController.dismiss(data);
  }

}
