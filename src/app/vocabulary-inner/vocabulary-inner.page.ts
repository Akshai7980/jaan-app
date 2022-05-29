import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-vocabulary-inner',
  templateUrl: './vocabulary-inner.page.html',
  styleUrls: ['./vocabulary-inner.page.scss'],
})
export class VocabularyInnerPage implements OnInit {

  data = {
    header: '',
    content: [],
    worksheet: 0,
    games: 0
  };
  levelId: number;
  bbSubscription: any;

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.levelId = this.common.router.getCurrentNavigation().extras.state.sectionId;
        this.data.header = this.common.router.getCurrentNavigation().extras.state.sectionName;

        this.common.levelId = this.levelId;
        this.common.aspectId = 4;

        this.getData();

      }
    });

   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.bbSubscription = this.common.platform.backButton.subscribeWithPriority(9999, () => {

      if (this.common.favourites) {

        this.common.favourites = false;

      } else {

        this.common.navController.pop();

      }

    });
  }

  ionViewWillLeave() {
    this.common.favourites = false;
    this.bbSubscription.unsubscribe();
  }

  getData() {

    this.common.presentLoading();

    const category = 'vocabulary';
    const paramsApi = {
      levelid: this.levelId,
      user_id: this.common.userInfo.id
    };

    this.common.postData(category, paramsApi).then((res: any) => {
      console.log('Vocabulary Inner Page Response - ' + this.data.header + ':', res);

      if (res.status === true) {

        this.common.stopLoading();
        this.data.content = res.vocabulary;
        this.data.worksheet = res.worksheet;
        this.data.games = res.games;

      } else {

        this.common.stopLoading();
        this.common.presentToast(res.message);

      }

      }, error => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        this.common.navController.pop();
        console.log('Error:', error);
    });

  }

  addRemoveFav(i: number, cid: number) {

    this.common.presentLoading();

    const category = 'update_lib';
    const params = {
      aspect_level_id: this.levelId,
      sub_level_id: '',
      content_id: cid,
      user_id: this.common.userInfo.id
    };

    this.common.postData(category, params).then((res: any) => {
      console.log('Vocabulary Save Unsave Response:', res);

      if (res.status === true) {

        this.common.stopLoading();
        this.getData();

      } else {

        this.common.stopLoading();
        this.common.presentToast(res.message);

      }

      }, error => {
        this.common.stopLoading();
        console.log('Error:', error);
    });

  }

}
