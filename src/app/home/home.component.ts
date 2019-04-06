import { Component, OnInit } from '@angular/core';
import { VoiceListenerService } from '../voiceAssistant/voice-listener.service';
import { ChattingService } from '../voiceAssistant/chatting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private chattingService: ChattingService, private voiceListener: VoiceListenerService) { }

  ngOnInit() {
    this.voiceListener.startRecognition();
    this.voiceListener.recognisedCommand.subscribe(e => console.log(e));
  }

}
