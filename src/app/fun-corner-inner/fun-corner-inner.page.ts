import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonService } from "../services/common.service";
import { MediaViewPage } from "../media-view/media-view.page";
import { IonContent } from "@ionic/angular";

@Component({
  selector: "app-fun-corner-inner",
  templateUrl: "./fun-corner-inner.page.html",
  styleUrls: ["./fun-corner-inner.page.scss"],
})
export class FunCornerInnerPage implements OnInit {
  segmentSelected = "home";
  data: any;
  // latest: any;
  // categories: any;
  categoriesDetails: any;
  // saved: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  showContents: { [key: number]: boolean } = {};
  // starSelected: {[key: number]: boolean} = {};
  isCategoriesExpand = false;
  bbSubscription: any;
  modal: boolean;
  searchTerm = "";
  searchData: any;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(public common: CommonService) {
    this.getHomeData();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.bbSubscription = this.common.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        if (this.isCategoriesExpand) {
          this.isCategoriesExpand = false;
        } else if (this.modal) {
          this.common.modalController.dismiss();
        } else {
          this.common.navController.pop();
        }
      }
    );
  }

  ionViewWillLeave() {
    this.bbSubscription.unsubscribe();
  }

  // ionViewDidEnter() {
  //   this.bbSubscription = this.common.platform.backButton.subscribeWithPriority(9999, () => {

  //     if (this.segmentSelected !== 'home') {

  //      this.segmentSelected = 'home';

  //     } else {

  //       this.common.openPage('fun-corner', 1, '');

  //     }

  //   });
  // }

  // ionViewWillLeave() {
  //   this.bbSubscription.unsubscribe();
  // }

  segmentChanged(ev: any) {
    this.data = "";
    this.searchTerm = "";
    this.showContents = {} = {};
    this.isCategoriesExpand = false;
    this.content.scrollToTop();

    console.log("Segment changed", ev);
    this.segmentSelected = ev.detail.value;

    if (ev.detail.value === "home") {
      this.getHomeData();
    } else if (ev.detail.value === "latest") {
      this.getLatestData();
    } else if (ev.detail.value === "categories") {
      this.getCategories();
    } else if (ev.detail.value === "saved") {
      this.getSavedData();
    }
  }

  showMore(i: number) {
    this.showContents[i] = !this.showContents[i];
  }

  categoriesExpand(funId: number) {
    this.isCategoriesExpand = true;

    this.common.presentLoading();

    const category = "categories";
    const params = {
      fun_id: funId,
      user_id: this.common.userInfo.id,
    };

    this.common.postData(category, params).then(
      (res: any) => {
        console.log("Fun Corner Categories Details Response:", res);

        if (res.status === true) {
          // this.categoriesDetails = res.categoriesdetail;
          this.common.stopLoading();
          this.searchData = res.categoriesdetail;
          this.filterItems();
        } else {
          // this.common.presentToast(res.message);
          this.common.stopLoading();
        }
      },
      (error) => {
        console.log("Error:", error);
        this.common.stopLoading();
      }
    );
  }

  async imageVideoModal(mediaFile: string, type: string, youtube: boolean) {
    this.modal = true;

    const modal = await this.common.modalController.create({
      component: MediaViewPage,
      componentProps: {
        media: mediaFile,
        mediaType: type,
        isYoutube: youtube,
      },
      backdropDismiss: true,
      cssClass: "media-view",
    });

    modal.onDidDismiss().then(() => {
      this.modal = false;
    });

    return await modal.present();
  }

  filterItems() {
    console.log(this.searchTerm, this.searchData);

    if (this.isCategoriesExpand) {
      this.categoriesDetails = this.searchData.filter((item) => {
        return item.category
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    } else {
      this.data = this.searchData.filter((item) => {
        return item.category
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    }

    // let dataVariable: any;

    // if (this.segmentSelected === 'home') {

    //   dataVariable = this.data;

    // } else if (this.segmentSelected === 'latest') {

    //   dataVariable = this.latest;

    // } else if (this.segmentSelected === 'categories') {

    //   dataVariable = this.categories;

    // } else if (this.segmentSelected === 'saved') {

    //   dataVariable = this.saved;

    // }
  }

  addFav(i: number, fId: number) {
    // this.starSelected[i] = !this.starSelected[i];
    this.common.presentLoading();

    const category = "savefun";
    const params = {
      user_id: this.common.userInfo.id,
      fun_id: fId,
    };

    this.common.postData(category, params).then(
      (res: any) => {
        console.log("Fun Corner Save Data Response:", res);

        // this.starSelected[i] = !this.starSelected[i];
        this.common.stopLoading();

        if (this.segmentSelected === "home") {
          this.getHomeData();
        } else if (this.segmentSelected === "latest") {
          this.getLatestData();
        } else if (this.segmentSelected === "categories") {
          this.getCategories();
        } else if (this.segmentSelected === "saved") {
          this.getSavedData();
        }
      },
      (error) => {
        this.common.stopLoading();
        console.log("Error:", error);
      }
    );
  }

  getHomeData() {
    this.common.presentLoading();

    const category = "homefun";
    const params = {
      user_id: this.common.userInfo.id,
    };

    this.common.postData(category, params).then(
      (res: any) => {
        console.log("Fun Corner Home Response:", res);

        this.common.stopLoading();
        this.searchData = res.home;
        this.filterItems();
      },
      (error) => {
        console.log("Error:", error);
        this.common.stopLoading();
      }
    );
  }

  getLatestData() {
    this.common.presentLoading();

    const category = "latest";
    const params = {
      user_id: this.common.userInfo.id,
    };

    this.common.postData(category, params).then(
      (res: any) => {
        console.log("Fun Corner Latest Response:", res);

        this.common.stopLoading();
        this.searchData = res.latest;
        this.filterItems();
      },
      (error) => {
        console.log("Error:", error);
        this.common.stopLoading();
      }
    );
  }

  getCategories() {
    this.common.presentLoading();

    const category = "categorylist";

    this.common.getData(category, "").subscribe(
      (res: any) => {
        console.log("Fun Corner Categories Response:", res);

        this.common.stopLoading();
        this.searchData = res.category;
        this.filterItems();
      },
      (error) => {
        console.log("Error:", error);
        this.common.stopLoading();
      }
    );
  }

  getSavedData() {
    this.common.presentLoading();

    const category = "saved";
    const params = {
      user_id: this.common.userInfo.id,
    };

    this.common.postData(category, params).then(
      (res: any) => {
        console.log("Fun Corner Saved Data Response:", res);

        this.common.stopLoading();
        this.searchData = res.saved;
        this.filterItems();
      },
      (error) => {
        console.log("Error:", error);
        this.common.stopLoading();
      }
    );
  }
}
