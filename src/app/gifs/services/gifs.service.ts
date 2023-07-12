import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private api_Key:       string = 'ubjm3wbBjjx4NDPqaR7X3jIsRULsJYiM';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs/search'

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
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  public loadLocalStolrage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!) 
  }

  searchTag(tag:string):void{
    this.organizeHistory(tag);

    const params = new HttpParams()
    
    .set('api_key', this.api_Key)
    .set('q' , tag)
    .set('limit', '10')

    this.http.get<SearchResponse>( `${this.serviceUrl}?${params}`)
    .subscribe(resp=>{
      this.gifList = resp.data;
      console.log({gifs: this.gifList})
    })
  }
}
