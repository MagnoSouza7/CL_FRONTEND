import { Component, OnInit } from '@angular/core';
import { ComentarioEditalService } from '../comentario-edital/comentario-edital.service';
import { Router } from '@angular/router';
import { Alertas } from 'src/app/shared/class/alertas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlService } from 'src/app/shared/class/url-service';

@Component({
   selector: 'app-comentario-edital',
   templateUrl: './comentario-edital.component.html',
   styleUrls: ['./comentario-edital.component.css'],
})
export class ComentarioEditalComponent implements OnInit {
   public comentarioForm: FormGroup;
   public comentarioId;
   public id;
   public dadosComentarios: any;
   public user: any

   constructor(
      private fb: FormBuilder,
      private router: Router,
      private comentarioEditalService: ComentarioEditalService,
      private urlService: UrlService,
      private alertas: Alertas
   ) {}

   ngOnInit(): void {
      this.user = this.urlService.getUser();

      this.comentarioForm = this.fb.group({
         mensagem: this.fb.control('', [Validators.required]),
         ativo: this.fb.control('')
      });

      if ('listar-comentario' in sessionStorage) {
         this.id = sessionStorage.getItem('listar-comentario');
         sessionStorage.removeItem('listar-comentario');
      } else {
         this.router.navigate(['']);
         return;
      }

      this.obterComentarios(this.id);
   }

   obterComentarios(id) {
      this.comentarioEditalService.obterComentarios(id).subscribe(res => {
         this.dadosComentarios = res
      });
   }

   cadastrarComentario(){
      if(this.comentarioForm.get('mensagem').value != ''){
         this.alertas.showLoading('Inserindo Comentário');
         this.comentarioEditalService
            .cadastrarComentario(
               this.comentarioForm.get('mensagem').value,
               this.user.id,
               this.id
            )
            .subscribe(() => {
               this.alertas.fecharModal();
               location.reload();
            }, (error) => {
               this.alertas.erro(error.message);
            })
      }
   }

   excluirComentario(id){
      this.alertas.showLoading('Excluindo o Comentário');
      this.comentarioEditalService
         .deletarComentario(id)
         .subscribe(() => {
            this.alertas.fecharModal();
            location.reload();
         }, (error) => {
            this.alertas.erro(error.message);
         })
   }

   cadastrarEnter(event){
      if(event.code == 'Enter')
         this.cadastrarComentario()
   }
}
