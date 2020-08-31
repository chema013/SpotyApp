import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    console.log('Spotify service listo');
  }

  getQuery( query: string ): any {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer BQBWaZvJ7X0_qjHlgQ_oU5ZxqECvg78MYZ1eB2xRFuhnxWJ6pZBqIkt21a2jPkfWyx5gIvOApAeoi2D5IY8'
    });
    return this.http.get(url, { headers });
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
