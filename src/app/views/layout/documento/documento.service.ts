import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class DocumentoService{
   constructor(private UrlService: UrlService){}

   obterDocumento(){
      return this.UrlService.sendRequestPost(`/Documento/GetAll`)
   }

   obterDocumentoId(id: number){
      return this.UrlService.sendRequestPost(`/Documento/GetById?id=${id}`)
   }

   cadastrarDocumento(descricao: string, anexo: any ){
      return this.UrlService.sendRequestPost(`/Documento/Create`, JSON.stringify({
         descricao: descricao,
         anexo: anexo
      }))
   }

   alterarDocumento(id: number, descricao: string, anexo: any){
      return this.UrlService.sendRequestPut(`/Documento/Update`, JSON.stringify({
         id: id,
         descricao: descricao,
         anexo: anexo
      }))
   }

   deletarDocumento(id: number){
      return this.UrlService.sendRequestDelete(`/Documento/Delete?id=${id}`)
   }

}
