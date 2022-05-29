import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
import { Printer, PrintOptions } from "@ionic-native/printer/ngx";

@Component({
  selector: "app-reading-level5",
  templateUrl: "./reading-level5.page.html",
  styleUrls: ["./reading-level5.page.scss"],
})
export class ReadingLevel5Page implements OnInit {
  selectedCards = {
    round1: true,
    round2: false,
    round3: false,
    round4: false,
    value: 0,
  };
  data: any;
  printOpen = false;

  constructor(public common: CommonService, private printer: Printer) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data = this.common.router.getCurrentNavigation().extras.state.data;
        console.log(this.data);
      }
    });
  }

  ngOnInit() {}

  ionViewWillLeave() {
    this.common.stopAudio();
  }

  selectCards(i: number) {
    this.selectedCards.round1 = false;
    this.selectedCards.round2 = true;
    this.selectedCards.value = i;
    this.data = this.data[i - 1].contents;
    console.log("Card " + i + " Data:", this.data);
  }

  shuffle() {
    this.selectedCards.round2 = false;
    this.selectedCards.round3 = true;
  }

  openCards(i: number) {
    this.selectedCards.round3 = false;
    this.selectedCards.round4 = true;

    this.data = this.data[i - 1];
    console.log("Round 4 Data:", this.data);
  }

  openPrint() {
    this.printOpen = !this.printOpen;
  }

  print() {
    // const options: PrintOptions = {
    //   name: this.data.title,
    //   duplex: true,
    //   orientation: 'landscape',
    //   monochrome: true
    // };

    this.printer.print();
  }
}
