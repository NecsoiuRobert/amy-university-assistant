import { Injectable } from '@angular/core';

import * as faceapi from 'face-api.js';
import { loadFaceDetectionModel } from 'face-api.js';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class FaceIdentificationService {
  MODEL_URL="assets/";
  private _faceDataLoaded: boolean | null = null;
  private _loadPromise: Promise<any>;

  

  static _faceId: Float32Array;

  constructor() {
  }
}
