import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(public _userService: UserService) { }
  user: UserModel = new UserModel();

  ngOnInit(): void {
  }

  postUsuario(){
    console.log(this.user); 
    this._userService.postUser(this.user).then((data: any) =>{
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Usuario Insertado',
      })
      this.ngOnInit();
    }).catch((err) =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: ' Ocurrio algo inesperado',
      })
    });
  }
}
