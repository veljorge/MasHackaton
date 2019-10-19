/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AzureService } from './azure.service';

describe('Service: Azure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AzureService]
    });
  });

  it('should ...', inject([AzureService], (service: AzureService) => {
    expect(service).toBeTruthy();
  }));
});
