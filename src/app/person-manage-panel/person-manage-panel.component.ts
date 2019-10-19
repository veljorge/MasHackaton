import { AzureService } from 'src/azure.service';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-person-manage-panel',
  templateUrl: './person-manage-panel.component.html',
  styleUrls: ['./person-manage-panel.component.css']
})
export class PersonManagePanelComponent implements OnInit {

  public personId: string;
  public personName: string;
  @Output() personAdded = new EventEmitter<string>();
  constructor(private azureService: AzureService) { }

  ngOnInit() {
    this.azureService.cleanSubject.subscribe(x => {
      this.personId = '';
      this.personName = '';
    });
  }

  createPerson(): void {
    this.azureService.createPerson(this.personName).subscribe(response => {
      this.personId = response.personId;
      this.azureService.personId = this.personId;
      this.azureService.personName = this.personName;
      this.personAdded.emit(this.personId);
      alert('the person was added!');
    }, e => {
      alert(e.error.error.message);
    });
  }

}
