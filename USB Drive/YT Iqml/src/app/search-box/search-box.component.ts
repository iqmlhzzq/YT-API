import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core'
import { Result } from '../result.model'
import { YouTubeSearchService } from '../youtube-search.service' 
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switch'

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() results: EventEmitter<Result[]> = new EventEmitter<Result[]>()

  constructor(private youtube: YouTubeSearchService, private el: ElementRef) { }

  ngOnInit() {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value)           // extract the value of input
      .filter((text: string) => text.length > 1) // filter out if empty
      .debounceTime(250)                         // only once every 250ms
      .do(() => this.loading.emit(true))         // enable loading
      .map((query: string) => this.youtube.search(query))
      .switch()                                  // act on the return of the search
      .subscribe(
        (results: Result[]) => {
          this.loading.emit(false)
          this.results.emit(results)
        }, 
        (err: any) => {
          console.log(err)
          this.loading.emit(false)
        },
        () => { // on completion
          this.loading.emit(false)
        }
      )
  }

}