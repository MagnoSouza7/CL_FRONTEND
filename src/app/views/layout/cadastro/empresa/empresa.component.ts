import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from 'src/app/shared/class/alertas';
import { EmpresaService } from './empresa.service';

@Component({
   selector: 'app-empresa',
   templateUrl: './empresa.component.html',
   styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
   public empresaForm: FormGroup;
   public empresas: any;
   public empresaId: number;

   constructor(
      private fb: FormBuilder,
      private alertas: Alertas,
      private empresaService: EmpresaService
   ) {}

   ngOnInit(): void {
      this.empresaForm = this.fb.group({
         nome: this.fb.control('', [Validators.required]),
         ativo: this.fb.control(''),
      });

      this.obterEmpresa();
   }
   obterEmpresa() {
      this.empresaService.obterEmpresa().subscribe((res) => {
         this.empresas = res;
      }, (erro) => {
         this.alertas.erro(erro.message);
      });
   }

   cadastrarEmpresa() {
      this.alertas.showLoading('Cadastrando Empresa');

      this.empresaService
         .cadastrarEmpresa(this.empresaForm.get('nome').value)
         .subscribe(() => {
            this.alertas.fecharModal();

            this.empresas = null;
            this.obterEmpresa();
            this.limpar();
         }, (erro) => {
            this.alertas.erro(erro.message);
         });
   }

   alterarEmpresa() {
      var ativo: boolean;

      if (this.empresaForm.get('ativo').value == 'true')
         ativo = true;
      else
         ativo = false;

      this.alertas.showLoading('Alterando Empresa');

      this.empresaService
         .alterarEmpresa(this.empresaId, this.empresaForm.get('nome').value, ativo)
         .subscribe(() => {
            this.alertas.fecharModal();

            this.empresas = null;
            this.obterEmpresa();
            this.limpar();
         }, (erro) => {
            this.alertas.erro(erro.message);
         });
    }

    selecionarEmpresa(empresa: any){
       console.log(empresa)
         this.empresaId = empresa.id
         this.empresaForm.get('nome').setValue(empresa.nome)
         this.empresaForm.get('ativo').setValue(empresa.ativo)
    }

    limpar(){
       this.empresaId = null
       this.empresaForm.get('nome').setValue('')
       this.empresaForm.get('ativo').setValue('')
    }

}
