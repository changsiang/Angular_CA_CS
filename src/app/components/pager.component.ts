import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input()
  page: number = 1;

  @Input()
  totalPages: number = 0;


  constructor() { }

  next(){}

  prev(){}

  ngOnInit() {
  }

}
