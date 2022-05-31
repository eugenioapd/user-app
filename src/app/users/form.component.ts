import { Component, OnInit } from '@angular/core';
import {User} from "./user";
import {UserService} from "./user.service";
import {Router, ActivatedRoute} from "@angular/router";
import swal from "sweetalert2"

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public usuario: User = new  User()
  public titulo: string = "Crear Usuario"

  public errores: string[];

  constructor(private userService: UserService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsers()
  }

  cargarUsers(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.userService.getUsers(id).subscribe((user) => this.usuario = user)
      }
    })
  }

  create(): void{
    this.userService.create(this.usuario).subscribe(
      user => {
        this.router.navigate(['/users'])
        swal('Nuevo usuario', `El usuario ha sido craedo con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void{
    this.userService.update(this.usuario).subscribe(json => {
        this.router.navigate(['/users'])
        swal('Usuario actualizado', `${json.mensaje}`,
          'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

}
