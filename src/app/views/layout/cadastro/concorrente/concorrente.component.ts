import { Component, OnInit } from '@angular/core';
import { ConcorrenteService } from './concorrente.service';
import { Alertas } from 'src/app/shared/class/alertas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-concorrente',
  templateUrl: './concorrente.component.html',
  styleUrls: ['./concorrente.component.css']
})
export class ConcorrenteComponent implements OnInit {
   public concorrenteForm: FormGroup;
   public concorrentes: any;
   public verifyConcorrente: any;
   public concorrenteId: number;
   public exibirListagem: boolean = false;

   constructor(
      private fb: FormBuilder,
      private concorrenteService: ConcorrenteService,
      private alertas: Alertas
   ) {}

   ngOnInit(): void {
      this.concorrenteForm = this.fb.group({
         nome: this.fb.control('', [Validators.required]),
         apelido: this.fb.control('', [Validators.required]),
         cnpj: this.fb.control('', [Validators.required]),
         ativo: this.fb.control(''),
      });

      this.obterConcorrentes();
   }

   obterConcorrentes() {
      this.concorrenteService.obterConcorentes().subscribe((res) => {
         this.concorrentes = res;
      }, (error) => {
         this.alertas.erro(error.message);
      });
   }

   cadastrarConcorrente() {
      this.alertas.showLoading('Cadastrando concorrente');
      this.concorrenteService
         .cadastrarConcorrente(
            this.concorrenteForm.get('nome').value,
            this.concorrenteForm.get('apelido').value,
            this.concorrenteForm.get('cnpj').value
         )
         .subscribe(() => {
            this.alertas.fecharModal();

            this.concorrentes = null;
            this.obterConcorrentes();
            this.limpar();
         }, (error) => {
            this.alertas.erro(error.message);
         });
   }

   verificarConcorrente(nome: string) {
      this.exibirListagem = true;

      if (nome != '') {
         this.concorrenteService.verificarConcorrente(nome).subscribe((res) => {
            this.verifyConcorrente = res;
         }, (error) => {
            this.alertas.erro(error.message);
         });
      }
   }

   selecionarConcorrente(concorrente: any) {
      this.exibirListagem = false;

      this.concorrenteId = concorrente.id;
      this.concorrenteForm.get('nome').setValue(concorrente.nome);
      this.concorrenteForm.get('apelido').setValue(concorrente.apelido);
      this.concorrenteForm.get('cnpj').setValue(concorrente.cnpj)
      this.concorrenteForm.get('ativo').setValue(concorrente.ativo);
   }

   alterarConcorrente() {
      var ativo: boolean;
      if(this.concorrenteForm.get('ativo').value == 'true')
         ativo = true;
      else
         ativo = false;

      this.alertas.showLoading('Alterando concorrente');
      this.concorrenteService
         .alterarConcorrente(
            this.concorrenteId,
            this.concorrenteForm.get('nome').value,
            this.concorrenteForm.get('apelido').value,
            this.concorrenteForm.get('cnpj').value,
            ativo
         )
         .subscribe(() => {
            this.alertas.fecharModal();

            this.concorrentes = null;
            this.obterConcorrentes();
            this.limpar();
         }, (error) => {
            this.alertas.erro(error.message);
         });
   }

   limpar() {
      this.concorrenteId = null;
      this.concorrenteForm.get('nome').setValue('');
      this.concorrenteForm.get('apelido').setValue('');
      this.concorrenteForm.get('cnpj').setValue('');
      this.concorrenteForm.get('ativo').setValue('');
   }

   exibirLista() {
      setTimeout(() => {
         this.exibirListagem = false;
      }, 100);
   }
}
