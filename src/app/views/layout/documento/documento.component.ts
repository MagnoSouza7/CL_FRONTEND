import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alertas } from 'src/app/shared/class/alertas';
import { DocumentoService } from './documento.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Arquivo } from 'src/app/shared/upload/arquivo';
import { User } from '../user';

@Component({
   selector: 'app-documento',
   templateUrl: './documento.component.html',
   styleUrls: ['./documento.component.css'],
})
export class DocumentoComponent implements OnInit {
   public documentoForm: FormGroup
   public documentoUpdateForm: FormGroup
   public documentos: any
   public documentoId: number;

   public documentoUpdate: any
   public arquivoUpdate: Arquivo = new Arquivo()
   public exibirUploadUpdate: boolean = false

   public arquivoCadastro: Arquivo = new Arquivo();
   public exibirUploadCadastro = false;
   public user: User = new User();

constructor(
     private fb: FormBuilder,
     private alertas: Alertas,
     private documentoService: DocumentoService,
     private modalService: NgbModal
  ) {}

ngOnInit(): void {
   if("user" in localStorage){
      this.user = JSON.parse(localStorage.getItem("user"));
   }

   else if("user" in sessionStorage){
      this.user = JSON.parse(sessionStorage.getItem("user"));
   }


   this.documentoForm = this.fb.group({
      descricao: this.fb.control('', [Validators.required]),
      anexo: this.fb.control(null,[Validators.required]),
   });

   this.documentoUpdateForm = this.fb.group({
      descricao: this.fb.control('', [Validators.required]),
      anexo: this.fb.control(null, [Validators.required]),
   });



   this.obterDocumentos();
}

obterDocumentos(){
   this.documentoService.obterDocumento().subscribe((res=>{
      this.documentos = res
   }))
}
cadastrarDocumento(){
   this.alertas.showLoading('Cadastrando Documento');

   this.documentoService
   .cadastrarDocumento(
      this.documentoForm.get('descricao').value,
      this.documentoForm.get('anexo').value
      )
   .subscribe(()=>{
      this.alertas.fecharModal();
      location.reload();
   },
   (erro) =>{
      this.alertas.erro(erro.mensage);
   })
}

alterarDocumento() {
   this.alertas.showLoading('Alterando Documento');

   this.documentoService
      .alterarDocumento(
         this.documentoId,
         this.documentoUpdateForm.get('descricao').value,
         this.documentoUpdateForm.get('anexo').value)
      .subscribe(
         () => {
            this.alertas.fecharModal();
            location.reload();
         },
         (erro) => {
            this.alertas.erro(erro.message);
         }
      );

}

deletarDocumento(){
   this.alertas.warningAlert("Deseja DELETAR este Documento ?")
      .then((result) => {
         if (result.value) {
            this.documentoService.deletarDocumento(this.documentoId)
               .subscribe(() => {
                  location.reload();
               })
         }
      })
}

selecionarDocumento(documento: any){
     this.documentoId = documento.id
     this.documentoForm.get('descricao').setValue(documento.descricao)
     this.documentoForm.get('anexo').setValue(documento.anexo)
}

abirModalDeAlteracao(longContent, id) {
   this.documentoId = id
   this.modalService.open(longContent, { scrollable: true });

   this.alertas.showLoading('Carregando Documento...');

   this.documentoService.obterDocumentoId(this.documentoId).subscribe(res =>{
      this.documentoUpdate = res
      this.documentoUpdateForm.get("descricao").setValue(this.documentoUpdate.descricao)

      if(this.documentoUpdate.anexo){
         this.arquivoUpdate = this.documentoUpdate.anexo;
         this.documentoUpdateForm.get('anexo').setValue(this.arquivoUpdate);
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
   this.documentoForm.get('anexo').setValue(this.arquivoCadastro);
   this.exibirUploadCadastro = true;
   let btLink = document.getElementById('download-anexo');
   btLink.setAttribute(
      'href',
      `data:${this.arquivoCadastro.tipo};base64,${this.arquivoCadastro.base64}`
   );
}

uploadUpdate(response) {
   this.arquivoUpdate = response.arquivo;
   this.documentoUpdateForm.get('anexo').setValue(this.arquivoUpdate);
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
      this.documentoForm.get('anexo').setValue(null);
      this.exibirUploadCadastro = false;
      let btLink = document.getElementById('download-anexo');
      btLink.setAttribute('href', '');
   }else{
      this.arquivoUpdate = new Arquivo();
      this.documentoUpdateForm.get('anexo').setValue(null);
      this.exibirUploadUpdate = false;
      let btLink = document.getElementById('download-anexo-update');
      btLink.setAttribute('href', '');
   }
}


limpar(){
   this.documentoId = null
   this.documentoForm.get('descricao').setValue('')
   this.documentoForm.get('anexo').setValue('')
   this.exibirUploadCadastro = false;
}
}
