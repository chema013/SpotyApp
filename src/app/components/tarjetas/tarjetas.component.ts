import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent {

  @Input() items: any[] = [];

  constructor(private router: Router) { }

  verArtista( cancion: any ): void {
    let artistaId;

    if (cancion.type === 'artist') {
      artistaId = cancion.id;
    } else {
      artistaId = cancion.artists[0].id;
    }
    this.router.navigate(['/artist', artistaId]);
  }
}
