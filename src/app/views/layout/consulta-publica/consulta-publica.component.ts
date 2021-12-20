import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultaPublicaService } from './consulta-publica.service';
import { Arquivo } from 'src/app/shared/upload/arquivo';
import { Alertas } from 'src/app/shared/class/alertas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user';

@Component({
   selector: 'app-consulta-publica',
   templateUrl: './consulta-publica.component.html',
   styleUrls: ['./consulta-publica.component.css'],
})
export class ConsultaPublicaComponent implements OnInit {
   public consultaPublicaFiltroForm: FormGroup;

   public consultaPublicaForm: FormGroup;
   public consultaPublicaUpdateForm: FormGroup;

   public nomeColuna: string = '';
   public consultaPublicaAtivo: any;
   public consultaPublicaDesativada: any;
   public consultaPublicaId: number;
   public dadosForm: any;
   public exibirUploadCadastro = false;
   public arquivoCadastro: Arquivo = new Arquivo();

   public consultaPublicaUpdate: any
   public exibirUploadUpdate: boolean = false
   public arquivoUpdate: Arquivo = new Arquivo()

   public user: User = new User();

   constructor(
      private consultaPublicaService: ConsultaPublicaService,
      private fb: FormBuilder,
      private alertas: Alertas,
      private modalService: NgbModal) {}

   ngOnInit(): void {
      if("user" in localStorage){
         this.user = JSON.parse(localStorage.getItem("user"));
      }

      else if("user" in sessionStorage){
         this.user = JSON.parse(sessionStorage.getItem("user"));
      }

      this.consultaPublicaFiltroForm = this.fb.group({
         id: this.fb.control(''),
         nomeEmpresa: this.fb.control(''),
         numeroConsulta: this.fb.control(''),
         nomeCliente: this.fb.control(''),
         dataRespostaInicio: this.fb.control(''),
         dataRespostaFinal: this.fb.control('')
      });

      this.consultaPublicaForm = this.fb.group({
         nomeEmpresa: this.fb.control('', [Validators.required]),
         numeroConsulta: this.fb.control('', [Validators.required]),
         nomeCliente: this.fb.control('', [Validators.required]),
         objeto: this.fb.control('', [Validators.required]),
         horaResposta: this.fb.control('',[Validators.required]),
         dataResposta: this.fb.control('', [Validators.required]),
         anexo: this.fb.control(null),
      });

      this.consultaPublicaUpdateForm = this.fb.group({
         nomeEmpresa: this.fb.control('', [Validators.required]),
         numeroConsulta: this.fb.control('', [Validators.required]),
         nomeCliente: this.fb.control('', [Validators.required]),
         objeto: this.fb.control('', [Validators.required]),
         horaResposta: this.fb.control('',[Validators.required]),
         dataResposta: this.fb.control('', [Validators.required]),
         anexo: this.fb.control(null),
      });

      this.getConsultaPublica();
      this.getGetDadosForm();
   }

   getConsultaPublica() {
      this.consultaPublicaService
         .getConsultaPublica(
            this.consultaPublicaFiltroForm.get('numeroConsulta').value,
            this.consultaPublicaFiltroForm.get('nomeCliente').value,
            this.consultaPublicaFiltroForm.get('nomeEmpresa').value,
            this.consultaPublicaFiltroForm.get('dataRespostaInicio').value,
            this.consultaPublicaFiltroForm.get('dataRespostaFinal').value,
         )
         .subscribe((res) => {
            this.alertas.fecharModal();
            this.consultaPublicaAtivo = res["consulPublicaAtiva"];
            this.consultaPublicaDesativada = res["consulPublicaDesativado"];
         });
   }

   getGetDadosForm() {
      this.consultaPublicaService
         .getGetDadosForm()
         .subscribe((res) => {
            this.dadosForm = res;
         });
   }

   cadastrar(){
      this.alertas.showLoading('Cadastrando Consulta Publica...');

      this.consultaPublicaService
         .cadastrarConsultaPublica(
            this.consultaPublicaForm.get("numeroConsulta").value,
            this.consultaPublicaForm.get("nomeCliente").value,
            this.consultaPublicaForm.get("nomeEmpresa").value,
            this.consultaPublicaForm.get("objeto").value,
            this.consultaPublicaForm.get("horaResposta").value,
            this.consultaPublicaForm.get("dataResposta").value,
            this.consultaPublicaForm.get("anexo").value
         )
         .subscribe(() => {
            this.alertas.fecharModal();
            location.reload();
         }, (erro) =>{
            this.alertas.erro(erro.mensage);
         });
   }

   alterarConsultaPublica(){
      this.alertas.showLoading('Alterando Consulta Publica...');

      this.consultaPublicaService
         .alterarConsultaPublica(
            this.consultaPublicaId,
            this.consultaPublicaUpdateForm.get("numeroConsulta").value,
            this.consultaPublicaUpdateForm.get("nomeCliente").value,
            this.consultaPublicaUpdateForm.get("nomeEmpresa").value,
            this.consultaPublicaUpdateForm.get("objeto").value,
            this.consultaPublicaUpdateForm.get("horaResposta").value,
            this.consultaPublicaUpdateForm.get("dataResposta").value,
            this.consultaPublicaUpdateForm.get('anexo').value
         )
         .subscribe(() => {
            this.alertas.fecharModal();
            location.reload();
         }, (erro) =>{
            this.alertas.erro(erro.mensage);
         });
   }

   deletarConsultaPublica(){
      this.alertas.warningAlert("Deseja DELETAR esta Consulta Publica?")
         .then((result) => {
            if (result.value) {
               this.consultaPublicaService.deletarConsultaPublica(this.consultaPublicaId)
                  .subscribe(() => {
                     location.reload();
                  })
            }
         })
   }

   abirModalDeAlteracao(longContent, id) {
      this.consultaPublicaId = id
      this.modalService.open(longContent, { scrollable: true });

      this.alertas.showLoading('Carregando Consulta Publica...');

      this.consultaPublicaService.obterConsultaPublica(id).subscribe(res =>{
         this.consultaPublicaUpdate = res
         this.consultaPublicaUpdateForm.get("numeroConsulta").setValue(this.consultaPublicaUpdate.numConsulta)
         this.consultaPublicaUpdateForm.get("nomeCliente").setValue(this.consultaPublicaUpdate.cliente.id)
         this.consultaPublicaUpdateForm.get("nomeEmpresa").setValue(this.consultaPublicaUpdate.empresa.id)
         this.consultaPublicaUpdateForm.get("objeto").setValue(this.consultaPublicaUpdate.objeto)

         let horaResposta = new Date(this.consultaPublicaUpdate.dataResposta);
         console.log(horaResposta);
         let horasResposta =
            horaResposta.getHours()
         let minutoResposta =
            horaResposta.getMinutes()
         let horaRespostaFinal = horasResposta + ':' + minutoResposta;
         this.consultaPublicaUpdateForm.get("horaResposta").setValue(horaRespostaFinal);

         let dataResposta = new Date(this.consultaPublicaUpdate.dataResposta);
         console.log(dataResposta);
         let diaResposta =
            dataResposta.getDate() < 10
               ? '0' + dataResposta.getDate()
               : dataResposta.getDate();
         let mesResposta =
            dataResposta.getMonth() + 1 < 10
               ? '0' + (dataResposta.getMonth() + 1)
               : dataResposta.getMonth() + 1;
         let anoResposta = dataResposta.getFullYear();

         let dataRespostaFinal = anoResposta + '-' + mesResposta + '-' + diaResposta;

         this.consultaPublicaUpdateForm.get("dataResposta").setValue(dataRespostaFinal);

         if(this.consultaPublicaUpdate.anexo){
            this.arquivoUpdate = this.consultaPublicaUpdate.anexo;
            this.consultaPublicaUpdateForm.get('anexo').setValue(this.arquivoUpdate);
            let btLink = document.getElementById('download-anexo-update');
            btLink.setAttribute(
               'href',
               `data:${this.arquivoUpdate.tipo};base64,${this.arquivoUpdate.base64}`
            );
            this.exibirUploadUpdate = true;
         }
         this.alertas.fecharModal();
      })
   }

   uploadCadastro(response) {
      this.arquivoCadastro = response.arquivo;
      this.consultaPublicaForm.get('anexo').setValue(this.arquivoCadastro);
      this.exibirUploadCadastro = true;
      let btLink = document.getElementById('download-anexo');
      btLink.setAttribute(
         'href',
         `data:${this.arquivoCadastro.tipo};base64,${this.arquivoCadastro.base64}`
      );
   }

   uploadUpdate(response) {
      this.arquivoUpdate = response.arquivo;
      this.consultaPublicaUpdateForm.get('anexo').setValue(this.arquivoUpdate);
      this.exibirUploadUpdate = true;
      let btLink = document.getElementById('download-anexo-update');
      btLink.setAttribute(
         'href',
         `data:${this.arquivoUpdate.tipo};base64,${this.arquivoUpdate.base64}`
      );
   }

   downloadAnexo() {
      let btLink = document.getElementById('download-anexo');
      btLink.click();
   }

   downloadAnexoBD(anexo) {
      let btLink = document.getElementById('download-anexo-BD');
      btLink.setAttribute(
         'href',
         `data:${anexo.tipo};base64,${anexo.base64}`
      );
      btLink.setAttribute('download', anexo.nome);
      btLink.click();
   }

   downloadAnexoUpdate() {
      let btLink = document.getElementById('download-anexo-update');
      btLink.setAttribute(
         'href',
         `data:${this.arquivoUpdate.tipo};base64,${this.arquivoUpdate.base64}`
      );
      btLink.setAttribute('download', this.arquivoUpdate.nome);
      btLink.click();
   }

   excluirEdital(tipo) {
      if(tipo == 'cadastro'){
         this.arquivoCadastro = new Arquivo();
         this.consultaPublicaForm.get('anexo').setValue(null);
         this.exibirUploadCadastro = false;
         let btLink = document.getElementById('download-anexo');
         btLink.setAttribute('href', '');
      }else{
         this.arquivoUpdate = new Arquivo();
         this.consultaPublicaUpdateForm.get('anexo').setValue(null);
         this.exibirUploadUpdate = false;
         let btLink = document.getElementById('download-anexo-update');
         btLink.setAttribute('href', '');
      }
   }

   filtrar(){
      this.alertas.showLoading('Buscando Consulta Publica...');
      this.getConsultaPublica()
   }

   limpar(){
      this.consultaPublicaForm.get("numeroConsulta").setValue("")
      this.consultaPublicaForm.get("nomeCliente").setValue("")
      this.consultaPublicaForm.get("nomeEmpresa").setValue("")
      this.consultaPublicaForm.get("objeto").setValue("")
      this.consultaPublicaForm.get("horaResposta").setValue("")
      this.consultaPublicaForm.get("dataResposta").setValue("")
      this.consultaPublicaForm.get("anexo").setValue("")
      this.exibirUploadCadastro = false;

      this.consultaPublicaFiltroForm.get('id').setValue("")
      this.consultaPublicaFiltroForm.get('numeroConsulta').setValue("")
      this.consultaPublicaFiltroForm.get('nomeCliente').setValue("")
      this.consultaPublicaFiltroForm.get('nomeEmpresa').setValue("")
      this.consultaPublicaFiltroForm.get('dataRespostaInicio').setValue("")
      this.consultaPublicaFiltroForm.get('dataRespostaFinal').setValue("")
   }

}
