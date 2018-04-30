import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

export interface Iot {
  name: string;
}

@Injectable()
export class IotService {
  constructor(private http: HttpClient) {}

  getAllCats(): Observable<any> {
    console.log('reach iot service');
    return this.http.get('http://localhost:3000/')
      .map((res: Response) => {
        console.log('res' + res);
        const str = JSON.stringify(res, null, 4); // (Optional) beautiful indented output.
        console.log(str); // Logs output to dev tools console.

        console.log(res.body);
        console.log(res.status);
        return str;
      });
  }

  getCat(name: string): Observable<Iot> {
    return this.http.get<Iot>('http://localhost:3000/api/cats/' + name);
}

//   insertUser(cat: Iot): Observable<Iot> {
//     return this.http.post<Iot>('http://localhost:8000/api/cats/', cat);
// }
//
//   deleteUser(name: string) {
//     return this.http.delete('http://localhost:8000/api/cats/' + name);
//   }
}
