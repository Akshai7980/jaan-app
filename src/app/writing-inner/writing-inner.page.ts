import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
  AfterViewInit,
  ViewChildren,
} from "@angular/core";
import { CommonService } from "../services/common.service";
import { IonSlides } from "@ionic/angular";
import SignaturePad from "signature_pad";

@Component({
  selector: "app-writing-inner",
  templateUrl: "./writing-inner.page.html",
  styleUrls: ["./writing-inner.page.scss"],
})
export class WritingInnerPage implements OnInit, AfterViewInit {
  data = {
    content: [],
    headerIndex: "",
    header: "",
    color: "",
    worksheet: 0,
    sublevelId: 0,
    selectedFiles: {
      gif: "",
      audio: "",
    },
  };
  subLevelsArray: any;
  selectedLetter: { [Key: number]: boolean } = {};
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;
  colors = [
    "#ffc114",
    "#f7630d",
    "#e71224",
    "#5b2d90",
    "#ab228a",
    "#d10177",
    "#0069bf",
    "#31ccff",
    "#000000",
    "#b7b7b7",
    "#e3e3e3",
    "#c19e66",
  ];
  dots = [3, 4, 5, 6];
  isOpenColors = false;
  @ViewChild("slides", { static: true }) slides: IonSlides;
  @ViewChild("canvas", { static: true }) signaturePadElement: ElementRef;

  constructor(private common: CommonService, private elementRef: ElementRef) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.data.content =
          this.common.router.getCurrentNavigation().extras.state.sLevel;
        this.data.headerIndex =
          this.common.router.getCurrentNavigation().extras.state.index;
        this.data.color =
          this.common.router.getCurrentNavigation().extras.state.color;
        this.data.sublevelId = this.data.content[0].sulevelid;
        this.data.worksheet = this.data.content[0].worksheet;
        this.data.header = this.data.content[0].sublevelname;
        this.selectedLetter[0] = true;
        this.data.selectedFiles = {
          gif: this.data.content[0].sublevelcontents[0].images,
          audio: this.data.content[0].sublevelcontents[0].audio,
        };
        console.log("Sublevels: ", this.data.content);
      }
    });
  }

  ngOnInit() {}

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(
      this.signaturePadElement.nativeElement
    );
    this.signaturePad.clear();
    this.signaturePad.penColor = "#ffffff";

    this.initSignaturePad();
  }

  setSlide() {
    this.slides.getActiveIndex().then((index) => {
      // Set Header
      this.data.header = this.data.content[index].sublevelname;

      // Set sublevel id & worksheet (For worksheet & games)
      this.data.sublevelId = this.data.content[index].sulevelid;
      this.data.worksheet = this.data.content[index].worksheet;

      // Set Initial Files
      this.data.selectedFiles = {
        gif: this.data.content[index].sublevelcontents[0].images,
        audio: this.data.content[index].sublevelcontents[0].audio,
      };
    });

    // Clear & Set initial letter
    this.selectedLetter = {} = {};
    this.selectedLetter[0] = true;
  }

  selectLetter(params: any, i: number) {
    this.common.playAudio(params.audio[0]);

    this.selectedLetter = {} = {};
    this.selectedLetter[i] = !this.selectedLetter[i];

    this.data.selectedFiles = {
      gif: params.images,
      audio: params.audio,
    };

    console.log("Selected Files: ", this.data.selectedFiles);
  }

  lockSlider(val: boolean) {
    this.slides.lockSwipes(val);
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.init();
  // }

  initSignaturePad() {
    // setTimeout(() => {
    const canvas: any = this.elementRef.nativeElement.querySelector("canvas");
    // canvas.width = window.innerWidth;
    canvas.height = 220;
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
    // }, 5000);
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  openColors() {
    this.isOpenColors = !this.isOpenColors;
  }

  selectColor(color: string, size: any) {
    if (color) {
      this.signaturePad.penColor = color;
    }

    if (size) {
      this.signaturePad.minWidth = size;
    }

    this.isOpenColors = false;
  }
}
