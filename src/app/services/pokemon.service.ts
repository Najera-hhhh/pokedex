import { Injectable } from '@angular/core';
import { IPokeApi, Result } from '../interface/IPokeApi';
import { IPokemon } from '../interface/IPokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  async getByPage(page: number = 0, size: number = 40): Promise<Result[]> {
    const offset = size * page;

    const result: IPokeApi = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${size}&offset=${offset}`)
      .then(result => result.json());

    return result.results;
  }

  async getById(id: number): Promise<IPokemon> {
    const result: IPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(result => result.json());

    return result;
  }

  async getDescription(id: string): Promise<string> {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then(result => result.json());

    const texto = result.flavor_text_entries.find((texto: any) => texto.language.name === "es")
    return texto.flavor_text;
  }


}
