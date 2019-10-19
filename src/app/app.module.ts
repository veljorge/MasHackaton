import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaptureInfoComponent } from './capture-info/capture-info.component';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { AudioRecordingService } from './audio-recording.service';
import { AudioComponent } from './audio/audio.component';
import { ImageCaptureComponent } from './image-capture/image-capture.component';
import { PersonManagePanelComponent } from './person-manage-panel/person-manage-panel.component';
import { FormsModule } from '@angular/forms';
import { VerificationProfileManagePanelComponent } from './verification-profile-manage-panel/verification-profile-manage-panel.component';

@NgModule({
   declarations: [
      AppComponent,
      CaptureInfoComponent,
      AudioComponent,
      ImageCaptureComponent,
      PersonManagePanelComponent,
      VerificationProfileManagePanelComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      WebcamModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
      AudioRecordingService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
