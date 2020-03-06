import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
const BACKEND_URL = env.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  async getAllProjects(): Promise<any> {
    try {
      return this.http.get(BACKEND_URL + 'project/');
    } catch (error) {
      console.log(error);
    }
  }

  async getOneProject(id: string): Promise<any> {
    return this.http.get(BACKEND_URL + 'project/' + id);
  }

  async create(project: any): Promise<any> {
    return this.http.post(
      BACKEND_URL + 'project',
      {
        project
      }
    );
  }

  async update(id: string, project: any): Promise<any> {
    return this.http.put(
      BACKEND_URL + 'project/' + id,
      {
        project
      }
    );
  }

  async delete(id: string): Promise<any> {
    return this.http.delete(BACKEND_URL + 'project/' + id);
  }
}
