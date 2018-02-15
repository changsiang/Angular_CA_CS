import { TestBed, inject } from '@angular/core/testing';

import { GiphyserviceService } from './giphyservice.service';

describe('GiphyserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiphyserviceService]
    });
  });

  it('should be created', inject([GiphyserviceService], (service: GiphyserviceService) => {
    expect(service).toBeTruthy();
  }));
});
