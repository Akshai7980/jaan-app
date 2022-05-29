import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { IonContent } from '@ionic/angular';
import {Howl} from 'howler';

@Component({
  selector: 'app-conversation-inner3',
  templateUrl: './conversation-inner3.page.html',
  styleUrls: ['./conversation-inner3.page.scss'],
})
export class ConversationInner3Page implements OnInit {

  segmentSelected = 'listen';
  data = {
    headerImage: '',
    header: '',
    content: [],
    dp: [],
    name: []
  };
  showContents: {[key: number]: boolean} = {};
  temp: any;
  player: Howl = null;
  @ViewChild(IonContent, { read: IonContent }) content: IonContent;


  constructor(private common: CommonService) {

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        const data = this.common.router.getCurrentNavigation().extras.state.data;
        console.log(data);

        this.data.header = data.buttonText;
        this.data.headerImage = data.header;

        this.common.presentLoading();

        const category = 'conversationalsentence';
        const paramsApi = {
          sublevel_id: data.aspectId
        };
        this.common.postData(category, paramsApi).then((res: any) => {
          console.log('Conversation Inner Page 3 Response:', res);

          if (res.status === true) {

            this.common.stopLoading();
            this.data.content = res.conversationwords;

            // for (const e of this.data.content) {
            //   this.data.dp.push('../../assets/icon/conversation-profile.png');
            //   this.data.name.push('മഹേഷ്');
            // }

            console.log(this.data);

          } else {

            this.common.stopLoading();
            this.common.presentToast(res.message);

          }

          }, error => {

            this.common.stopLoading();
            console.log('Error:', error);
        });
      }
    });

   }

  ngOnInit() {
  }

  async segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segmentSelected = ev.detail.value;

    this.showContents = {};
    this.content.scrollToTop();
    if (this.player) {
      this.player.stop();
    }

    if (this.segmentSelected === 'listen') {

      this.playContinous(0);

    }

  }

  async playContinous(i: number) {

    if (i < this.data.content.length) {

      // Executes only if the conversation exists

      const id = 'conv' + i;

      const y = document.getElementById(id).offsetTop - 80;
      this.content.scrollToPoint(0, y, 300); // Scroll to the current conversation

      this.player = new Howl({
        src: this.data.content[i].files[0],
        html5: true,
        onplay: () => {

          console.log('Audio Started playing!');

          if (i > 0) {
            this.showContents[i - 1] = false; // Unselect the previous conversation
          }
          this.showContents[i] = true; // Select the current conversation

        },
        onend: () => {

          console.log('Audio Stopped playing!');

          i++;
          this.playContinous(i);

        }
      });
      this.player.play(); // Play current conversation

    }

  }

  expandDiv(i: number, audioUrl: string) {
    const id = 'conv' + i;
    console.log(document.getElementById(id).offsetTop);
    if (this.player) {
      this.player.stop();
    }
    this.showContents[this.temp] = false;
    this.showContents[i] = !this.showContents[i];
    this.temp = i;

    this.player = new Howl({
      src: audioUrl,
      html5: true,
      onplay: () => {

        console.log('Audio Started playing!');

      },
      onend: () => {

        console.log('Audio Stopped playing!');

      }
    });
    this.player.play();

  }

}
