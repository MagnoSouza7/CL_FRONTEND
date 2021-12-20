import { Component, OnInit, AfterContentInit, Output } from '@angular/core';
import { HomeService } from './home.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UrlService } from 'src/app/shared/class/url-service';
import { Router } from '@angular/router';
import { Alertas } from 'src/app/shared/class/alertas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   constructor(
      private homeService: HomeService,
      private fb: FormBuilder,
      private urlService: UrlService,
      private router: Router,
      private alertas: Alertas
   ) {
      this.user = this.urlService.getUser();
   }

   public user: any;

   public totalEditalGanhos: any;
   public totalEditalPerda: any;
   public totalEdital: any;
   public totalEditalGo: any;
   public totalEditalNoGo: any;
   public totalEditalSuspenso: any;

   public cardExpandido: boolean = true;
   public filtroForm: FormGroup;
   public dadosForm: any;

   public editaisAguardandoGerente: any;
   public editaisAguardandoDiretor: any;
   public editaisAguardandoLicitacao: any;
   public editaisAcompanhar: any;

   public tituloTabelaPainel: string;
   public editaisPainel: any;
   public exibirTabelaPainel: boolean = false;

   public dataAtual: Date = new Date();

   ngOnInit(): void {
      this.filtroForm = this.fb.group({
         id: this.fb.control(""),
         numEdital: this.fb.control(''),
         cliente: this.fb.control(""),
         dataAberturaEditalInicio: this.fb.control(''),
         dataAberturaEditalFinal: this.fb.control(''),
         modalidade: this.fb.control(""),
         regiao: this.fb.control(""),
         estado: this.fb.control(""),
         uasg: this.fb.control(''),
         consorcio: this.fb.control(''),
         portal: this.fb.control(""),
         gerenteDeContas: this.fb.control(""),
         diretorComercial: this.fb.control(""),
         valorEstimadoInicio: this.fb.control(""),
         valorEstimadoFinal: this.fb.control(""),
         categoria: this.fb.control(""),
         bu: this.fb.control(""),
         empresa: this.fb.control("")
      })

      this.getDadosForm();

      this.getTotalEdital();
      this.getTotalEditalGanhos();
      this.getTotalEditalPerda();
      this.getTotalEditalGo();
      this.getTotalEditalNoGo();
      this.getTotalEditalSuspenso();
      this.obterTabelaGerente();
      this.obterTabelaDiretor();
      this.obterTabelaLicitacao();
      this.obterTabelaAcompanhar();
      this.getTotalEditalPerda();
   }

   obterTabelaGerente(){
      this.homeService.getWaitingGerente(
         this.filtroForm.get("id").value,
         this.filtroForm.get("numEdital").value,
         this.filtroForm.get("cliente").value,
         this.filtroForm.get("dataAberturaEditalInicio").value,
         this.filtroForm.get("dataAberturaEditalFinal").value,
         this.filtroForm.get("modalidade").value,
         this.filtroForm.get("regiao").value,
         this.filtroForm.get("estado").value,
         this.filtroForm.get("categoria").value,
         this.filtroForm.get("uasg").value,
         this.filtroForm.get("consorcio").value,
         this.filtroForm.get("portal").value,
         this.filtroForm.get("gerenteDeContas").value,
         this.filtroForm.get("diretorComercial").value,
         this.filtroForm.get("valorEstimadoInicio").value,
         this.filtroForm.get("valorEstimadoFinal").value,
         this.filtroForm.get("bu").value,
         this.filtroForm.get("empresa").value
      ).subscribe((resp) => {
         this.editaisAguardandoGerente = resp;
      });
   }

   obterTabelaDiretor(){
      this.homeService.getWaitingDiretor(
         this.filtroForm.get("id").value,
         this.filtroForm.get("numEdital").value,
         this.filtroForm.get("cliente").value,
         this.filtroForm.get("dataAberturaEditalInicio").value,
         this.filtroForm.get("dataAberturaEditalFinal").value,
         this.filtroForm.get("modalidade").value,
         this.filtroForm.get("regiao").value,
         this.filtroForm.get("estado").value,
         this.filtroForm.get("categoria").value,
         this.filtroForm.get("uasg").value,
         this.filtroForm.get("consorcio").value,
         this.filtroForm.get("portal").value,
         this.filtroForm.get("gerenteDeContas").value,
         this.filtroForm.get("diretorComercial").value,
         this.filtroForm.get("valorEstimadoInicio").value,
         this.filtroForm.get("valorEstimadoFinal").value,
         this.filtroForm.get("bu").value,
         this.filtroForm.get("empresa").value
      ).subscribe((resp) => {
         this.editaisAguardandoDiretor = resp;
      });
   }

   obterTabelaLicitacao(){
      this.homeService.getWaitingLicitacao(
         this.filtroForm.get("id").value,
         this.filtroForm.get("numEdital").value,
         this.filtroForm.get("cliente").value,
         this.filtroForm.get("dataAberturaEditalInicio").value,
         this.filtroForm.get("dataAberturaEditalFinal").value,
         this.filtroForm.get("modalidade").value,
         this.filtroForm.get("regiao").value,
         this.filtroForm.get("estado").value,
         this.filtroForm.get("categoria").value,
         this.filtroForm.get("uasg").value,
         this.filtroForm.get("consorcio").value,
         this.filtroForm.get("portal").value,
         this.filtroForm.get("gerenteDeContas").value,
         this.filtroForm.get("diretorComercial").value,
         this.filtroForm.get("valorEstimadoInicio").value,
         this.filtroForm.get("valorEstimadoFinal").value,
         this.filtroForm.get("bu").value,
         this.filtroForm.get("empresa").value
      ).subscribe((resp) => {
         this.editaisAguardandoLicitacao = resp;
      });
   }

   obterTabelaAcompanhar(){
      this.homeService.getAguardandoFinalizacao(
         this.filtroForm.get("id").value,
         this.filtroForm.get("numEdital").value,
         this.filtroForm.get("cliente").value,
         this.filtroForm.get("dataAberturaEditalInicio").value,
         this.filtroForm.get("dataAberturaEditalFinal").value,
         this.filtroForm.get("modalidade").value,
         this.filtroForm.get("regiao").value,
         this.filtroForm.get("estado").value,
         this.filtroForm.get("categoria").value,
         this.filtroForm.get("uasg").value,
         this.filtroForm.get("consorcio").value,
         this.filtroForm.get("portal").value,
         this.filtroForm.get("gerenteDeContas").value,
         this.filtroForm.get("diretorComercial").value,
         this.filtroForm.get("valorEstimadoInicio").value,
         this.filtroForm.get("valorEstimadoFinal").value,
         this.filtroForm.get("bu").value,
         this.filtroForm.get("empresa").value
      ).subscribe((resp) => {
         this.editaisAcompanhar = resp;
      });
   }

   toogleCard(){
      this.cardExpandido = !this.cardExpandido;
   }

   getDadosForm(){
      this.homeService.getDadoForm().subscribe(res => {
         this.dadosForm = res;
      })
   }

   getTotalEditalGanhos(){
      this.homeService.getTotalEditalGanhos(
         this.filtroForm.get("id").value,
         this.filtroForm.get("numEdital").value,
         this.filtroForm.get("cliente").value,
         this.filtroForm.get("dataAberturaEditalInicio").value,
         this.filtroForm.get("dataAberturaEditalFinal").value,
         this.filtroForm.get("modalidade").value,
         this.filtroForm.get("regiao").value,
         this.filtroForm.get("estado").value,
         this.filtroForm.get("categoria").value,
         this.filtroForm.get("uasg").value,
         this.filtroForm.get("consorcio").value,
         this.filtroForm.get("portal").value,
         this.filtroForm.get("gerenteDeContas").value,
         this.filtroForm.get("diretorComercial").value,
         this.filtroForm.get("valorEstimadoInicio").value,
         this.filtroForm.get("valorEstimadoFinal").value,
         this.filtroForm.get("bu").value,
         this.filtroForm.get("empresa").value
      ).subscribe(resp => {
            this.totalEditalGanhos = resp;
         });

   }

   getTotalEditalPerda(){
      this.homeService.getTotalEditalPerda(
         this.filtroForm.get("id").value,
         this.filtroForm.get("numEdital").value,
         this.filtroForm.get("cliente").value,
         this.filtroForm.get("dataAberturaEditalInicio").value,
         this.filtroForm.get("dataAberturaEditalFinal").value,
         this.filtroForm.get("modalidade").value,
         this.filtroForm.get("regiao").value,
         this.filtroForm.get("estado").value,
         this.filtroForm.get("categoria").value,
         this.filtroForm.get("uasg").value,
         this.filtroForm.get("consorcio").value,
         this.filtroForm.get("portal").value,
         this.filtroForm.get("gerenteDeContas").value,
         this.filtroForm.get("diretorComercial").value,
         this.filtroForm.get("valorEstimadoInicio").value,
         this.filtroForm.get("valorEstimadoFinal").value,
         this.filtroForm.get("bu").value,
         this.filtroForm.get("empresa").value
      ).subscribe(resp =>{
         this.totalEditalPerda = resp;
      });
   }

   getTotalEdital(){
      this.homeService.getTotalEdital(
         this.filtroForm.get("id").value,
         this.filtroForm.get("numEdital").value,
         this.filtroForm.get("cliente").value,
         this.filtroForm.get("dataAberturaEditalInicio").value,
         this.filtroForm.get("dataAberturaEditalFinal").value,
         this.filtroForm.get("modalidade").value,
         this.filtroForm.get("regiao").value,
         this.filtroForm.get("estado").value,
         this.filtroForm.get("categoria").value,
         this.filtroForm.get("uasg").value,
         this.filtroForm.get("consorcio").value,
         this.filtroForm.get("portal").value,
         this.filtroForm.get("gerenteDeContas").value,
         this.filtroForm.get("diretorComercial").value,
         this.filtroForm.get("valorEstimadoInicio").value,
         this.filtroForm.get("valorEstimadoFinal").value,
         this.filtroForm.get("bu").value,
         this.filtroForm.get("empresa").value
      )
         .subscribe(resp => {
            this.totalEdital = resp;
         });
   }

   getTotalEditalGo(){
      this.homeService.getTotalEditalGo(
         this.filtroForm.get("id").value,
         this.filtroForm.get("numEdital").value,
         this.filtroForm.get("cliente").value,
         this.filtroForm.get("dataAberturaEditalInicio").value,
         this.filtroForm.get("dataAberturaEditalFinal").value,
         this.filtroForm.get("modalidade").value,
         this.filtroForm.get("regiao").value,
         this.filtroForm.get("estado").value,
         this.filtroForm.get("categoria").value,
         this.filtroForm.get("uasg").value,
         this.filtroForm.get("consorcio").value,
         this.filtroForm.get("portal").value,
         this.filtroForm.get("gerenteDeContas").value,
         this.filtroForm.get("diretorComercial").value,
         this.filtroForm.get("valorEstimadoInicio").value,
         this.filtroForm.get("valorEstimadoFinal").value,
         this.filtroForm.get("bu").value,
         this.filtroForm.get("empresa").value
      )
         .subscribe(resp => {
            this.totalEditalGo = resp;
         });
   }

   getTotalEditalNoGo(){
      this.homeService.getTotalEditalNoGo(
         this.filtroForm.get("id").value,
         this.filtroForm.get("numEdital").value,
         this.filtroForm.get("cliente").value,
         this.filtroForm.get("dataAberturaEditalInicio").value,
         this.filtroForm.get("dataAberturaEditalFinal").value,
         this.filtroForm.get("modalidade").value,
         this.filtroForm.get("regiao").value,
         this.filtroForm.get("estado").value,
         this.filtroForm.get("categoria").value,
         this.filtroForm.get("uasg").value,
         this.filtroForm.get("consorcio").value,
         this.filtroForm.get("portal").value,
         this.filtroForm.get("gerenteDeContas").value,
         this.filtroForm.get("diretorComercial").value,
         this.filtroForm.get("valorEstimadoInicio").value,
         this.filtroForm.get("valorEstimadoFinal").value,
         this.filtroForm.get("bu").value,
         this.filtroForm.get("empresa").value
      )
         .subscribe(resp => {
            this.totalEditalNoGo = resp;
         });
   }

   getTotalEditalSuspenso(){
      this.homeService.getTotalEditalSuspenso(
         this.filtroForm.get("id").value,
         this.filtroForm.get("numEdital").value,
         this.filtroForm.get("cliente").value,
         this.filtroForm.get("dataAberturaEditalInicio").value,
         this.filtroForm.get("dataAberturaEditalFinal").value,
         this.filtroForm.get("modalidade").value,
         this.filtroForm.get("regiao").value,
         this.filtroForm.get("estado").value,
         this.filtroForm.get("categoria").value,
         this.filtroForm.get("uasg").value,
         this.filtroForm.get("consorcio").value,
         this.filtroForm.get("portal").value,
         this.filtroForm.get("gerenteDeContas").value,
         this.filtroForm.get("diretorComercial").value,
         this.filtroForm.get("valorEstimadoInicio").value,
         this.filtroForm.get("valorEstimadoFinal").value,
         this.filtroForm.get("bu").value,
         this.filtroForm.get("empresa").value
      )
         .subscribe(resp => {
            this.totalEditalSuspenso = resp;
         });
   }

   filtrar(){
      this.obterTabelaGerente();
      this.obterTabelaDiretor();
      this.obterTabelaLicitacao();
      this.obterTabelaAcompanhar();
      this.getTotalEditalGanhos();
      this.getTotalEdital();
      this.getTotalEditalGo();
      this.getTotalEditalNoGo();
      this.getTotalEditalSuspenso();
      this.getTotalEditalPerda();
   }

   limparFiltros(){
      this.totalEditalGanhos = '';
      this.totalEdital = '';
      this.totalEditalPerda = '';
      this.totalEditalGo = '';
      this.totalEditalNoGo = '';
      this.totalEditalSuspenso = '';

      this.filtroForm.get("id").setValue('');
      this.filtroForm.get("numEdital").setValue('');
      this.filtroForm.get("cliente").setValue('');
      this.filtroForm.get("dataAberturaEditalInicio").setValue('');
      this.filtroForm.get("dataAberturaEditalFinal").setValue('');
      this.filtroForm.get("modalidade").setValue('');
      this.filtroForm.get("regiao").setValue('');
      this.filtroForm.get("estado").setValue('');
      this.filtroForm.get("categoria").setValue('');
      this.filtroForm.get("uasg").setValue('');
      this.filtroForm.get("consorcio").setValue('');
      this.filtroForm.get("portal").setValue('');
      this.filtroForm.get("gerenteDeContas").setValue('');
      this.filtroForm.get("diretorComercial").setValue('');
      this.filtroForm.get("valorEstimadoInicio").setValue('');
      this.filtroForm.get("valorEstimadoFinal").setValue('');
      this.filtroForm.get("bu").setValue('');
      this.filtroForm.get("empresa").setValue('');

      this.obterTabelaGerente();
      this.obterTabelaDiretor();
      this.obterTabelaLicitacao();
      this.obterTabelaAcompanhar();
      this.getTotalEditalGanhos();
      this.getTotalEdital();
      this.getTotalEditalGo();
      this.getTotalEditalNoGo();
      this.getTotalEditalSuspenso();
      this.getTotalEditalPerda();
   }

   consultarTabelaPainel(tabela: string){
      switch(tabela){
         case "ganhos": this.editaisPainel = this.totalEditalGanhos;
                        this.tituloTabelaPainel = "EDITAIS GANHOS";
                        break;
         case "total":  this.editaisPainel = this.totalEdital;
                        this.tituloTabelaPainel = "EDITAIS CADASTRADOS";
                        break;
         case "perda":  this.editaisPainel = this.totalEditalPerda;
                        this.tituloTabelaPainel = "EDITAIS PERDAS";
                        break;
         case "go":     this.editaisPainel = this.totalEditalGo;
                        this.tituloTabelaPainel = "EDITAIS GO";
                        break;
         case "nogo":   this.editaisPainel = this.totalEditalNoGo;
                        this.tituloTabelaPainel = "EDITAIS NOGO";
                        break;
         case "suspenso":  this.editaisPainel = this.totalEditalSuspenso;
                           this.tituloTabelaPainel = "EDITAIS SUSPENSOS";
                           break;
      }

      this.exibirTabelaPainel = true;
   }

   reciverFecharTabelaPainel(resposta) {
      this.editaisPainel = undefined;
      this.tituloTabelaPainel = "";
      this.exibirTabelaPainel = resposta;
   }


//funcao para enviar para o componetne filho
   emitirParecerGerente(parecer: any){
      if(this.user.id != parecer.gerente.id && this.user.role.nome == "gerente"){
         this.alertas.erro("Você não é o gerente indicado neste edital!");
      }else{
         sessionStorage.setItem('cadastrar-parecer', parecer.id)
         this.router.navigate(['/parecer-gerente'])
      }
   }

   emitirParecerDiretor(parecer: any){
      if(this.user.id == parecer.diretor.id || this.user.role.nome == "licitacao" || this.user.role.nome == "administrador"){
         sessionStorage.setItem('cadastrar-parecer', parecer.id)
         this.router.navigate(['/parecer-diretor'])
      }else{
         this.alertas.erro("Você não é o diretor indicado neste edital!");
      }
   }

   emitirParecerLicitacao(parecer: any){
      sessionStorage.setItem('cadastrar-parecer', parecer.id)
      this.router.navigate(['/parecer-licitacao'])
   }

   emitirParecerLicitacaoFinalizar(parecer: any){
      sessionStorage.setItem('finalizar-parecer', parecer.id)
      this.router.navigate(['/parecer-licitacao'])
   }

   alterarEdital(parecer: any, tipo: string){
      if(tipo == 'Suspenso'){
         if(this.user.role.nome == "licitacao" || this.user.role.nome == "administrador"){
            sessionStorage.setItem('restaurar', parecer.id);
            this.router.navigate(['/edital']);
         }else{
            this.alertas.erro("Somente a equipe de licitação pode restaurar um edital!");
         }
      }
   }
}
