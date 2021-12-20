import { Injectable } from '@angular/core';
import { UrlService }  from '../../../shared/class/url-service';

@Injectable()
export class ConsultaPublicaService {

   constructor(private urlService: UrlService) { }

   getConsultaPublica(
      numConsulta: string,
      nomeCliente: string,
      nomeEmpresa: string,
      dataRespostaInicio: string,
      dataRespostaFinal: string,
   ) {
      return this.urlService.sendRequestPost(`/ConsultaPublica/GetAll`,
         JSON.stringify({
            numConsulta: Number(numConsulta),
            clienteId: Number(nomeCliente),
            empresaId: Number(nomeEmpresa),
            dataRespostaInicio: dataRespostaInicio,
            dataRespostaFinal: dataRespostaFinal,
         }));
   }

   getGetDadosForm() {
      return this.urlService.sendRequestPost(`/ConsultaPublica/GetDadosForm`);
   }

   cadastrarConsultaPublica(
      numConsulta: number,
      nomeCliente: string,
      nomeEmpresa: string,
      objeto: string,
      horaResposta: string,
      dataResposta: string,
      anexo: any
   ) {
      return this.urlService.sendRequestPost(`/ConsultaPublica/Create`,
         JSON.stringify({
            numConsulta: numConsulta,
            clienteId: Number(nomeCliente),
            empresaId: Number(nomeEmpresa),
            objeto: objeto,
            horaResposta: horaResposta,
            dataResposta: dataResposta,
            anexo: anexo
         }));
   }

   alterarConsultaPublica(
      id: number,
      numConsulta: number,
      nomeCliente: string,
      nomeEmpresa: string,
      objeto: string,
      horaResposta: string,
      dataResposta: string,
      anexo: any
   ) {
      return this.urlService.sendRequestPut(`/ConsultaPublica/Update`,
         JSON.stringify({
            id: id,
            numConsulta: numConsulta,
            clienteId: Number(nomeCliente),
            empresaId: Number(nomeEmpresa),
            objeto: objeto,
            horaResposta: horaResposta,
            dataResposta: dataResposta,
            anexo: anexo
         }));
   }

   obterConsultaPublica(
      id: number
   ) {
      return this.urlService.sendRequestPost(`/ConsultaPublica/GetById?id=${id}`);
   }

   deletarConsultaPublica(
      id: number
   ) {
      return this.urlService.sendRequestDelete(`/ConsultaPublica/Delete?id=${id}`);
   }

   getUser(){
      return this.urlService.getUser();
   }
}
