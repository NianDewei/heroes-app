import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
})
export class ListHeroesComponent implements OnInit {
  
  @Input('dataHeroe') heroe!: Heroe;

  constructor() {}

  ngOnInit(): void {}
}
