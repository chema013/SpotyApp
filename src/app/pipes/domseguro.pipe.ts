import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';


@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ){ }

  transform( value: string, url: string): any {
    const separados = value.split(':');
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`${url}${separados[1]}/${separados[2]}`);
  }

}
