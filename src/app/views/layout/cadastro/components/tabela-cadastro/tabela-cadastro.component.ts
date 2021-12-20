import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
   selector: 'app-tabela-cadastro',
   templateUrl: './tabela-cadastro.component.html',
   styleUrls: ['./tabela-cadastro.component.css'],
})
export class TabelaCadastroComponent implements OnInit {
   constructor() {}

   @Input() titulo: string;
   @Input() dados: any;
   @Input() tipo: string;
   @Output() pegarDado = new EventEmitter<any>();

   ngOnInit(): void { }

   enviarDado(dado: any) {
      this.pegarDado.emit(dado);
   }
}
