import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent {

  loading = true;
  artista: any = {};
  topTracks: any[] = [];

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService) {

    this.loading = true;
    this.router.params.subscribe( params => {
      this.getArtista( params.id );
      this.getTopTracks( params.id );
    });
  }

  getArtista(id: string): void {
    this.loading = true;
    this.spotify.getArtista(id)
      .subscribe( respuesta => {
        console.log(respuesta);
        this.artista = respuesta;
        this.loading = false;
      });
  }

  getTopTracks(id: string): void {
    this.spotify.getTopTracks(id)
      .subscribe( respuesta => {
        console.log(respuesta);
        this.topTracks = respuesta;
      });
  }
}
