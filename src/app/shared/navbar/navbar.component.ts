import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  admin = false;

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.admin = this.auth.esAdmin();
  }


  cerrarSesion() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
 }

}
