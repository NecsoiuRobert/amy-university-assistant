import { Injectable, EventEmitter, Output } from '@angular/core';
declare var responsiveVoice: any;

declare var window: any;
@Injectable()
export class VoiceListenerService {
  recognition = new window.webkitSpeechRecognition();
  @Output() recognisedCommand:EventEmitter<String> = new EventEmitter();
  @Output() recognisedSpeech:EventEmitter<String> = new EventEmitter();
  
  public startRecognition() {
    this.recognition.start();    
  }
  
  public stopRecognition() {
    console.log("Stop");
    this.recognition.abort();    
  }

  assistantName = [ "cortana" ]

  constructor() { 
    this.recognition.lang = "ro-RO";
    this.recognition.interminResults = false;
    // this.recognition.start();
    
    this.recognition.addEventListener('result', (e) => {
      let last = e.results.length - 1;
      let text: String = e.results[last][0].transcript;
      this.recognisedSpeech.emit(text);
      for (let i = 0; i < this.assistantName.length; i++) {
        console.log(text + " -> " + text.toLocaleLowerCase().indexOf(this.assistantName[i]));
        if(text.toLocaleLowerCase().indexOf(this.assistantName[i]) != -1) {
          this.recognisedCommand.emit(text.substring(text.toLowerCase().indexOf(this.assistantName[i]) + this.assistantName[i].length + 1));
          break;
        }
      }
    });

    this.recognition.addEventListener('start', (e) => {
      console.log("start");
    });

    this.recognition.addEventListener('end', (e) => {
      console.log("ended");
      this.recognition.start();
    });
  }
}