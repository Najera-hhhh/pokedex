import { Component, Input } from '@angular/core';
import { IPokemon } from '../../interface/IPokemon';

@Component({
  selector: 'app-foto-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './foto-pokemon.component.html',
  styleUrl: './foto-pokemon.component.scss'
})
export class FotoPokemonComponent {
  @Input() pokemon?: IPokemon;
}
