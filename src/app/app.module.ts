import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http'


import { AppComponent } from './app.component';
import { GiphyComponent } from './components/giphy.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BasketComponent } from './components/basket.component';
import { GiphyserviceService } from './giphyservice.service';
import { PagerComponent } from './components/pager.component';
import { RetrieveComponent } from './components/retrieve.component';

@NgModule({
  declarations: [
    AppComponent,
    GiphyComponent,
    BasketComponent,
    PagerComponent,
    RetrieveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [GiphyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
