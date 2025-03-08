import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface URLObject {
  resourceIdentifier: string;
  expiration: number;
  views: number;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CreateLinkService {
  constructor(private http: HttpClient) {}

  createTextSnippet(resource: string, text: string) {
    let body = { resourceIdentifier: resource, text: text };
    return this.http
      .post(
        `https://ex01-comp590-140-25sp-ayushpai.apps.unc.edu/urls/texts`,
        body
      )
      .subscribe((config) => {
        console.log('Created or updated a new text url!:', config);
      });
  }

  createShortURL(resource: string, URL: string) {
    let body = { resourceIdentifier: resource, URL: URL };
    return this.http
      .post(
        `https://ex01-comp590-140-25sp-ayushpai.apps.unc.edu/urls/shorts`,
        body
      )
      .subscribe((config) => {
        console.log('Created or updated a new short url!:', config);
      });
  }

  getAllResources(): Observable<URLObject[]> {
    return this.http.get<URLObject[]>(
      `https://ex01-comp590-140-25sp-ayushpai.apps.unc.edu/`
    );
  }
}
