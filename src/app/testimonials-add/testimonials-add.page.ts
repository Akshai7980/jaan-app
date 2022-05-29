import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
const { Camera } = Plugins;

@Component({
  selector: "app-testimonials-add",
  templateUrl: "./testimonials-add.page.html",
  styleUrls: ["./testimonials-add.page.scss"],
})
export class TestimonialsAddPage implements OnInit {
  userForm: FormGroup;
  submittedForm = false;
  image: any;
  imageDisplay: string;

  constructor(public common: CommonService, private formBuilder: FormBuilder) {}

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
      content: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      rating: ["", [Validators.required]],
    });
  }

  async uploadImage() {
    this.image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    console.log(this.image);
    this.imageDisplay = "data:image/jpeg;base64," + this.image.base64String;
  }

  submit() {
    this.submittedForm = true;
    console.log(this.userForm.value);

    if (this.userForm.valid) {
      this.common.presentLoading();

      const formData = new FormData();

      if (this.image) {
        const blobData = this.common.b64toBlob(
          this.image.base64String,
          `image/${this.image.format}`
        );
        formData.append("userfile", blobData, `myimage.${this.image.format}`);
      }

      formData.append("name", this.userForm.value.name);
      formData.append("content", this.userForm.value.content);
      formData.append("rate", this.userForm.value.rating);

      this.common.uploadImage("testimonial", formData).subscribe(
        (res) => {
          console.log("Add Testimonial Response:", res);
          this.common.stopLoading();
          this.submittedForm = false;
          this.common.presentToast("Testimonial submitted.");
          this.common.navController.pop();
        },
        (err) => {
          this.common.stopLoading();
          this.common.ajaxErrorToast();
          console.log("Error:", err);
        }
      );
    }
  }
}
