import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpParams, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Data } from './data';
import { Result } from './result';
import { GiphyserviceService } from './giphyservice.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { HttpClientJsonpModule } from '@angular/common/http/src/module';
import { jsonObject } from './jsonObject';
import { query } from '@angular/core/src/animation/dsl';
import { Pagination } from './pagination';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Giphy Sticker Book';
  url = 'https://api.giphy.com/v1/gifs/search';
  dipSAprojectUrl = 'http://127.0.0.1:8080/GiphyProject/collections/'
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('retrieveForm') retrieveForm: NgForm;
  @ViewChild('selectedForm') selectedForm: NgForm;
  retrievedList: Result[];
  results: Result[];
  contents: Result[] = [];
  jsonObject: jsonObject;
  pagination: Pagination;

  private addSub: Subscription;
  private removeSub: Subscription;
  private deleteSub: Subscription;
  private returnSub: Subscription;

  constructor(private httpClient: HttpClient, private giphySvc:GiphyserviceService){

  }

  ngOnInit(){
    this.addSub = this.giphySvc.added.subscribe((data) => {
      this.contents.unshift(data);
    })

    this.removeSub = this.giphySvc.removed.subscribe((i) => {
      this.contents.splice(i, 1);
    })
    
    this.deleteSub = this.giphySvc.delete.subscribe((i) => {
      this.results.splice(i, 1);
    })

    this.returnSub = this.giphySvc.return.subscribe((data) =>{
      this.results.push(data);
    })

  }

  processSearch(page: number): void{
    this.results = [];

    const queryParams = new HttpParams()
    .set("api_key", "UPpDj2qgw8b0SQe2do0XFh0OTlc4zg0Q")
    .set("q", this.searchForm.value.searchBox)
    .set("limit", "25")
    .set("offset", (page * 25).toString());

    this.httpClient.get<Data>(this.url,{params: queryParams})
    .subscribe((data) => {
      console.log("data ", data);
      console.log("pagination", data.pagination)
      this.pagination = {total_count: data.pagination.total_count, count: data.pagination.count, offset: data.pagination.offset};
      console.log(">>> Current Page" + (Math.ceil(this.pagination.offset / this.pagination.count)).toString());
      console.log(">>> Total Pages" + (Math.ceil(this.pagination.total_count / this.pagination.count)).toString());
      for(let i of data.data)
      {
        this.results.push({
          id: i.id,
          slug: i.slug,
          imageUrl: `https://media1.giphy.com/media/${i.id}/giphy.gif`,
        })
        console.log("i", i.id);
      }   
   }  
  )
    console.log(">>> Submit Button Pressed " + this.searchForm.value.searchBox);

  }
  
  postData(serverUrl: string, data:jsonObject){
   
    var httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    this.httpClient.post(serverUrl, JSON.stringify(data), httpOptions)
    .subscribe((res) => {console.log(">>> httpPost", res);
  })
  }

  saveList(){
    this.jsonObject = {data: this.contents, userId: this.selectedForm.value.userId, collectionName: this.selectedForm.value.collectionName};
    console.log(this.postData(this.dipSAprojectUrl, this.jsonObject));
    console.log(JSON.stringify(this.jsonObject));
    //clear the list after it has been submitted
    this.contents.splice(0, this.contents.length);
  }

  retrieveList(){
    this.retrievedList = [];

    var queryUrl = this.dipSAprojectUrl + this.retrieveForm.value.userId + "/" + this.retrieveForm.value.collectionName;
    this.httpClient.get<Data>(queryUrl)
    .subscribe((data) => {
      console.log(">>> RetrieveData", data)

      for (let i of data.data){
        this.retrievedList.push({
          id: i.id,
          imageUrl: `https://media1.giphy.com/media/${i.id}/giphy.gif`,
          slug: "nothing"
        })
        console.log("i", i.id);
      }
    })

    
  }
}
