import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TarjetaPokemonComponent } from "../../components/tarjeta-pokemon/tarjeta-pokemon.component";
import { FotoPokemonComponent } from "../../components/foto-pokemon/foto-pokemon.component";
import { PokemonService } from '../../services/pokemon.service';
import { Result } from '../../interface/IPokeApi';
import { IPokemon } from '../../interface/IPokemon';
import { DetalleComponent } from "../../components/detalle/detalle.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [TarjetaPokemonComponent, FotoPokemonComponent, DetalleComponent]
})
export class HomeComponent implements OnInit {

    listaPokemon: Result[] = []
    page: number = 0;
    cargando: boolean;
    pokemonSelected?: IPokemon;
    detalle: boolean = false;

    @ViewChild('tarjets') tarjetsElement!: ElementRef;

    /**
     *
     */
    constructor(private pokemonService: PokemonService) {
        this.cargando = false;
    }

    ngOnInit(): void {
        this.loadingPokemonList();
    }

    async select(event: any) {
        this.pokemonSelected = await this.pokemonService.getById(event);
        console.log(this.pokemonSelected);
    }

    async loadingPokemonList() {
        const pokemonsAdd = await this.pokemonService.getByPage(this.page);
        this.listaPokemon = [...this.listaPokemon, ...pokemonsAdd];
        this.page++;
        this.cargando = false;
    }

    onScroll(event: any) {
        if (this.cargando)
            return;

        if (
            Math.round(this.tarjetsElement.nativeElement.clientHeight + this.tarjetsElement.nativeElement.scrollTop) ==
            event.srcElement.scrollHeight
        ) {
            this.loadingPokemonList();
        }
    }

    cambiarEstadoDetalle() {
        if (this.pokemonSelected) this.detalle = !this.detalle;
    }
}
