import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-reading-level1-inner',
  templateUrl: './reading-level1-inner.page.html',
  styleUrls: ['./reading-level1-inner.page.scss'],
})
export class ReadingLevel1InnerPage implements OnInit {

  @Input() word: string;
  @Input() wordEnglish: string;
  @Input() audio: string;
  @Input() data: any;

  constructor(public common: CommonService) { }

  ngOnInit() {
    console.log('Word:', this.word);
    console.log('Word in English:', this.wordEnglish);
    console.log('Data:', this.data);
  }

}
