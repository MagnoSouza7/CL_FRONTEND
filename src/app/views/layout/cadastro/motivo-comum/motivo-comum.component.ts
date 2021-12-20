import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from 'src/app/shared/class/alertas';
import { MotivoComumService } from './motivo-comum.service';

@Component({
  selector: 'app-motivo-comum',
  templateUrl: './motivo-comum.component.html',
  styleUrls: ['./motivo-comum.component.css']
})
export class MotivoComumComponent implements OnInit {
   public motivoComumForm: FormGroup;
   public motivoComumId: number;
   public motivosComum: any;

   constructor(
      private fb: FormBuilder,
      private motivoComumService: MotivoComumService,
      private alertas: Alertas
   ) {}

   ngOnInit(): void {
      this.motivoComumForm = this.fb.group({
         nome: this.fb.control('', [Validators.required]),
         ativo: this.fb.control('')
      });

      this.obterMotivoComum();
   }

   obterMotivoComum(){
      this.motivoComumService
         .obterMotivosComum()
         .subscribe((res) => {
            this.motivosComum = res;
         }, (error) => {
            this.alertas.erro(error.message);
         });
   }

   cadastrarMotivoComum(){
      this.alertas.showLoading('Cadastrando Motivo Comum');
      this.motivoComumService
         .cadastrarMotivoComum(
            this.motivoComumForm.get('nome').value
         )
         .subscribe(() => {
            this.alertas.fecharModal();

            this.motivosComum = null;
            this.obterMotivoComum();
            this.limpar();
         }, (error) => {
            this.alertas.erro(error.message);
         });
   }

   alterarMotivoComum(){
      var ativo: boolean;
      if(this.motivoComumForm.get('ativo').value == 'true')
         ativo = true;
      else
         ativo = false;


      this.alertas.showLoading('Alterando Motivo Comum');
      this.motivoComumService
         .alterarMotivoComum(
            this.motivoComumId,
            this.motivoComumForm.get('nome').value,
            ativo
         )
         .subscribe(() => {
            this.alertas.fecharModal();

            this.motivosComum = null;
            this.obterMotivoComum();
            this.limpar();
         }, (error) => {
            this.alertas.erro(error.message);
         });
   }

   limpar(){
      this.motivoComumId = null;
      this.motivoComumForm.get('nome').setValue('');
      this.motivoComumForm.get('ativo').setValue('');
   }

   selecionarMotivoComum(motivo: any){
      this.motivoComumId = motivo.id
      this.motivoComumForm.get('nome').setValue(motivo.nome),
      this.motivoComumForm.get('ativo').setValue(motivo.ativo)
   }
}
