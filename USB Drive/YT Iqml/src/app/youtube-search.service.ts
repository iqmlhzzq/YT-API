import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http' 
import { Result } from './result.model'
import { Observable } from 'rxjs/Observable'

export const YOUTUBE_API_KEY = 'AIzaSyBB6xHIIBZkBJr6RICFjOS9GfSx8gG8Cpk'
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'

@Injectable()
export class YouTubeSearchService {

  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string) { }

  search(query: string): Observable<Result[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&')
    const queryUrl = `${this.apiUrl}?${params}`
    console.log(queryUrl)
    return this.http.get(queryUrl).map(response => {
      return <any>response['items'].map(item => {
        return new Result({
          id: item.id.videoId,
          title: item.snippet.title,
          desc: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        })
      })
    })
  }
}