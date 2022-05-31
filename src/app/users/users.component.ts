import { Component, OnInit } from '@angular/core';
import {User} from "./user";
import {UserService} from "./user.service";
import {tap} from "rxjs";
import swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',

})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().pipe(
      tap(users => {
        console.log('ClientesComponent: tap 3')
        users.forEach(user =>{
          console.log(user.name);
        });
      })
    ).subscribe(users => this.users = users);
  }

  delete(user: User): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${user.name} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.userService.delete(user.id).subscribe(
          response => {
            this.users = this.users.filter(cli => cli !== user)
            swal(
              'Cliente Eliminado!',
              `Cliente ${user.name} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}


