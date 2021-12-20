import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { Alertas } from 'src/app/shared/class/alertas';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
   selector: 'app-usuario',
   templateUrl: './usuario.component.html',
   styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
   public cadastrarUsuarioForm: FormGroup;
   public alterarUsuarioForm: FormGroup;
   roles: any;
   private login: string;
   solicitacoes: any;
   public usuario: any;
   public usuarioAll: any;
   public seta: Array<any> = [
      "../../../../assets/iconis/baixo03.png",
      "../../../../assets/iconis/cima01.png"
   ];
   public toogleSeta;



   constructor(
      private router: Router,
      private usuarioService: UsuarioService,
      private alertas: Alertas
   ) {}
   tabelaExpandida: boolean = false;

   ngOnInit(): void {
      this.cadastrarUsuarioForm = new FormGroup({
         email: new FormControl('', Validators.required),
         role: new FormControl('', Validators.required),
      });

      this.alterarUsuarioForm = new FormGroup({
         usuario: new FormControl('', Validators.required),
         role: new FormControl('', Validators.required),
         status: new FormControl('', Validators.required),
      });

      this.login = this.usuarioService.getUser().login;
      this.getRoles();
      this.getSolicitacaoCad();
      this.getAllUser();
      this.toogleSeta = this.seta[0];
   }

   getAllUser(){
      this.usuarioService.getAllUser().subscribe(res =>{
         this.usuarioAll = res
      })
   }

   cadastrarUsuario() {
      Swal.fire({
         title: 'Confirme a sua senha',
         input: 'password',
         inputAttributes: {
            autocapitalize: 'off',
         },
         showCancelButton: true,
         confirmButtonText: 'Confirmar',
         showLoaderOnConfirm: true,
         preConfirm: (senha) => {
            return this.usuarioService
               .cadastrarUsuario(
                  this.cadastrarUsuarioForm.get('email').value,
                  this.cadastrarUsuarioForm.get('role').value,
                  this.login,
                  senha
               )
               .then((response) => {
                  if (response.status == 401)
                     throw new Error('Senha incorreta');
                  else if (response.status == 404)
                     throw new Error(
                        'Nenhum usuario encontrado com este email'
                     );

                  location.reload();
               })
               .catch((error) => {
                  Swal.showValidationMessage(error);
               });
         },
         allowOutsideClick: () => false,
      });
   }

   alterarUsuario(){
      var ativo: boolean;
      if(this.alterarUsuarioForm.get('status').value == 'true'){
         ativo = true;
      }else{
         ativo = false;
      }
      this.alertas.showLoading('Alterando Usuario');
      this.usuarioService
         .alterarUsuario(
            this.alterarUsuarioForm.get('usuario').value,
            this.alterarUsuarioForm.get('role').value,
            ativo
         ).subscribe(() => {
            this.alertas.sucesso('Usuario Alterado');
            location.reload();
         },
         (error) => {
            this.alertas.erro(error.error);
         })
   }

   getRoles() {
      this.usuarioService.getRoles().subscribe((resp) => {
         this.roles = resp;
      });
   }

   getSolicitacaoCad() {
      this.usuarioService.getSolicitacoes().subscribe((resp) => {
         this.solicitacoes = resp;
      });
   }

   autorizar(id: string) {
      let roleId = (<HTMLInputElement>(
         document.getElementById('funcSolicitacao' + id)
      )).value;

      if (roleId == '') {
         this.alertas.erro('O campo Função é obrigatório!');
         return;
      }

      Swal.fire({
         title: 'Confirme a sua senha',
         input: 'password',
         inputAttributes: {
            autocapitalize: 'off',
         },
         showCancelButton: true,
         confirmButtonText: 'Confirmar',
         showLoaderOnConfirm: true,
         preConfirm: (senha) => {
            return this.usuarioService
               .autorizarCadastro(Number(id), this.login, senha, Number(roleId))
               .then((response) => {
                  if (response.status == 401)
                     throw new Error('Senha incorreta');
                  else if (response.status == 404) {
                     this.alertas
                        .erro(
                           'Solicitação inválida, motivo: nenhum funcionário encontrado com este email!'
                        )
                        .then((resp) => {
                           this.usuarioService
                              .naoAutorizarCadastro(Number(id))
                              .subscribe(() => {
                                 location.reload();
                              });
                        });

                     return;
                  }

                  location.reload();
               })
               .catch((error) => {
                  Swal.showValidationMessage(error);
               });
         },
         allowOutsideClick: () => false,
      });
   }

   naoAutorizar(id: string) {
      this.usuarioService.naoAutorizarCadastro(Number(id)).subscribe(() => {
         location.reload();
      });
   }

   changeIconExpand(){
      this.tabelaExpandida = !this.tabelaExpandida;
   }

   toogleCard(){
      if(this.toogleSeta == this.seta[0]){
         this.toogleSeta = this.seta[1];
      }else{
         this.toogleSeta = this.seta[0];
      }
   }
}
