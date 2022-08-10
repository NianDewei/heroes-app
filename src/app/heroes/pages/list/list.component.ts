import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
  heroes: Heroe[] = [];

  constructor(private readonly heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe({
      next: (data) => (this.heroes = data),
    });
  }
}
