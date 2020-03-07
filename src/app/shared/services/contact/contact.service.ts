import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
const BACKEND_URL = env.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  async getMessages(): Promise<any> {
    return this.http.get(BACKEND_URL + 'message/');
  }

  async getOneMessage(id: string): Promise<any> {
    return this.http.get(BACKEND_URL + 'message/' + id);
  }

  async delete(id: string): Promise<any> {
    return this.http.delete(BACKEND_URL + 'message/' + id);
  }
}
