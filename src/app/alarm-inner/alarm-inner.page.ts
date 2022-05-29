import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Plugins, LocalNotificationEnabledResult, LocalNotificationActionPerformed, LocalNotification, Device } from '@capacitor/core';
// import { error } from 'console';
const {LocalNotifications} = Plugins;

@Component({
  selector: 'app-alarm-inner',
  templateUrl: './alarm-inner.page.html',
  styleUrls: ['./alarm-inner.page.scss'],
})
export class AlarmInnerPage implements OnInit {

  @Input() alarm: any;
  alarmTime: any;
  alarmLabel = 'Alarm';
  alarmPeriod = 'Once';
  alarmDesc = 'AM';

  constructor(public common: CommonService) {
    // console.log(new Date().getHours() % 12);
    // console.log(new Date().getMinutes());
    // console.log(new Date().getDay());
    // console.log(new Date().getMonth());
  }

  async ngOnInit() {

    await LocalNotifications.requestPermission();
    console.log('Alarm:', this.alarm);

    if (this.alarm) {
      this.alarmTime = this.alarm.time;
      this.alarmLabel = this.alarm.label;
      this.alarmPeriod = this.alarm.period;
      this.alarmDesc = this.alarm.desc;
    }

  }

  closePage() {
    this.common.modalController.dismiss();
  }

  getTime() {
    console.log(this.alarmTime);
  }

  async repeatOptions() {
    const actionSheet = await this.common.actionSheetController.create({
      // header: 'Select your option',
      buttons: [{
        text: 'Once',
        handler: () => {
          this.alarmPeriod = 'Once';
        }
      },
      {
        text: 'Daily',
        handler: () => {
          this.alarmPeriod = 'Daily';
        }
      },
      {
        text: 'Weekly',
        handler: () => {
          // this.alarmPeriod = 'Mon Tue Wed Thu Fri Sat';
          this.alarmPeriod = 'Weekly';
        }
      },
      // {
      //   text: 'Custom',
      //   handler: () => {
      //     this.repeatCustomOptions();
      //   }
      // }
      ]
    });
    await actionSheet.present();
  }

  async alarmOptions() {
    const actionSheet = await this.common.actionSheetController.create({
      // header: 'Select your option',
      buttons: [{
        text: 'AM',
        handler: () => {
          this.alarmDesc = 'AM';
        }
      },
      {
        text: 'PM',
        handler: () => {
          this.alarmDesc = 'PM';
        }
      }]
    });
    await actionSheet.present();
  }

  // async repeatCustomOptions() {
  //   const actionSheet = await this.common.actionSheetController.create({
  //     // header: 'Select your option',
  //     buttons: [{
  //       text: 'Monday',
  //       handler: () => {
  //       }
  //     },
  //     {
  //       text: 'Tuesday',
  //       handler: () => {
  //       }
  //     },
  //     {
  //       text: 'Wednesday',
  //     },
  //     {
  //       text: 'Thursday',
  //       handler: () => {
  //       },
  //     },
  //     {
  //       text: 'Friday',
  //       handler: () => {
  //       },
  //     }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

  saveAlarm() {

    if (this.alarmTime) {

      let alarmStorage = [];

      this.common.storage.get('alarm').then(async (val) => {
        console.log('Storage Value of Alarm Before:', val);

        if (val) {
          alarmStorage = val;
        }

        const alarmId = new Date().getTime();

        const alarm = {
          id: this.alarm ? this.alarm.id : alarmId,
          time: this.alarmTime,
          label: this.alarmLabel,
          desc: this.alarmDesc,
          period: this.alarmPeriod,
          toggle: true
        };

        if (this.alarm) {

          console.log('Edit Alarm');

          let i = 0;
          for (const element of alarmStorage) {

            if (element.id === this.alarm.id) {
              // alarmStorage.splice(i, 1);
              alarmStorage[i] = {
                id: this.alarm.id,
                time: this.alarmTime,
                label: this.alarmLabel,
                desc: this.alarmDesc,
                period: this.alarmPeriod,
                toggle: true
              };
              this.scheduleAlarm(alarmStorage[i]);

              break;
            }
            i++;
          }

        } else {

          console.log('New Alarm', alarm);

          alarmStorage.push(alarm);
          this.scheduleAlarm(alarm);

        }

        this.common.setStorage('alarm', alarmStorage);

        console.log('Storage Value of Alarm After:', alarmStorage);

        this.closePage();

      });

    } else{

      this.common.presentToast('Add an alarm to save.');

    }

  }

  async scheduleAlarm(alarm: any) {

    console.log(alarm);
    const dateTime = new Date(alarm.time);
    dateTime.setSeconds(0);
    if (alarm.desc === 'PM') {
      if (dateTime.getHours() < 12) {
        dateTime.setHours(dateTime.getHours() + 12);
      }
    } else {
      if (dateTime.getHours() === 12) {
        dateTime.setHours(0);
      }
    }

    if (dateTime < new Date()) {
      console.log('Alarm scheduled for tomorrow.!');
      dateTime.setDate(dateTime.getDate() + 1);
    }
    console.log(dateTime);
    // console.log(new Date(Date.now() + 1000 * 5));
    // console.log(time.getHours() % 12);
    // console.log(time.getMinutes());

    let alarmSchedule: any;

    if (alarm.period === 'Once') {

      alarmSchedule = {
        at: dateTime,
        // on: {
        //   hour: time.getHours() % 12,
        //   minute: time.getMinutes()
        //   }
      };

    } else if (alarm.period === 'Daily') {

      alarmSchedule = {
        at: dateTime,
        every: 'day',
      };

    } else if (alarm.period === 'Weekly') {

        alarmSchedule = {
          at: dateTime,
          every: 'week',
          on: {
            day: 1
          }
        };

    }

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Jaan Reminder',
          body: alarm.label,
          id: alarm.id,
          extra: {

          },
          iconColor: '#3e368d',
          // sound: 'alarm.wav',
          // sound: 'file://assets/audio/alarm.wav',
          schedule: alarmSchedule
        }
      ]
    }).then((res) => {

      console.log('Alarm Set.!', res);

    }, err => {

      console.log(err);

    });

  }

  async deleteScheduledAlarm(alarmId: string) {
    await LocalNotifications.cancel({
      notifications: [{
        id: alarmId
      }]
    }).then((res) => {

      console.log('Alarm Deleted.!', res);

    }, err => {

      console.log(err);

    });
  }

  async deleteAlert() {
    const alert = await this.common.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Warning!',
      message: 'Are you sure to delete the alarm?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
           this.deleteAlarm();
          }
        },
        {
          text: 'Cancel',
        }
      ]
    });

    await alert.present();
  }

  deleteAlarm() {

    if (this.alarm) {

      let alarmStorage = [];

      this.common.storage.get('alarm').then(async (val) => {
        console.log('Storage Value of Alarm Before:', val);

        alarmStorage = val;

        console.log('Delete Alarm');

        let i = 0;
        for (const element of alarmStorage) {

          if (element.id === this.alarm.id) {
            alarmStorage.splice(i, 1);
            break;
          }
          i++;
        }

        this.common.setStorage('alarm', alarmStorage);

        console.log('Storage Value of Alarm After:', alarmStorage);
        this.deleteScheduledAlarm(this.alarm.id);

        this.closePage();

      });

    }

  }

}
