import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from
'@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    })
    }   

    apiURL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getUser(id):Observable<any>{
    return this.http.get(this.apiURL+'/users/'+id).pipe(
    retry(3)
    );
  }

  getUsers():Observable<any>{
    return this.http.get(this.apiURL+'/users/').pipe(
    retry(3)
    );
  }

  getAuto(id):Observable<any>{
    return this.http.get(this.apiURL+'/autos/'+id).pipe(
    retry(3)
    );
  }

  getAutos():Observable<any>{
    return this.http.get(this.apiURL+'/autos/').pipe(
    retry(3)
    );
  }

  createAuto(auto):Observable<any>{
    return this.http.post(this.apiURL+'/autos/',auto,this.httpOptions)
    .pipe(
    retry(3)
    );
  }

  deleteAuto(id):Observable<any>{
    return this.http.delete(this.apiURL+'/autos/'+id,this.httpOptions);
    }
}
