import { Identifiers } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class EmpresaService {
      constructor(private urlService: UrlService){}

   obterEmpresa(){
      return this.urlService.sendRequestPost('/Empresa/GetAll');
   }

   cadastrarEmpresa( nome: string){
      return this.urlService.sendRequestPost('/Empresa/Create', JSON.stringify({
      nome}));
   }

   alterarEmpresa(id: number, nome: string, ativo: boolean ){
         return this.urlService.sendRequestPut('/Empresa/Update', JSON.stringify({
            id,
            nome,
            ativo}));
   }

}
