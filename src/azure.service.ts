import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { WebcamImage } from 'ngx-webcam';

@Injectable({
  providedIn: 'root'
})
export class AzureService {

  public personId: string;
  public personName: string;
  public profileId: string;
  public profileIdSubject = new Subject<string>();
  public cleanSubject = new Subject();
  constructor(private httpClient: HttpClient) {
    this.cleanSubject.subscribe(x => {
      this.personId = null;
      this.profileId = null;
      this.personName = null;
    });
  }

  public sendDataToOurApi(): Observable<any> {
    const url = 'http://mashackathonservice.solutivas.com/api/values';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers };
    const data = { personId: this.personId, verificationProfileId: this.profileId, nombre: this.personName };
    return this.httpClient.post(url, data, options);
  }

  public registerUserFace(data: WebcamImage): Observable<any> {
    // tslint:disable-next-line: max-line-length
    const url = `https://facecongnitiveservice.cognitiveservices.azure.com/face/v1.0/persongroups/2977357c-5da6-4a02-aa21-20d2b503109d/persons/${this.personId}/persistedFaces`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'ocp-apim-subscription-key': '69de2854ceeb47f5b06c41c6c0068d66'
    });
    const options = { headers };
    const dataFile = this.dataURItoBlob(data.imageAsBase64);
    return this.httpClient.post(url, dataFile, options);
  }

  public trainingUserFace(): Observable<any> {
    // tslint:disable-next-line: max-line-length
    const url = `https://facecongnitiveservice.cognitiveservices.azure.com/face/v1.0/persongroups/2977357c-5da6-4a02-aa21-20d2b503109d/train`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'ocp-apim-subscription-key': '69de2854ceeb47f5b06c41c6c0068d66'
    });
    const options = { headers };
    return this.httpClient.post(url, null, options);
  }

  public createPerson(data: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    const url = 'https://facecongnitiveservice.cognitiveservices.azure.com/face/v1.0/persongroups/2977357c-5da6-4a02-aa21-20d2b503109d/persons';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'ocp-apim-subscription-key': '69de2854ceeb47f5b06c41c6c0068d66'
    });
    const options = { headers };
    const name = { name: data };
    return this.httpClient.post(url, name, options);
  }



  public createVerificationProfile(): Observable<any> {
    // tslint:disable-next-line: max-line-length
    const url = 'https://speakercongnitiveservice.cognitiveservices.azure.com/spid/v1.0/verificationProfiles';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'ocp-apim-subscription-key': 'b2edd8bac0c5410dbf0a6f37b4be4f2f'
    });
    const options = { headers };
    const body = {
      'locale': 'en-us',
    };
    return this.httpClient.post(url, body, options);
  }

  public registerUserVoice(data: any) {
    // 7e3f805b-928f-49c3-a963-9c21326811d6
    // f3a875ae-874a-4c72-8f9a-814805dc086b
    const url = `https://speakercongnitiveservice.cognitiveservices.azure.com/spid/v1.0/verificationProfiles/${this.profileId}/enroll `;

    // fafc863c-1f92-4a1e-adbb-d250e09ccd64
    // tslint:disable-next-line: max-line-length
    // const url = 'https://speakercongnitiveservice.cognitiveservices.azure.com/spid/v1.0/identificationProfiles/0be3cf1e-61c2-437e-a226-990f78e57a4e/enroll';

    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'ocp-apim-subscription-key': 'b2edd8bac0c5410dbf0a6f37b4be4f2f'
    });
    const options = { headers };
    return this.httpClient.post(url, data, options);
  }

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
}

