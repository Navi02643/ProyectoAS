import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = environment.urlGlobal;

  constructor(private http: HttpClient) { }



  postUser(user: UserModel) {
    console.log(user);
    return this.http.post(`${this.url}/user`, user).toPromise() ;
    
  }

}

 