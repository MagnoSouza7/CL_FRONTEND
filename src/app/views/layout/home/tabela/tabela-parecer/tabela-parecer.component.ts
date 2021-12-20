import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../user';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-tabela-parecer',
  templateUrl: './tabela-parecer.component.html',
  styleUrls: ['./tabela-parecer.component.css']
})
export class TabelaParecerComponent implements OnInit {
   constructor(private homeService: HomeService, private router: Router) {}

   @Input() editais: any;
   @Input() tipo: string;
   @Input() titulo: string;
   @Input() etapa: string;
   @Input() funcaoNoEdital : Function;

   public nomeColuna: string = '';
   public dataAtual: Date = new Date();
   public tabelaExpandida: boolean = false;
   private user: User = new User;

   ngOnInit(): void {
      this.user = this.homeService.getUser();
   }

   obterComentarios(id){
      sessionStorage.setItem('listar-comentario', id)
      this.router.navigate(['/comentario-edital'])
   }

   changeIconExpand(){
      this.tabelaExpandida = !this.tabelaExpandida;
   }

   ordenar(valor){
      if(this.nomeColuna){
         this.ordenarDeCrescente(valor)
      }else{
         this.ordenarCrescente(valor)
      }
   }

   ordenarCrescente(valor){
      this.nomeColuna = valor;
      this.editais = this.editais
      .sort(function(a,b){
         switch(valor){
            case 'cliente': return  a.cliente.apelido > b.cliente.apelido ? 1 : a.cliente.apelido < b.cliente.apelido ? -1 : 0;
            case "dataAbertura":
               let asplit = a.dataHoraDeAbertura.substring(0, 10).split('-');
               let bsplit = b.dataHoraDeAbertura.substring(0, 10).split('-');
               let anew = Date.parse(asplit[0]+"/"+asplit[1]+"/"+asplit[2]);
               let bnew = Date.parse(bsplit[0]+"/"+bsplit[1]+"/"+bsplit[2]);
               return anew - bnew;
            case "categoria": return a.categoria.nome > b.categoria.nome ? 1 : a.categoria.nome < b.categoria.nome ? -1 : 0;
            case "regiao": return a.regiao.nome > b.regiao.nome ? 1 : a.regiao.nome < b.regiao.nome ? -1 : 0;
            case "uf": return a.estado.uf > b.estado.uf ? 1 : a.estado.uf < b.estado.uf ? -1 : 0;
            case "modalidade":
               if(a.modalidade != null)
                  return a.modalidade.nome > b.modalidade.nome ? 1 : a.modalidade.nome < b.modalidade.nome ? -1 : 0;
               else
                  return;
            case "portal": return a.portal.nome > b.portal.nome ? 1 : a.portal.nome < b.portal.nome ? -1 : 0;
            case "empresa":
               if(a.empresa != null)
                  return a.empresa.nome > b.empresa.nome ? 1 : a.empresa.nome < b.empresa.nome ? -1 : 0;
               else
                  return;
            case "nossoValor":
               if(a.nossoValor != null && b.nossoValor != null){
                  if((a.nossoValor == null) && (b.nossoValor == null)){
                     return 0 - 0;
                  }else if(a.nossoValor == null){
                     return 0 - b.nossoValor;
                  }else if(b.nossoValor == null){
                     return a.nossoValor - 0;
                  }else{
                     return a.nossoValor - b.nossoValor;
                  }
               }else{
                  return;
               }
            case "valorEstimado":
               if(a.valorEstimado != null && b.valorEstimado != null){
                  if((a.valorEstimado == null) && (b.valorEstimado == null)){
                     return 0 - 0;
                  }else if(a.valorEstimado == null){
                     return 0 - b.valorEstimado;
                  }else if(b.valorEstimado == null){
                     return a.valorEstimado - 0;
                  }else{
                     return a.valorEstimado - b.valorEstimado;
                  }
               }else{
                  return;
               }
         }
      })
   }

   ordenarDeCrescente(valor){
      this.nomeColuna = '';
      this.editais = this.editais
      .sort(function(a,b){
         switch(valor){
            case 'cliente': return  a.cliente.apelido < b.cliente.apelido ? 1 : a.cliente.apelido > b.cliente.apelido ? -1 : 0;
            case "dataAbertura":
               let asplit = a.dataHoraDeAbertura.substring(0, 10).split('-');
               let bsplit = b.dataHoraDeAbertura.substring(0, 10).split('-');
               let anew = Date.parse(asplit[0]+"/"+asplit[1]+"/"+asplit[2]);
               let bnew = Date.parse(bsplit[0]+"/"+bsplit[1]+"/"+bsplit[2]);
               return bnew - anew;
            case "categoria": return a.categoria.nome < b.categoria.nome ? 1 : a.categoria.nome > b.categoria.nome ? -1 : 0;
            case "regiao": return a.regiao.nome < b.regiao.nome ? 1 : a.regiao.nome > b.regiao.nome ? -1 : 0;
            case "uf": return a.estado.uf < b.estado.uf ? 1 : a.estado.uf > b.estado.uf ? -1 : 0;
            case "modalidade":
            if(a.modalidade != null)
               return a.modalidade.nome < b.modalidade.nome ? 1 : a.modalidade.nome > b.modalidade.nome ? -1 : 0;
            else
               return;
            case "portal": return a.portal.nome < b.portal.nome ? 1 : a.portal.nome > b.portal.nome ? -1 : 0;
            case "empresa":
               if(a.empresa != null)
                  return a.empresa.nome < b.empresa.nome ? 1 : a.empresa.nome > b.empresa.nome ? -1 : 0;
               else
                  return;
            case "nossoValor":
               if(a.nossoValor != null && b.nossoValor != null){
                  if((a.nossoValor == null) && (b.nossoValor == null)){
                     return 0 - 0;
                  }else if(a.nossoValor == null){
                     return b.nossoValor - 0;
                  }else if(b.nossoValor == null){
                     return 0 - a.nossoValor;
                  }else{
                     return b.nossoValor - a.nossoValor;
                  }
               }else{
                  return;
               }
            case "valorEstimado":
               if(a.valorEstimado != null && b.valorEstimado != null){
                  if((a.valorEstimado == null) && (b.valorEstimado == null)){
                     return 0 - 0;
                  }else if(a.valorEstimado == null){
                     return b.valorEstimado - 0;
                  }else if(b.valorEstimado == null){
                     return 0 - a.valorEstimado;
                  }else{
                     return b.valorEstimado - a.valorEstimado;
                  }
               }else{
                  return;
               }
         }
      })
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
   HomeRum(){
      this.router.navigate(['/home'])
   }
}
