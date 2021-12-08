import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { projectModel } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = 'http://localhost:5000/api/projects';

  constructor(private http: HttpClient) { }

  insert(project: any){
    return this.http.post(this.url,project);
  }

  getdata():Observable<any>{
    return this.http.get(this.url);
  }
}
