import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UrlService }  from '../../../shared/class/url-service';
import { User } from '../user';
import { Router } from '@angular/router';

@Injectable()
export class ComentarioEditalService {

   constructor(private http: HttpClient, private router: Router, private urlService: UrlService) { }

   obterComentarios(id: string){
      return this.urlService.sendRequestPost(`/Comentario/GetById?id=${id}`);
   }

   cadastrarComentario(
      mensagem: string,
      usuario: number,
      editalId: string
   ) {
      return this.urlService.sendRequestPost(`/Comentario/Create`, JSON.stringify({
         mensagem,
         usuario,
         editalId: Number(editalId)
      }));
   }

   deletarComentario(id: number) {
      return this.urlService.sendRequestDelete(`/Comentario/Delete?id=${id}`);
   }


   getUser(){
      return this.urlService.getUser();
   }
}
