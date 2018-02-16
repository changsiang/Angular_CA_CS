import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Result } from './result';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import { jsonBasket } from './jsonBasket';

@Injectable()
  export class GiphyserviceService {

  searchQuery = new EventEmitter<any>();

  searchUrl = 'https://api.giphy.com/v1/gifs/search';
  apiKey = 'UPpDj2qgw8b0SQe2do0XFh0OTlc4zg0Q';
  servletUrl = `/GiphyProject/collections/`;

  basket: Result[] = [];
  results: Result[] = [];
  retrievedList: Result[] = [];
  page: number = 0;
  totalPages: number;
  queryString: string;



  constructor(private httpClient : HttpClient){}

  getSearchResults(searchQuery: string, page: number, limit: number) : Promise<any>{
    const queryParams = new HttpParams()
    .set("api_key", this.apiKey)
    .set("q", searchQuery)
    .set("limit", limit.toString())
    .set("offset", (page * limit).toString());

    return (this.httpClient.get(this.searchUrl,{params : queryParams})
    .take(1)
    .toPromise());

  }

  getSavedResults(userId: string, collectionName: string) : Promise<any>{
    var queryUrl = this.servletUrl + userId + "/" + collectionName;
    
    return (this.httpClient.get(queryUrl)
    .take(1))
    .toPromise();
  }

  postSelectedGifs(jsonBasket: jsonBasket){
    var httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    this.httpClient.post(this.servletUrl, JSON.stringify(jsonBasket), httpOptions)
    .subscribe((res) => {console.log(">>> httpPost", res)})

    //Reset the basket after the data is posted to the database
    this.basket = [];
  }
}
  


