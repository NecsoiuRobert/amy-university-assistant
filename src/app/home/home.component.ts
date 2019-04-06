import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { VoiceListenerService } from '../voiceAssistant/voice-listener.service';
import { ChattingService } from '../voiceAssistant/chatting.service';
import { FaceMatcher } from 'face-api.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild("video")
  public video: ElementRef;
  constructor(private chattingService: ChattingService, private voiceListener: VoiceListenerService) { }

  ngOnInit() {
    this.voiceListener.startRecognition();
    this.voiceListener.recognisedCommand.subscribe(e => console.log(e));
  }

  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        console.log(stream);
          this.video.nativeElement.src = window.URL.createObjectURL(stream);
          this.video.nativeElement.play();
      });
    }
  }
}
