import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-testimonials-inner",
  templateUrl: "./testimonials-inner.page.html",
  styleUrls: ["./testimonials-inner.page.scss"],
})
export class TestimonialsInnerPage implements OnInit {
  data: any;
  page: string;

  constructor(public common: CommonService) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data = this.common.router.getCurrentNavigation().extras.state.data;
        this.page = this.common.router.getCurrentNavigation().extras.state.page;
        console.log(this.data);
      }
    });
  }

  ngOnInit() {}
}
