import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Result } from './result';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GiphyserviceService {

  added = new EventEmitter<Result>();
  removed = new EventEmitter<number>();
  delete = new EventEmitter<number>();
  return = new EventEmitter<Result>();
  searchQuery = new EventEmitter<any>();


  constructor(private httpClient : HttpClient){}

  getSearchResults(url: string, searchQuery: string, page: number, apiKey: string, limit: number) : Promise<any>{
    const queryParams = new HttpParams()
    .set("api_key", apiKey)
    .set("q", searchQuery)
    .set("limit", limit.toString())
    .set("offset", (page * limit).toString());

    return (this.httpClient.get(url,{params : queryParams})
    .take(1)
    .toPromise());

  }
}
