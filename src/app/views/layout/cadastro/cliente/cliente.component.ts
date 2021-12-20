import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Alertas } from 'src/app/shared/class/alertas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
   selector: 'app-cliente',
   templateUrl: './cliente.component.html',
   styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
   public clienteForm: FormGroup;
   public clientes: any;
   public verifyCliente: any;
   public clienteId: number;
   public exibirListagem: boolean = false;

   constructor(
      private fb: FormBuilder,
      private clienteService: ClienteService,
      private alertas: Alertas
   ) {}

   ngOnInit(): void {
      this.clienteForm = this.fb.group({
         nome: this.fb.control('', [Validators.required]),
         apelido: this.fb.control('', [Validators.required]),
         cnpj: this.fb.control('', [Validators.required]),
         ativo: this.fb.control(''),
      });

      this.obterClientes();
   }

   obterClientes() {
      this.clienteService.obterClientes().subscribe((res) => {
         this.clientes = res;
      }, (error) => {
         this.alertas.erro(error.message);
      });
   }

   cadastrarCliente() {
      this.alertas.showLoading('Cadastrando Cliente');
      this.clienteService
         .cadastrarClientes(
            this.clienteForm.get('nome').value,
            this.clienteForm.get('apelido').value,
            this.clienteForm.get('cnpj').value
         )
         .subscribe(() => {
            this.alertas.fecharModal();

            this.clientes = null;
            this.limpar();
            this.obterClientes();
         }, (error) => {
            this.alertas.erro(error.message);
         });
   }

   verificarClientes(nome: string) {
      this.exibirListagem = true;

      if (nome != '') {
         this.clienteService.verificarClientes(nome).subscribe((res) => {
            this.verifyCliente = res;
         }, (error) => {
            this.alertas.erro(error.message);
         });
      }
   }

   selecionarCliente(cliente: any) {
      this.exibirListagem = false;

      this.clienteId = cliente.id;
      this.clienteForm.get('nome').setValue(cliente.nome);
      this.clienteForm.get('apelido').setValue(cliente.apelido);
      this.clienteForm.get('cnpj').setValue(cliente.cnpj)
      this.clienteForm.get('ativo').setValue(cliente.ativo);
   }

   alterarCliente() {
      var ativo: boolean;

      if(this.clienteForm.get('ativo').value == 'true')
         ativo = true;
      else
         ativo = false;

      this.alertas.showLoading('Alterando Cliente');
      this.clienteService
         .alterarClientes(
            this.clienteId,
            this.clienteForm.get('nome').value,
            this.clienteForm.get('apelido').value,
            this.clienteForm.get('cnpj').value,
            ativo
         )
         .subscribe(() => {
            this.alertas.fecharModal();

            this.clientes = null;
            this.limpar();
            this.obterClientes();
         },
         (error) => {
            this.alertas.erro(error.message);
         });
   }

   limpar() {
      this.clienteId = null;
      this.clienteForm.get('nome').setValue('');
      this.clienteForm.get('apelido').setValue('');
      this.clienteForm.get('cnpj').setValue('');
   }

   exibirLista() {
      setTimeout(() => {
         this.exibirListagem = false;
      }, 100);
   }
}
