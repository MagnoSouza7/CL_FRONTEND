import { Component, OnInit } from '@angular/core';
import { DissidiosService } from './dissidios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Arquivo } from 'src/app/shared/upload/arquivo';
import { Alertas } from 'src/app/shared/class/alertas';

@Component({
   selector: 'app-dissidios',
   templateUrl: './dissidios.component.html',
   styleUrls: ['./dissidios.component.css'],
})
export class DissidiosComponent implements OnInit {
   public pdfSrc = '';
   public estados: any;
   public formCadastrar: FormGroup;
   public formDissidio: FormGroup;
   public dissidioEstado: any;
   public exibirUpload: boolean;
   public arquivo: Arquivo = new Arquivo();
   public editarDissidio: boolean = false;

   public cardExpandido: boolean = true;

   public exibirUploadUpdate: boolean;
   public arquivoUpdate: Arquivo = new Arquivo();

   public dissidioSelecionato: boolean = false;
   public dissidio: any;
   public estado: any;
   public estadoUf: string;
   public ocultarDissidio: boolean = false;

   constructor(
      private dissidiosService: DissidiosService,
      private alertas: Alertas
   ) {}

   ngOnInit(): void {
      this.obterStatus();

      this.formDissidio = new FormGroup({
         dataBase: new FormControl(''),
         dataUltima: new FormControl(''),
         pisoSalarial8h: new FormControl(''),
         pisoSalarial6h: new FormControl(''),
         ticket8h: new FormControl(''),
         ticket6h: new FormControl(''),
         reajuste: new FormControl(''),
         benefInd8h: new FormControl(''),
         benefInd6h: new FormControl(''),
         observacoes: new FormControl(''),
         vigenciainicio: new FormControl(''),
         vigenciafim: new FormControl(''),
         cnpj: new FormControl(''),
         conformeCargoFuncao: new FormControl(''),
         arquivo: new FormControl(null),
         atalho: new FormControl('')
      });

      this.formCadastrar = new FormGroup({
         dataBase: new FormControl('', Validators.required),
         dataUltima: new FormControl('', Validators.required),
         pisoSalarial8h: new FormControl('', Validators.required),
         pisoSalarial6h: new FormControl(''),
         ticket8h: new FormControl(''),
         ticket6h: new FormControl(''),
         reajuste: new FormControl(''),
         benefInd8h: new FormControl(''),
         benefInd6h: new FormControl(''),
         observacoes: new FormControl('', Validators.required),
         vigenciainicio: new FormControl('', Validators.required),
         vigenciafim: new FormControl('', Validators.required),
         cnpj: new FormControl(''),
         conformeCargoFuncao: new FormControl(''),
         arquivo: new FormControl(null),
         atalho: new FormControl('')
      });
   }

   toogleCard() {
      this.cardExpandido = !this.cardExpandido;
   }

   obterStatus() {
      this.dissidiosService.obterStatus()
      .subscribe((resp) => {
         this.estados = resp;
      }, (error) => {
         this.alertas.erro(error.message);
      })
   }

   obterDissidioById(dissidio: any) {
      this.alertas.showLoading('Carregando dissidio...');
      this.dissidiosService.obterDissidioById(dissidio.id).subscribe((resp) => {
         this.ocultarDissidio = true;
         this.dissidio = resp;

         this.formDissidio.get("dataBase").setValue(this.dissidio.dataBase.substring(0, this.dissidio.dataBase.indexOf("T")));
         this.formDissidio.get("dataUltima").setValue(this.dissidio.dataUltima.substring(0, this.dissidio.dataUltima.indexOf("T")));
         this.formDissidio.get("pisoSalarial8h").setValue(this.dissidio.pisoSalarial8h);
         this.formDissidio.get("pisoSalarial6h").setValue(this.dissidio.pisoSalarial6h);
         this.formDissidio.get("ticket8h").setValue(this.dissidio.ticket8h);
         this.formDissidio.get("ticket6h").setValue(this.dissidio.ticket6h);
         this.formDissidio.get("reajuste").setValue(this.dissidio.reajuste);
         this.formDissidio.get("benefInd8h").setValue(this.dissidio.benefInd8h);
         this.formDissidio.get("benefInd6h").setValue(this.dissidio.benefInd6h);
         this.formDissidio.get("observacoes").setValue(this.dissidio.observacoes);
         this.formDissidio.get("vigenciainicio").setValue(this.dissidio.vigenciaInicio.substring(0, this.dissidio.vigenciaInicio.indexOf("T")));
         this.formDissidio.get("vigenciafim").setValue(this.dissidio.vigenciaFinal.substring(0, this.dissidio.vigenciaFinal.indexOf("T")));
         this.formDissidio.get("cnpj").setValue(this.dissidio.cnpj);
         this.formDissidio.get("conformeCargoFuncao").setValue(this.dissidio.conformeCargoFuncao);
         this.formDissidio.get("arquivo").setValue(this.dissidio.arquivo);
         this.formDissidio.get("atalho").setValue(this.dissidio.atalho);

         this.arquivoUpdate = this.dissidio.arquivo;
         this.exibirUploadUpdate = true;

         this.editarDissidio = false;
         this.alertas.fecharModal();
      }, (error) => {
         this.alertas.erro(error.message);
      })
   }

   consultar(estado: any, chamadaInterna?) {
      if(!chamadaInterna)
         this.alertas.showLoading('Carregando dissidio...');

      this.dissidiosService
         .obterDissidio(estado.id)
         .subscribe((resp) => {
            this.dissidioEstado = resp;
            this.editarDissidio = false;
            this.estado = estado;
            this.estadoUf = estado.uf;

            this.dissidio = null;
            this.ocultarDissidio = false
            this.alertas.fecharModal();
         }, (error) => {
            this.alertas.erro(error.message);
         })
   }

   cadastrar() {
      this.alertas.showLoading('Cadastrando novo dissidio...');
      this.dissidiosService
         .cadastrarDissidio(
            Number(this.estado.id),
            this.formCadastrar.get('dataBase').value,
            this.formCadastrar.get('dataUltima').value,
            Number(this.formCadastrar.get('pisoSalarial8h').value),
            Number(this.formCadastrar.get('pisoSalarial6h').value),
            Number(this.formCadastrar.get('ticket8h').value),
            Number(this.formCadastrar.get('ticket6h').value),
            Number(this.formCadastrar.get('benefInd8h').value),
            Number(this.formCadastrar.get('benefInd6h').value),
            Number(this.formCadastrar.get('reajuste').value),
            this.formCadastrar.get('observacoes').value,
            this.formCadastrar.get('vigenciainicio').value,
            this.formCadastrar.get('vigenciafim').value,
            this.formCadastrar.get('cnpj').value,
            this.formCadastrar.get('conformeCargoFuncao').value,
            this.formCadastrar.get('arquivo').value,
            this.formCadastrar.get('atalho').value
         )
         .subscribe(() => {
            this.alertas.fecharModal();

            this.estados = null;
            this.obterStatus();
            this.limpar();

            this.ocultarDissidio = false
            this.dissidio = null;

            this.consultar(this.estado, true);
         }, (erro) =>{
            this.alertas.erro(erro.mensage);
         });
   }

   dissidioeditar(){
      if(this.editarDissidio){
         this.alertas.showLoading('Atualizando dissidio...');

         this.dissidiosService.atualizarDissidio(
            Number(this.dissidio.id),
            this.formDissidio.get('dataBase').value,
            this.formDissidio.get('dataUltima').value,
            Number(this.formDissidio.get('pisoSalarial8h').value),
            Number(this.formDissidio.get('pisoSalarial6h').value),
            Number(this.formDissidio.get('ticket8h').value),
            Number(this.formDissidio.get('ticket6h').value),
            Number(this.formDissidio.get('benefInd8h').value),
            Number(this.formDissidio.get('benefInd6h').value),
            Number(this.formDissidio.get('reajuste').value),
            this.formDissidio.get('observacoes').value,
            this.formDissidio.get('vigenciainicio').value,
            this.formDissidio.get('vigenciafim').value,
            this.formDissidio.get('cnpj').value,
            this.formDissidio.get('conformeCargoFuncao').value,
            this.formDissidio.get('arquivo').value,
            this.formDissidio.get('atalho').value
         )
         .subscribe(() => {

            this.ocultarDissidio = false
            this.dissidio = null;
            this.consultar(this.estado, true);
            this.obterStatus();
         }, (error) => {
            this.alertas.erro(error.message);
         });

      }else{
         if(this.dissidio.arquivo){
            this.exibirUploadUpdate = true;
            this.arquivoUpdate = this.dissidio.arquivo;
         }
         else{
            this.exibirUploadUpdate = false;
            this.arquivoUpdate = null;
         }
      }
      this.editarDissidio = !this.editarDissidio;
   }

   cancelarEditar(){
      this.editarDissidio = false;
   }

   fecharDissidio(){
      this.ocultarDissidio = false;
   }

   upload(response, tipo: number) {
      if(tipo == 0){
         this.arquivo = response.arquivo;
         this.formCadastrar.get('arquivo').setValue(this.arquivo);
         this.exibirUpload = true;
         let btLink = document.getElementById('download-anexo');
         btLink.setAttribute(
            'href',
            `data:${this.arquivo.tipo};base64,${this.arquivo.base64}`
         );
      }else if(tipo == 1){
         this.arquivoUpdate = response.arquivo;
         this.formDissidio.get('arquivo').setValue(this.arquivoUpdate);
         this.exibirUploadUpdate = true;
      }
   }

   downloadAnexo(tipo: number) {
      let btLink = document.getElementById('download-anexo');
      if(tipo == 0){
         btLink.setAttribute('download', this.arquivo.nome);
         btLink.setAttribute(
            'href',
            `data:${this.arquivo.tipo};base64,${this.arquivo.base64}`
            );
      }else if (tipo == 1) {
         btLink.setAttribute('download', this.arquivoUpdate.nome);
         btLink.setAttribute(
            'href',
            `data:${this.arquivoUpdate.tipo};base64,${this.arquivoUpdate.base64}`
         );
      }
      btLink.click();
   }

   excluirEdital(tipo: number) {
      if(tipo == 0){

         this.arquivo = new Arquivo();
         this.formCadastrar.get('arquivo').setValue('');
         this.exibirUpload = false;
         let btLink = document.getElementById('download-anexo');
         btLink.setAttribute('href', '');

      }else if(tipo == 1){

         this.arquivoUpdate = new Arquivo();
         this.formDissidio.get('arquivo').setValue(null);
         this.exibirUploadUpdate = false;

      }
   }

   limpar(){
      this.formCadastrar.get('dataBase').setValue('');
      this.formCadastrar.get('dataUltima').setValue('');
      this.formCadastrar.get('pisoSalarial8h').setValue('');
      this.formCadastrar.get('pisoSalarial6h').setValue('');
      this.formCadastrar.get('ticket8h').setValue('');
      this.formCadastrar.get('ticket6h').setValue('');
      this.formCadastrar.get('benefInd8h').setValue('');
      this.formCadastrar.get('benefInd6h').setValue('');
      this.formCadastrar.get('reajuste').setValue('');
      this.formCadastrar.get('observacoes').setValue('');
      this.formCadastrar.get('vigenciainicio').setValue('');
      this.formCadastrar.get('vigenciafim').setValue('');
      this.formCadastrar.get('cnpj').setValue('');
      this.formCadastrar.get('conformeCargoFuncao').setValue('');
      this.formCadastrar.get('arquivo').setValue(null);
      this.formCadastrar.get('atalho').setValue('');
      this.arquivo = new Arquivo();
      this.exibirUpload = false;
   }
}
