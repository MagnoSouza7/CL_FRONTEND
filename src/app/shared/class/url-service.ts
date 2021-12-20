import { User } from 'src/app/views/layout/user';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {

   static BACKEND_URL: string = location.origin + "/api";    // conf prod
   //static BACKEND_URL: string = "https://cl.globalweb.com.br/api";    // conf prod2
   //static BACKEND_URL: string = "http://localhost:53273/api";    // conf dev

   private user: User;
   private header: any;

   constructor(private router: Router, private http: HttpClient) {
      if ('user' in localStorage)
         this.user = JSON.parse(localStorage.getItem('user'));
      else if ('user' in sessionStorage)
         this.user = JSON.parse(sessionStorage.getItem('user'));
      else{
         this.router.navigate(['/login']);
         return;
      }
   }

   getHeaders() {
      this.header = {
         headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this.user.token}`)
            .set('Content-Type', 'application/json;charset=utf-8')

      };

      return this.header;
   }

   getUser(){
      return this.user;
   }

   sendRequestPostWithoutHeaders(url: string, body: string = ""){
      return this.http.post(UrlService.BACKEND_URL+url, body);
   }

   sendRequestPost(url: string, body: string = ""){
      return this.http.post(UrlService.BACKEND_URL+url, body, this.getHeaders());
   }

   sendRequestPut(url: string, body: string = ""){
      return this.http.put(UrlService.BACKEND_URL+url, body, this.getHeaders());
   }

   sendRequestDelete(url: string){
      return this.http.delete(UrlService.BACKEND_URL+url, this.getHeaders());
   }

   sendRequestFetchPost(url: string, body: string = ""){
      return fetch(UrlService.BACKEND_URL+url, {
         method: 'POST',
         body: body,
         headers: {
           "Content-Type": this.getHeaders()["headers"].get("Content-Type"),
           "Authorization": this.getHeaders()["headers"].get("Authorization")
         }
       });
   }
}
