import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class PreVendaService {
   constructor(
      private http: HttpClient,
      private urlService: UrlService
   ) {}

   obterPreVendas() {
      return this.urlService.sendRequestPost(`/PreVenda/GetAll`);
   }

   verifyPreVenda(
      id: number
   ) {
      return this.urlService.sendRequestPost(`/PreVenda/VerifyPreVenda?id=${id}`);
   }

   obterDadosPreVenda() {
      return this.urlService.sendRequestPost(`/PreVenda/GetDadosPreVenda`);
   }

   cadastrarPreVenda(
      usuarioId: string,
   ) {
      return this.urlService.sendRequestPost(`/PreVenda/Create`,
         JSON.stringify({
            usuarioId: Number(usuarioId)
         }));
   }

   alterarPreVenda(
      id: number,
      usuarioId: string,
      ativo: boolean,
   ) {
      return this.urlService.sendRequestPut(`/PreVenda/Update`, JSON.stringify({
         id,
         usuarioId: Number(usuarioId),
         ativo
      }));
   }


}
