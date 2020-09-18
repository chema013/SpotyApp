import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  tracks: any[] = [];
  loading: boolean;

  constructor( private spotify: SpotifyService ) { }

  ngOnInit(): void {
  }

  buscar( forma: NgForm ): void{
    console.log( forma.value.cancion );
    const cancion = forma.value.cancion;
    this.loading = true;
    console.log(cancion);
    this.spotify.getTrack(cancion)
      .subscribe( (data: any) => {
        console.log(data);
        this.tracks = data;
        this.loading = false;
      });
    console.log( this.tracks );
  }

}
