import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
   selector: 'app-formulario-cadastro',
   templateUrl: './formulario-cadastro.component.html',
   styleUrls: ['./formulario-cadastro.component.css'],
})
export class FormularioCadastroComponent implements OnInit {
   constructor() {}

   @Input() form: FormGroup;
   @Input() titulo: string;
   @Input() id: any;
   @Input() tipo: any;
   @Input() dados: any;
   @Output() cadastrar = new EventEmitter<any>();
   @Output() alterar = new EventEmitter<any>();
   @Output() limpar = new EventEmitter<any>();

   //funcoes do cliente
   @Output() verificar = new EventEmitter<any>();
   @Output() exibir = new EventEmitter<any>();
   @Output() selecionar = new EventEmitter<any>();
   @Input() verifyNomes: any;
   @Input() exibirListagem: any;

   ngOnInit(): void { }

   create() {
      this.cadastrar.emit();
   }

   update() {
      this.alterar.emit();
   }

   clean() {
      this.limpar.emit();
   }

   verificarNome(dado: any){
      this.verificar.emit(dado.target.value);
   }

   exibirLista(){
      this.exibir.emit();
   }

   selecionarNome(dado: any){
      this.selecionar.emit(dado);
   }
}
