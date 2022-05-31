import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, map, catchError, throwError, tap} from "rxjs";
import {User} from "./user";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UrlEndPoint: string = 'http://172.104.192.183:9093/api/user/getUsers';
  private UrlEndPointSave: string = 'http://172.104.192.183:9093/api/user/newUser';
  private UrlEndPointDelete: string = 'http://172.104.192.183:9093/api/user/deleteUser';
  private UrlEndPointUpdate: string = 'http://172.104.192.183:9093/api/user/updateUser';
  private UrlEndPointID: string = 'http://172.104.192.183:9093/api/user/getUser';
  private httpHeaders = new HttpHeaders({'content-Type': 'application/json'})
  constructor(private http: HttpClient, private  router: Router) { }

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(this.UrlEndPoint)
  }

  create(user: User): Observable<User>{
    return this.http.post(this.UrlEndPointSave, user, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.usuario as User),
      catchError(e =>{

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getUsers(id): Observable<User>{
    return this.http.get<User>(`${this.UrlEndPointID}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/users'])
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }

  update(user: User): Observable<any>{
    return this.http.put<any>(`${this.UrlEndPointUpdate}/${user.id}`, user, {headers: this.httpHeaders}).pipe(
      catchError(e =>{

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<User>{
    return this.http.delete<User>(`${this.UrlEndPointDelete}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }
}

