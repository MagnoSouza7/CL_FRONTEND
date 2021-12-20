import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class PortalService {
   constructor(
      private http: HttpClient,
      private urlService: UrlService
   ) {}

   obterPortais() {
      return this.urlService.sendRequestPost(`/Portal/GetAll`);
   }

   cadastrarPortal(
      nome: string,
   ) {
      return this.urlService.sendRequestPost(`/Portal/Create`,
         JSON.stringify({
            nome
         }));
   }

   alterarPortal(
      id: number,
      nome: string,
      ativo: boolean,
   ) {
      return this.urlService.sendRequestPut(`/Portal/Update`,
         JSON.stringify({
            id,
            nome,
            ativo
         }));
   }


}
