import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(form: { value: UserModel; }): void {
    this.authService.register(form.value).subscribe(res => {
      this.router.navigateByUrl('/login');
    });
  }

}