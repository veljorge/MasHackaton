import { Component, OnInit } from '@angular/core';
import { AzureService } from 'src/azure.service';
import { Subject, Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css']
})
export class ImageCaptureComponent implements OnInit {

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  constructor(private azureService: AzureService) {
  }

  ngOnInit() {
  }


  public cleanImage(): void {
    this.webcamImage = null;
  }

  public registerImage(): void {
    this.azureService.registerUserFace(this.webcamImage)
      .subscribe(x => {
        this.azureService.trainingUserFace().subscribe(x => {
        }, e => {
          alert(e.error.error.message);
        });
        alert('the image has been recorded succesfully!!!!!!!!!!');
      },
        e => {
          alert(e.error.error.message);
        }
      );
  }

  public handleImage(webcamImage: WebcamImage) {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

}
