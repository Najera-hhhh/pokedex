import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Result } from '../../interface/IPokeApi';
import { PokemonService } from '../../services/pokemon.service';
import { IPokemon } from '../../interface/IPokemon';

@Component({
  selector: 'app-tarjeta-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrl: './tarjeta-pokemon.component.scss'
})
export class TarjetaPokemonComponent implements OnChanges {

  @Input() data?: Result;
  @Input() seleccionado: boolean;
  @Output() pokemonSelected;
  @Input() fullData?: IPokemon;
  id?: number;

  /**
   *
   */
  constructor(private pokemonService: PokemonService) {
    this.pokemonSelected = new EventEmitter<number>();
    this.seleccionado = false;
  }

  ngOnChanges(): void {
    this.extractPokemonId();
  }

  async extractPokemonId() {
    if(this.data && this.data.url !== ""){
      this.id = Number(this.data.url.substring(34,this.data.url.length-1));
      return
    }
    if(this.fullData){
      this.id = Number(this.fullData.species.url.substring(42,this.fullData.species.url.length-1));
      this.data = {
        name:this.fullData.species.name,
        url: ""
      }
    }
  }

}
