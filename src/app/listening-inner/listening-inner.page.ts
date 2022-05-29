import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-listening-inner',
  templateUrl: './listening-inner.page.html',
  styleUrls: ['./listening-inner.page.scss'],
})
export class ListeningInnerPage implements OnInit {

  data = {
    id: 0,
    dId: 0,
    designName: '',
    header: '',
    sectionName: '',
    buttonText: '',
    content: '',
    worksheet: 0,
    games: 0
  };
  bbSubscription: any;
  // starSelected: {[Key: number]: boolean} = {};

  constructor(public common: CommonService) {

    this.common.route.queryParams.subscribe(params => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data.id = this.common.router.getCurrentNavigation().extras.state.sectionId;
        this.data.sectionName = this.common.router.getCurrentNavigation().extras.state.sectionName;
        this.data.dId = this.common.router.getCurrentNavigation().extras.state.designId;

        this.common.levelId = this.data.id;
        this.common.aspectId = 1;

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

    const category = 'listening';
    const paramsApi = {
      levelid: this.data.id,
      user_id: this.common.userInfo.id
    };

    this.common.postData(category, paramsApi).then((res: any) => {
      console.log('Listening Inner Page Response - ' + this.data.sectionName + ':', res);

      if (res.status === true) {

        this.common.stopLoading();

        if (! /\s/g.test(res.listening[0].malayalamword)) {
          this.data.designName = 'Words';
          this.data.buttonText = 'Click here for continuous audio';
        } else {
          this.data.buttonText = 'Click here for single audio';
        }

        this.data.content = res.listening;
        this.data.sectionName = this.data.sectionName;
        this.data.header = '../../assets/icon/listening-header' + this.data.dId + '.png';
        this.data.worksheet = res.worksheet;
        this.data.games = res.games;
        console.log(this.data);

      } else {

        this.common.presentToast(res.message);

      }

      }, error => {
        this.common.stopLoading();
        this.common.ajaxErrorToast();
        this.common.navController.pop();
        console.log('Error:', error);
    });

  }

  playSingleContinousAudio() {


  }

  addRemoveFav(i: number, cid: number) {

    this.common.presentLoading();

    const category = 'update_lib';
    const params = {
      aspect_level_id: this.data.id,
      sub_level_id: '',
      content_id: cid,
      user_id: this.common.userInfo.id
    };

    this.common.postData(category, params).then((res: any) => {
      console.log('Listening Save Unsave Response:', res);

      if (res.status === true) {

        // this.starSelected[i] = !this.starSelected[i];
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
