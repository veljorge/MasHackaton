import { AzureService } from './../../azure.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from '../audio-recording.service';

@Component({
  selector: 'app-capture-info',
  templateUrl: './capture-info.component.html',
  styleUrls: ['./capture-info.component.css']
})
export class CaptureInfoComponent {
  public showAddPersonPanel = false;
  public showAudioPanel = false;
  constructor(private azureService: AzureService) {
  }

  public showImagePerson(): void {
    this.showAddPersonPanel = true;
  }

  public setShowAudioPanel(): void {
    this.showAudioPanel = true;
  }

  public cleanInfo(): void {
    this.showAddPersonPanel = false;
    this.showAudioPanel = false;
    this.azureService.cleanSubject.next();
  }

  public saveDataToDictionary(): void {
    this.azureService.sendDataToOurApi().subscribe(x => {
      alert('the data has been stored!');
    });
  }
}
