import { Component, OnInit } from "@angular/core";
import { DictionaryInnerPage } from "../dictionary-inner/dictionary-inner.page";
import { CommonService } from "../services/common.service";
// import { reject } from 'q';

@Component({
  selector: "app-dictionary",
  templateUrl: "./dictionary.page.html",
  styleUrls: ["./dictionary.page.scss"],
})
export class DictionaryPage implements OnInit {
  segmentSelected = "malayalam";
  data = [];
  modal: boolean;
  bbSubscription: any;
  searchTerm = "";
  offset = 0;

  constructor(public common: CommonService) {}

  ngOnInit() {
    this.getData(true, "");
    // this.setFilteredItems();
  }

  ionViewDidEnter() {
    this.bbSubscription = this.common.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        if (this.modal) {
          this.common.modalController.dismiss();
        } else {
          this.common.router.navigate(["tabs"]);
        }
      }
    );
  }

  ionViewWillLeave() {
    this.bbSubscription.unsubscribe();
  }

  async getData(isFirstLoad, event) {
    if (isFirstLoad) {
      await this.common.presentLoading();
    }

    const category = "dictionary";
    const paramsApi = {
      language: this.segmentSelected === "malayalam" ? 1 : 2,
      offset: this.offset,
      keyword: this.searchTerm,
    };

    this.common.postData(category, paramsApi).then(
      (res: any) => {
        console.log("Dictionary Page Response - " + this.offset, ":", res);

        if (res.status === true) {
          if (isFirstLoad) {
            this.common.stopLoading();
          }

          for (let i = 0; i < res.result.length; i++) {
            this.data.push(res.result[i]);
          }
          // this.setFilteredItems();
          if (!isFirstLoad) {
            event.target.complete();
          }

          this.offset++;

          console.log(this.data);
        } else {
          if (isFirstLoad) {
            this.common.stopLoading();
          }
          this.common.presentToast("Your search did not match any words.");
        }
      },
      (error) => {
        if (isFirstLoad) {
          this.common.stopLoading();
        }
        this.common.ajaxErrorToast();
        // this.common.navController.pop();
        console.log("Error:", error);
      }
    );
  }

  doInfinite(event) {
    if (this.searchTerm === "") {
      console.log(1);
      this.getData(false, event);
    }
  }

  segmentChanged(ev: any) {
    console.log("Segment changed", ev);
    this.offset = 0;
    // this.common.dictionaryData = [];
    this.searchTerm = "";
    this.segmentSelected = ev.detail.value;
    this.getData(true, "");
  }

  setFilteredItems() {
    // this.data = this.common.filterItems(this.searchTerm,  this.segmentSelected);
    this.offset = 0;
    this.data = [];
    this.getData(true, "");
  }

  async wordDetails(d: any) {
    this.modal = true;

    const modal = await this.common.modalController.create({
      component: DictionaryInnerPage,
      componentProps: {
        data: d,
      },
      backdropDismiss: false,
      cssClass: "dictionary-inner",
    });

    modal.onDidDismiss().then(() => {
      this.modal = false;
    });

    return await modal.present();
  }
}
