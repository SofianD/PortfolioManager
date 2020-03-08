import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
const BACKEND_URL = env.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private http: HttpClient
  ) { }

  //////////////////////////////////////////////////////////////
  ////   SKILL SECTION

  async addSkill(skill): Promise<any> {
    return this.http.post(BACKEND_URL + 'skill/', {skill: skill});
  }

  async updateSkill(skill): Promise<any> {
    return this.http.put(BACKEND_URL + 'skill/' + skill._id, {skill})
  }

  async deleteSkill(id:string): Promise<any> {
    return this.http.delete(BACKEND_URL + 'skill/' + id);
  }

  async getSkills(): Promise<any> {
    return this.http.get(BACKEND_URL + 'skill/');
  }

  async getOneSkill(id: string): Promise<any> {
    return this.http.get(BACKEND_URL + 'skill/' + id);
  }


  //////////////////////////////////////////////////////////////
  ////   FRAMEWORK SECTION
  async addFm(framework): Promise<any> {
    return this.http.post(BACKEND_URL + 'framework/', {framework});
  }

  async updateFm(framework): Promise<any> {
    return this.http.put(BACKEND_URL + 'framework/' + framework._id, {framework})
  }

  async deleteFm(id:string): Promise<any> {
    return this.http.delete(BACKEND_URL + 'framework/' + id);
  }

  async getAllFm(): Promise<any> {
    return this.http.get(BACKEND_URL + 'framework/');
  }

  async getOneFm(id: string): Promise<any> {
    return this.http.get(BACKEND_URL + 'framework/' + id);
  }


  //////////////////////////////////////////////////////////////
  ////   PLATFORM SECTION
  async addPlatform(platform): Promise<any> {
    return this.http.post(BACKEND_URL + 'platform/', {platform});
  }

  async updatePlatform(platform): Promise<any> {
    return this.http.put(BACKEND_URL + 'platform/' + platform._id, {platform})
  }

  async deletePlatform(id:string): Promise<any> {
    return this.http.delete(BACKEND_URL + 'platform/' + id);
  }

  async getPlatforms(): Promise<any> {
    return this.http.get(BACKEND_URL + 'platform/');
  }

  async getOnePlatform(id: string): Promise<any> {
    return this.http.get(BACKEND_URL + 'platform/' + id);
  }
}
