import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  // getter
  get auth(): User {
    return this._authService.user;
  }

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this._authService.logout();
    this._router.navigate(['/auth']);
  }
}
