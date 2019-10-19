import { AzureService } from 'src/azure.service';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-verification-profile-manage-panel',
  templateUrl: './verification-profile-manage-panel.component.html',
  styleUrls: ['./verification-profile-manage-panel.component.css']
})
export class VerificationProfileManagePanelComponent implements OnInit {
  public profileId: string;
  @Output() profileVerificationId = new EventEmitter<string>();

  constructor(private azureService: AzureService) { }

  ngOnInit() {
    this.azureService.cleanSubject.subscribe(x => {
      this.profileId = null;
    });
  }

  addVerificationProfile(): void {
    this.azureService.createVerificationProfile().subscribe(x => {
      this.profileId = x.verificationProfileId;
      this.azureService.profileId = this.profileId;
      this.profileVerificationId.emit(this.profileId);
      this.azureService.profileIdSubject.next(this.profileId);
      alert('profile was created');
    }, e => {
      alert(e.error.error.message);
    });
  }

}
