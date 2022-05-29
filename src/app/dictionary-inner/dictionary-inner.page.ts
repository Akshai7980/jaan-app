import { Component, OnInit, HostListener, Input } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-dictionary-inner",
  templateUrl: "./dictionary-inner.page.html",
  styleUrls: ["./dictionary-inner.page.scss"],
})
export class DictionaryInnerPage implements OnInit {
  @Input() data: any;

  constructor(public common: CommonService) {}

  ngOnInit() {
    console.log(this.data);
  }

  // @HostListener('document:ionBackButton', ['$event'])
  //   private async overrideHardwareBackAction($event: any) {
  //     console.log($event);
  //     console.log(history);
  //     await this.common.modalController.dismiss();
  //   }

  dismissModal() {
    this.common.modalController.dismiss();
  }
}
