import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';

const apiUrl = 'http://localhost:4000/users';
//const baseUrl = `${environment.apiUrl}/users`;

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(apiUrl);
  }

  getById(id: any) {
    return this.http.get<User>(`${apiUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(apiUrl, params);
  }

  update(id: string, params: any) {
    return this.http.put(`${apiUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${apiUrl}/${id}`);
  }
}
