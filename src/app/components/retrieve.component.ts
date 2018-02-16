import { Component, OnInit, ViewChild } from '@angular/core';
import { GiphyserviceService } from '../giphyservice.service';
import { Result } from '../result';
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

  constructor(private giphySvc: GiphyserviceService) { }

  ngOnInit() {
    this.retrievedList = this.giphySvc.retrievedList;
  }

  retrieveList(){
    this.retrievedList = [];

    this.giphySvc.getSavedResults(this.retrieveForm.value.userId, this.retrieveForm.value.collectionName)
    .then((data) => {
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
    this.giphySvc.retrievedList = this.retrievedList;
  }
}
