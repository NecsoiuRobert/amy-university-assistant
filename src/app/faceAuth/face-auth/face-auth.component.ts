import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';


import * as faceapi from 'face-api.js';
import { loadFaceDetectionModel } from 'face-api.js';
import { Subject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-face-auth',
  templateUrl: './face-auth.component.html',
  styleUrls: ['./face-auth.component.sass']
})
export class FaceAuthComponent {
  @ViewChild("video")
  public video: ElementRef;

  @Output() finishedRegistering:EventEmitter<Float32Array[]> = new EventEmitter();
  
  MODEL_URL="assets/";

  public photosCount: number = 0;
  private _interval: any;
  constructor(private changeDetector : ChangeDetectorRef) { }
  
  async loadFaceDetection(): Promise<boolean> {
    await faceapi.loadTinyFaceDetectorModel(this.MODEL_URL);
    await faceapi.loadFaceRecognitionModel(this.MODEL_URL);
    await faceapi.loadFaceLandmarkTinyModel(this.MODEL_URL);
    return true;
  }

  async getFacePhoto(faceData: any): Promise<boolean> {
    let detection = await faceapi.detectAllFaces(faceData, new faceapi.TinyFaceDetectorOptions()).run()
    if (detection.length > 0) {
      return true;
    }
    return false;
  }

  userFaceData: Float32Array[] = [];

  async initAndGetFaces(facesCount: number) {
    await this.loadFaceDetection();
    const input: any = document.getElementById('video');
    const canvas: any = document.getElementById('canvas');
    let subj: Subject<Float32Array> = new Subject();

    input.addEventListener('timeupdate', async function (e) {
      let data = await faceapi.detectAllFaces(this, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks(true).withFaceDescriptors().run();
      if (data.length) {
        let face = data[0];
        subj.next(face.descriptor);
        canvas.width = face.detection.box.width;
        canvas.height = face.detection.box.height;
        // (canvas.getContext('2d') as CanvasRenderingContext2D).drawImage(this, face.detection.box.left, face.detection.box.top, face.detection.box.width, face.detection.box.height, 0, 0, face.detection.box.width, face.detection.box.height);
      }
    }, false);

    subj.asObservable().subscribe(a => {
      facesCount -= 1;
      this.userFaceData.push(a);
      if (facesCount === 0) {
        $('#video').replaceWith($('#video').clone());
        
        this.changeDetector.detectChanges();
        this.finishedRegistering.emit(this.userFaceData);
        this._stopMedia.stop();
      }
    })
  }

  private _stopMedia: any;

  StartRegisteringFace(photosNumber: number) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this._stopMedia = stream.getTracks()[0];
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
    this.initAndGetFaces(photosNumber);
  }
  
}
