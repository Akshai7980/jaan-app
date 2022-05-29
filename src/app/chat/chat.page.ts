import { IonContent } from "@ionic/angular";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {
  messages = [
    {
      user: "You",
      createdAt: 1554090856000,
      msg: "Hey whats up mate",
    },
    {
      user: "Jaan",
      createdAt: 1554090856000,
      msg: "Hey whats up mate",
    },
    {
      user: "You",
      createdAt: 1554090856000,
      msg: "Hey whats up mate",
    },
  ];
  currentUser = "You";
  newMsg = "";
  @ViewChild(IonContent) content: IonContent;

  constructor() {}

  ngOnInit() {}

  sendMessage() {
    this.messages.push({
      user: "You",
      createdAt: new Date().getTime(),
      msg: this.newMsg,
    });

    this.newMsg = "";

    setTimeout(() => {
      this.content.scrollToBottom(200);
    });
  }
}
