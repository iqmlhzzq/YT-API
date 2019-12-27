import { Component, OnInit } from '@angular/core'
import { Result } from '../result.model'

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})
export class YouTubeSearchComponent implements OnInit {
  results: Result[]
  loading: boolean

  constructor() { }

  ngOnInit() { }

  updateResults(results: Result[]): void {
    this.results = results
  }

}