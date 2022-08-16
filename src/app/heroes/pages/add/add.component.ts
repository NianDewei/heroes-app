import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass'],
})
export class AddComponent implements OnInit {
  title: string = '';

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    id: '',
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private serviceHeroe: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const isEdit = this.router.url.includes('edit');
    if (isEdit) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.serviceHeroe.getHeroeById(id)))
        .subscribe({
          next: (heroe) => {
            this.heroe = heroe;
            this.title = `Edit Heroe |`;
          },
          error: (err) => {
            if (!err.ok) return console.log('No hay id');
          },
        });
    }

    this.title = `New Heroe |`;
  }

  save() {
    if (this.heroe.superhero.trim().length === 0) return;

    if (!this.heroe.id) this.create();
    if (this.heroe.id) this.update();
  }

  deleteHeroe() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: this.heroe,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.serviceHeroe.delete(this.heroe.id).subscribe({
          complete: () => this._sendMessage('Good job, deleted!'),
        });
        this.backList();
      }
    });

  }

  private create() {
    this.serviceHeroe.save(this.heroe).subscribe({
      next: (heroe) => console.table(heroe),
      complete: () => this._sendMessage('Good job, Created!'),
    });
  }

  private update() {
    this.serviceHeroe.update(this.heroe).subscribe({
      next: (heroe) => console.table(heroe),
      complete: () => this._sendMessage('Good job, Updated!'),
    });
  }

  private backList() {
    this.router.navigate(['/heroes/list']);
  }

  private _showSnackBar(message: string): void {
    this._snackBar.open(message, 'Ok', {
      duration: 4000,
    });
  }

  private _sendMessage(message: string) {
    {
      console.log(message);
      this._showSnackBar(message);
      this.backList();
    }
  }
}
