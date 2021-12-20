import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class MotivoPerdaService {
   constructor(
      private http: HttpClient,
      private urlService: UrlService
   ) {}

   obterMotivosPerda() {
      return this.urlService.sendRequestPost(`/MotivoPerda/GetAll`);
   }

   cadastrarMotivoPerda(
      nome: string,
   ) {
      return this.urlService.sendRequestPost(`/MotivoPerda/Create`, JSON.stringify({
         nome
      }));
   }

   alterarMotivoPerda(
      id: number,
      nome: string,
      ativo: boolean,
   ) {
      return this.urlService.sendRequestPut(`/MotivoPerda/Update`, JSON.stringify({
         id,
         nome,
         ativo
      }));
   }


}
