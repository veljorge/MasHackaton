import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioRecordingService } from '../audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AzureService } from 'src/azure.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit, OnDestroy {
  public counter = 0;
  public isRecording = false;
  public recordedTime;
  public blobUrl;
  public rawaudio;

  constructor(private azureService: AzureService, private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.rawaudio = data.blob;
    });

    this.azureService.cleanSubject.subscribe(x => {
      this.counter = 0;
    });

    this.azureService.profileIdSubject.subscribe(x => {
      this.counter = 0;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }


  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  saveRecordedData() {
    this.azureService.registerUserVoice(this.rawaudio).subscribe(response => {
      alert('the voice has been recorded');
      this.counter = this.counter + 1;
      this.blobUrl = null;
    }, e => {
      alert(e.error.error.message);
      this.blobUrl = null;
    });
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }


}
