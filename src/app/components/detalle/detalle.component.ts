import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPokemon } from '../../interface/IPokemon';
import { PokemonService } from '../../services/pokemon.service';
import { TarjetaPokemonComponent } from "../tarjeta-pokemon/tarjeta-pokemon.component";

@Component({
    selector: 'app-detalle',
    standalone: true,
    templateUrl: './detalle.component.html',
    styleUrl: './detalle.component.scss',
    imports: [TarjetaPokemonComponent]
})
export class DetalleComponent {
  @Input() pokemon?: IPokemon;
  @Input() abierto:boolean = false;
  @Output() clicked = new EventEmitter();
  descripcion: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(): void {
    if (this.pokemon) {
      this.pokemonService.getDescription(this.pokemon?.id.toString()).then((res) => {
        this.descripcion = res
      });
    }
  }

}
