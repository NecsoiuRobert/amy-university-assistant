import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VoiceListenerService } from '../voiceAssistant/voice-listener.service';
import { ChattingService } from '../voiceAssistant/chatting.service';
import { FaceMatcher } from 'face-api.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private chattingService: ChattingService, private voiceListener: VoiceListenerService) { }

  ngOnInit() {
    // this.voiceListener.startRecognition();
    // this.voiceListener.recognisedCommand.subscribe(e => console.log(e));
  }

  finishedRegistering(data: Float32Array[]) {
    console.log(data);

    const strf = JSON.stringify(data);
    // console.log(strf);

    const dat = (JSON.parse(strf) as any[]).map(item => new Float32Array(Object.values(item)));
    console.log(dat);

  }
}
