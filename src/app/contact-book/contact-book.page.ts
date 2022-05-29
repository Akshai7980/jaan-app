import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Location } from "@angular/common";
@Component({
  selector: "app-contact-book",
  templateUrl: "./contact-book.page.html",
  styleUrls: ["./contact-book.page.scss"],
})
export class ContactBookPage implements OnInit {
  page: string;
  userForm: FormGroup;
  submittedForm = false;
  bookTopicsArray = [
    "Listening",
    "Speaking",
    "Reading",
    "Writing",
    "Vocaulary",
    "Grammar",
    "Conversation",
    "Comprehension",
  ];
  // bbSubscription: any;

  constructor(
    public common: CommonService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.page = this.common.router.getCurrentNavigation().extras.state.page;
      }
    });
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [
        this.common.userInfo.name,
        [
          Validators.required,
          Validators.pattern("[a-zA-Z ]*"),
          Validators.minLength(3),
        ],
      ],
      email: [
        this.common.userInfo.email,
        [Validators.required, Validators.email],
      ],
      content: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
    });

    if (this.page === "Contact Us") {
      this.userForm.addControl(
        "subject",
        new FormControl("", Validators.required)
      );
    } else {
      this.userForm.addControl(
        "subject",
        new FormControl("", Validators.required)
      );
    }
  }

  // ionViewDidEnter() {

  //   this.bbSubscription = this.common.platform.backButton.subscribe(() => {

  //   //   this.common.navController.pop();
  //   this.location.back();
  //   // this.common.router.navigate([this.location._platformLocation.location.pathname]);

  //   });
  // }

  // ionViewWillLeave() {
  //   console.log(this.location.path);
  //   // this.location.back();
  //   this.bbSubscription.unsubscribe();
  // }

  back() {
    this.location.back();
  }

  sendBook() {
    this.submittedForm = true;
    this.userForm.value.subject =
      this.page + " - " + this.userForm.value.subject;

    if (this.userForm.valid) {
      this.common.presentLoading();

      const category = "mailadmin";

      this.common.postData(category, this.userForm.value).then(
        (res: any) => {
          console.log(this.page + " Response:", res);

          if (res.status === true) {
            this.common.stopLoading();
            this.submittedForm = false;
            this.userForm.patchValue({
              subject: "",
              content: "",
            });
            this.common.presentToast("Mail sent.");
            this.common.navController.pop();
          }
        },
        (error) => {
          this.common.stopLoading();
          this.common.ajaxErrorToast();
          console.log("Error:", error);
        }
      );
    }
  }
}
