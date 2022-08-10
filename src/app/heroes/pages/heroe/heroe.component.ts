import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.sass'],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;
  constructor(
    private activedRoute: ActivatedRoute,
    private serviceHeroe: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.params
      .pipe(switchMap(({ id }) => this.serviceHeroe.getHeroeById(id)))
      .subscribe({ next: (heroe: Heroe) => (this.heroe = heroe) });
  }

  // private getHeroe(id: string) {
  //   this.serviceHeroe
  //     .getHeroeById(id)
  //     .subscribe({ next: (data) => (this.heroe = data) });
  // }

  backList() {
    this.router.navigate(['/heroes/list']);
  }
}
