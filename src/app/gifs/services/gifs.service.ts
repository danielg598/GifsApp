import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'AIzaSyDxV5h4fg2Tfglmi-aVLKEP869xdNrZUzI';
  private serviceUrl:   string = 'https://g.tenor.com/v1'

  constructor(private http:HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory]
  }

  private organizeHistory( tag: string){
    tag = tag.toLowerCase();
    if(tag.length === 0 )return;
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory =this._tagsHistory.filter((oldTag)=>oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0,10)
  }

  searchTag(tag:string):void{
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('q' , tag)
    .set('key', this.apiKey)
    .set('limit', '15')
    console.log(params)

    this.http.get(`${this.serviceUrl}/?${params}&client_key=my_test_app`)
    .subscribe(resp=>{
      console.log(resp)
    })
// 'https://api.unsplash.com/photos/?q=goku&client_id=PVQxLS8DRrHzvcartIzcGLQWGAHWJAZA7NSdxJPxPHA&limit=10'
  }
}
