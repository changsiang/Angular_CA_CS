import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpParams, HttpClient, HttpClientModule } from '@angular/common/http';
import { Data } from './data';
import { Result } from './result';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Giphy Search Application';
  url = 'https://api.giphy.com/v1/gifs/search';
  @ViewChild('searchForm') searchForm: NgForm;
  results: Result[];


  constructor(private httpClient: HttpClient){

  }

  processSearch(): void{
    this.results = [];

    const queryParams = new HttpParams()
    .set("api_key", "UPpDj2qgw8b0SQe2do0XFh0OTlc4zg0Q")
    .set("q", this.searchForm.value.searchBox)
    .set("limit", "25");

    this.httpClient.get<Data>(this.url,{params: queryParams})
    .subscribe((data) => {
      console.log("data ", data);

      for(let i of data.data)
      {
        this.results.push({
          id: i.id,
          slug: i.slug,
          imageUrl: `https://media1.giphy.com/media/${i.id}/giphy.gif`
        })
        console.log("i", i.id);
      }
      
    })
    
    console.log(">>> Submit Button Pressed " + this.searchForm.value.searchBox);

  }
}
