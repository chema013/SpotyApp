import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { url } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  // url = 'http://localhost:8080/token';
  token: string;

  constructor( private http: HttpClient ) {
    console.log('Spotify service listo');
    this.tokenClaro();
  }

  getToken(): any {
    return this.http.get( url ).toPromise()
      .then(res => res)
      .catch(err => err.error);
  }

  async tokenClaro(): Promise<any> {
    const token = await this.getToken();
    // console.log(token.token.access_token);
    this.token = token.token.access_token;
  }

  getQuery( query: string ): any {
    const url = `https://api.spotify.com/v1/${ query }`;
    // console.log(this.token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    try {
      return this.http.get(url, { headers });
    } catch (error) {
      this.tokenClaro();
      return this.http.get(url, { headers });
    }
  }

  getTrack( track: string ): any {
    return this.getQuery(`search?q=${ track }&type=track&market=mx&limit=5`)
              .pipe( map( data => data['tracks'].items ));
  }

  getNewReleases(): any{

    return this.getQuery('browse/new-releases')
              .pipe( map( data => data['albums'].items ));
  }

  getArtistas( termino: string ): any {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
            .pipe( map( data => data['artists'].items ));
  }

  getArtista( id: string ): any {
    return this.getQuery(`artists/${id}`);
            // .pipe( map( data => data['artists'].items ));
  }

  getTopTracks( id: string ): any {
    return this.getQuery(`artists/${id}/top-tracks?country=MX`)
            .pipe( map( data => data['tracks'] ));
  }
}
