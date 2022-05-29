import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home-aspects',
  templateUrl: './home-aspects.page.html',
  styleUrls: ['./home-aspects.page.scss'],
})
export class HomeAspectsPage implements OnInit {

  card: any;

  constructor(public common: CommonService) { }

  ngOnInit() {

    this.card = [
      {
        image: '',
        name: 'Listening',
        price: '00.00',
        arrow: '',
        shadow: '',
        color: '#393186',
        page: 'listening'
      },
      {
        image: '',
        name: 'Speaking',
        price: '00.00',
        arrow: '',
        shadow: '',
        color: '#019934',
        page: 'speaking'
      },
      {
        image: '',
        name: 'Reading',
        price: '00.00',
        arrow: '',
        shadow: '',
        color: '#08a4e5',
        page: 'reading'
      },
      {
        image: '',
        name: 'Writing',
        price: '00.00',
        arrow: '',
        shadow: '',
        color: '##08a4e5',
        page: 'writing'
      },
      {
        image: '',
        name: 'Vocabulary',
        price: '00.00',
        arrow: '',
        shadow: '',
        color: '#06729f',
        page: 'vocabulary'
      },
      {
        image: '',
        name: 'Grammar',
        price: '00.00',
        arrow: '',
        shadow: '',
        color: '#e6158c',
        page: 'grammar'
      },
      {
        image: '',
        name: 'Conversation',
        price: '00.00',
        arrow: '',
        shadow: '',
        color: '#dd5664',
        page: 'conversation'
      },
      {
        image: '',
        name: 'Comprehension',
        price: '00.00',
        arrow: '',
        shadow: '',
        color: '#13c2a3',
        page: 'comprehension'
      },
      {
        image: '',
        name: 'Fun Corner',
        price: '00.00',
        arrow: '',
        shadow: '',
        color: '#2d5588',
        page: 'fun-corner'
      },
      {
        image: '',
        name: 'Games',
        price: '00.00',
        arrow: '',
        shadow: '',
        color: '#768115',
        page: 'games'
      }
    ];

    for (let i = 0; i < 10; i++ ) {

      this.card[i].image = '../../assets/icon/aspects-' + (i + 1) + '.png';
      this.card[i].arrow = '../../assets/icon/aspects-arr-' + (i + 1) + '.png';
      this.card[i].shadow = '../../assets/icon/aspects-sh-' + (i + 1) + '.png';

    }

    this.getData();
  }

  async getData() {

    // Ajax call for Home aspects page data
    await this.common.presentLoading();

    const params = {
      userid: this.common.userInfo.id
    };
    this.common.postData('badge', params).then(async (res: any) => {
      console.log('Home Aspect Page Response:', res);

      this.common.stopLoading();

      this.card[0].percentage = res.listeningscr;
      this.card[1].percentage = res.speakingscr;
      this.card[2].percentage = res.readingscr;
      this.card[4].percentage = res.vocabularyscr;
      this.card[5].percentage = res.grammerscr;

      this.card[0].attended = res.listening;
      this.card[1].attended = res.speaking;
      this.card[2].attended = res.reading;
      this.card[4].attended = res.vocabulary;
      this.card[5].attended = res.grammer;

      console.log(this.card);

      }, error => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        console.log('Error:', error);
    });

  }

}
