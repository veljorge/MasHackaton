/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AudioRecordingService } from './audio-recording.service';

describe('Service: AudioRecording', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioRecordingService]
    });
  });

  it('should ...', inject([AudioRecordingService], (service: AudioRecordingService) => {
    expect(service).toBeTruthy();
  }));
});
