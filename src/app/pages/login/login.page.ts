import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonSegment) segment: IonSegment;

  public wavesPosition = 0;
  public wavesDifference = 100;

  constructor() {}

  ngOnInit() {}

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async slideChenged() {
    const index = await this.slides.getActiveIndex();
    if (index === 0) {
      this.segment.value = 'login';
      this.wavesPosition += this.wavesDifference;
    } else if (index === 1) {
      this.segment.value = 'cadastro';
      this.wavesPosition -= this.wavesDifference;
    }
  }
}
