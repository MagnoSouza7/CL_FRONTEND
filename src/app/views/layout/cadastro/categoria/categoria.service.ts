import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class CategoriaService {
   constructor(
      private http: HttpClient,
      private urlService: UrlService
   ) {}

   obterCategorias() {
      return this.urlService.sendRequestPost(`/Categoria/GetAll`);
   }

   obterDadosForm() {
      return this.urlService.sendRequestPost(`/Categoria/GetDadosCategoria`);
   }

   cadastrarCategoria(nome: string, bu: string) {
      return this.urlService.sendRequestPost(`/Categoria/Create`, JSON.stringify({
         nome,
         buId: Number(bu)
      }));
   }

   alterarCategoria(id: number, nome: string, bu: string, ativo: boolean) {
      return this.urlService.sendRequestPut(`/Categoria/Update`, JSON.stringify({
         id,
         nome,
         buId: Number(bu),
         ativo
      }));
   }


}
