import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http'


import { AppComponent } from './app.component';
import { GiphyComponent } from './components/giphy.component';


@NgModule({
  declarations: [
    AppComponent,
    GiphyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
