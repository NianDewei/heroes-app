import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  term: string = '';
  heroes: Heroe[] = [];
  heroeSelected!: Heroe;
  notFoundHeroe: boolean = false;

  constructor(private readonly serviceHeroes: HeroesService) {}

  ngOnInit(): void {}

  // method

  searching(term: string) {
    this.serviceHeroes.getSuggestions(term).subscribe({
      next: (suggestions) => {
        this.heroes = suggestions;
        this.isExistsHeroes();
      },
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    const heroe: Heroe = event.option.value;
    this.term = heroe.superhero;
    // search by id , return an heroe
    this.serviceHeroes.getHeroeById(heroe.id).subscribe({
      next: (heroe) => (this.heroeSelected = heroe),
    });
  }

  private isExistsHeroes() {
    this.heroes.length == 0
      ? (this.notFoundHeroe = true)
      : (this.notFoundHeroe = false);
  }
}
