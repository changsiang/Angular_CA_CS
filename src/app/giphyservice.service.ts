import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Result } from './result';

@Injectable()
export class GiphyserviceService {

  added = new EventEmitter<Result>();
  removed = new EventEmitter<number>();

}
