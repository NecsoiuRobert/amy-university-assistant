import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VoiceListenerService } from '../voiceAssistant/voice-listener.service';
import { ChattingService } from '../voiceAssistant/chatting.service';
import { FaceMatcher } from 'face-api.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() { }
}
