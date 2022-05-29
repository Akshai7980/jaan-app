import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonService } from "../services/common.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.page.html",
  styleUrls: ["./change-password.page.scss"],
})
export class ChangePasswordPage implements OnInit {
  constructor(
    private common: CommonService,
    private formBuilder: FormBuilder
  ) {}

  registerForm: FormGroup;
  submittedForm = false;
  errorMessage: any;
  showPassword: boolean = false;

  ngOnInit() {
    const passwordPattern =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    this.registerForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required]],
      newPassword: [
        "",
        [Validators.required, Validators.pattern(passwordPattern)],
      ],
      confirmPassword: ["", Validators.required],
    });
  }

  ToshowPassword() {
    this.showPassword = !this.showPassword;
  }

  async register() {
    this.submittedForm = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      const params = {
        // password: this.registerForm.value.oldPassword,
        password: "",
        newpass: this.registerForm.value.newPassword,
        confirmpass: this.registerForm.value.confirmPassword,
        userid: this.common.userInfo.id,
      };

      await this.common.presentLoading();

      const category = "changepassword";

      this.common.postData(category, params).then(
        (res: any) => {
          console.log("Register Response:", res);

          if (res.status === true) {
            this.common.stopLoading();
            this.common.presentToast("Password Changed successfully.");
            this.common.navController.pop();
          } else {
            this.errorMessage = res.message;
            this.common.stopLoading();
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
