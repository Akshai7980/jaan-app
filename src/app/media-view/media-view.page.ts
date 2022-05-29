import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-media-view',
  templateUrl: './media-view.page.html',
  styleUrls: ['./media-view.page.scss'],
})
export class MediaViewPage implements OnInit {

  @Input() media: string;
  @Input() mediaType: string;
  @Input() isYoutube: boolean;

  constructor(public common: CommonService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  dismissModal() {
    this.common.modalController.dismiss();
  }

  videoURL() {
    const videoUrl =  'https://www.youtube.com/embed/' + this.media;
    console.log(videoUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

}
