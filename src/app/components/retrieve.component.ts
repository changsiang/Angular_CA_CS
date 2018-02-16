import { Component, OnInit, ViewChild } from '@angular/core';
import { GiphyserviceService } from '../giphyservice.service';
import { Result } from '../result';
import { HttpClient } from '@angular/common/http';
import { Data } from '../data';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.css']
})
export class RetrieveComponent implements OnInit {

  @ViewChild('retrieveForm') retrieveForm: NgForm;
  retrievedList: Result[];
  dipSAprojectUrl = 'http://127.0.0.1:8080/GiphyProject/collections/';

  constructor(private giphySvc: GiphyserviceService, private httpClient: HttpClient) { }

  ngOnInit() {
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
