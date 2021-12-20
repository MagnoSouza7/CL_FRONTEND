import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { registerLocaleData } from '@angular/common';
import {LOCALE_ID} from '@angular/core';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/views/login/login.component';
import { LayoutComponent } from '../app/views/layout/layout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { Alertas } from '../app/shared/class/alertas';
import { UrlService } from '../app/shared/class/url-service';
import { LoginService } from '../app/views/login/login.service';
import { HomeService } from '../app/views/layout/home/home.service';
import { EditalService } from '../app/views/layout/edital/edital.service';
import { SlaService } from './views/layout/sla/sla.service';
import { IndicadoresService } from './views/layout/indicadores/indicadores.service';
import { AlterarService } from './views/layout/alterar/alterar.service';
import { NotificacaoService } from './views/layout/header/notificacao/notificacao.service';
import { GerenteService } from './views/layout/parecer/gerente/gerente.service';
import { DiretorService } from './views/layout/parecer/diretor/diretor.service';
import { LicitacaoService } from './views/layout/parecer/licitacao/licitacao.service';
import { UsuarioService } from './views/layout/cadastro/usuario/usuario.service';
import { ClienteService } from './views/layout/cadastro/cliente/cliente.service';
import { RelatorioService } from './views/layout/relatorio/relatorio.service';
import { CarteiraContaService } from './views/layout/carteira-conta/carteira-conta.service';
import { ConsultarHistoricoService } from './views/layout/consultar-historico/consultar-historico.service';
import { HistoricoService } from './views/layout/historico/historico.service';
import { MotivoPerdaService } from './views/layout/cadastro/motivo-perda/motivo-perda.service';
import { MotivoComumService } from './views/layout/cadastro/motivo-comum/motivo-comum.service';
import { ModalidadeService } from './views/layout/cadastro/modalidade/modalidade.service';
import { PreVendaService } from './views/layout/cadastro/pre-venda/pre-venda.service';
import { BuService } from './views/layout/cadastro/bu/bu.service';
import { CategoriaService } from './views/layout/cadastro/categoria/categoria.service';
import { ConcorrenteService } from './views/layout/cadastro/concorrente/concorrente.service';
import { PortalService } from './views/layout/cadastro/portal/portal.service';
import { ComentarioEditalService } from './views/layout/comentario-edital/comentario-edital.service';
import { EmpresaService } from './views/layout/cadastro/empresa/empresa.service';
import { ConsultaPublicaService } from './views/layout/consulta-publica/consulta-publica.service';

import { MenuComponent } from './views/layout/menu/menu.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HeaderComponent } from './views/layout/header/header.component';
import { HomeComponent } from './views/layout/home/home.component';
import { TabelaPainelComponent } from './views/layout/home/tabela/tabela-painel/tabela-painel.component';
import { TabelaParecerComponent } from './views/layout/home/tabela/tabela-parecer/tabela-parecer.component';
import { SlaComponent } from './views/layout/sla/sla.component';
import { PainelComponent } from './views/layout/painel/painel.component';
import { EditalComponent } from './views/layout/edital/edital.component';
import { GerenteComponent } from './views/layout/parecer/gerente/gerente.component';
import { UploadComponent } from './shared/upload/upload.component';
import { AlterarEditalComponent } from './views/layout/alterar/alterar-edital/alterar-edital.component';
import { IndicadoresComponent } from './views/layout/indicadores/indicadores.component';
import { NotificacaoComponent } from './views/layout/header/notificacao/notificacao.component';
import { AlterarParecerGerenteComponent } from './views/layout/alterar/alterar-parecer-gerente/alterar-parecer-gerente.component';
import { DiretorComponent } from './views/layout/parecer/diretor/diretor.component';
import { AlterarParecerDiretorComponent } from './views/layout/alterar/alterar-parecer-diretor/alterar-parecer-diretor.component';
import { LicitacaoComponent } from './views/layout/parecer/licitacao/licitacao.component';

import { DissidiosComponent } from './views/layout/dissidios/dissidios.component';
import { DissidiosService } from './views/layout/dissidios/dissidios.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { UsuarioComponent } from './views/layout/cadastro/usuario/usuario.component';
import { AlterarParecerLicitacaoComponent } from './views/layout/alterar/alterar-parecer-licitacao/alterar-parecer-licitacao.component';
import { ClienteComponent } from './views/layout/cadastro/cliente/cliente.component';
import { RelatorioComponent } from './views/layout/relatorio/relatorio.component';
import { CarteiraContaComponent } from './views/layout/carteira-conta/carteira-conta.component';
import { ConsultarHistoricoComponent } from './views/layout/consultar-historico/consultar-historico.component';
import { HistoricoComponent } from './views/layout/historico/historico.component';
import { MotivoPerdaComponent } from './views/layout/cadastro/motivo-perda/motivo-perda.component';
import { MotivoComumComponent } from './views/layout/cadastro/motivo-comum/motivo-comum.component';
import { ModalidadeComponent } from './views/layout/cadastro/modalidade/modalidade.component';
import { PreVendaComponent } from './views/layout/cadastro/pre-venda/pre-venda.component';
import { BuComponent } from './views/layout/cadastro/bu/bu.component';
import { CategoriaComponent } from './views/layout/cadastro/categoria/categoria.component';
import { ConcorrenteComponent } from './views/layout/cadastro/concorrente/concorrente.component';
import { PortalComponent } from './views/layout/cadastro/portal/portal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComentarioEditalComponent } from './views/layout/comentario-edital/comentario-edital.component';
import { EmpresaComponent } from './views/layout/cadastro/empresa/empresa.component';
import { DocumentoComponent } from './views/layout/documento/documento.component';
import { ConsultaPublicaComponent } from './views/layout/consulta-publica/consulta-publica.component';
import { DocumentoService } from './views/layout/documento/documento.service';
import { TabelaCadastroComponent } from './views/layout/cadastro/components/tabela-cadastro/tabela-cadastro.component';
import { FormularioCadastroComponent } from './views/layout/cadastro/components/formulario-cadastro/formulario-cadastro.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    MenuComponent,
    HeaderComponent,
    HomeComponent,
    TabelaPainelComponent,
    TabelaParecerComponent,
    SlaComponent,
    PainelComponent,
    EditalComponent,
    GerenteComponent,
    UploadComponent,
    AlterarEditalComponent,
    IndicadoresComponent,
    NotificacaoComponent,
    AlterarParecerGerenteComponent,
    DiretorComponent,
    DissidiosComponent,
    UsuarioComponent,
    AlterarParecerDiretorComponent,
    LicitacaoComponent,
    AlterarParecerLicitacaoComponent,
    ClienteComponent,
    RelatorioComponent,
    CarteiraContaComponent,
    ConsultarHistoricoComponent,
    HistoricoComponent,
    MotivoPerdaComponent,
    MotivoComumComponent,
    ModalidadeComponent,
    PreVendaComponent,
    BuComponent,
    CategoriaComponent,
    ConcorrenteComponent,
    PortalComponent,
    ComentarioEditalComponent,
    EmpresaComponent,
    DocumentoComponent,
    ConsultaPublicaComponent,
    TabelaCadastroComponent,
    FormularioCadastroComponent
  ],
  imports: [
    NgbPaginationModule,
    NgbAlertModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module,
    NgxExtendedPdfViewerModule,
    NgbModule,
    CurrencyMaskModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    LoginService,
    Alertas,
    UrlService,
    HomeService,
    EditalService,
    SlaService,
    IndicadoresService,
    AlterarService,
    NotificacaoService,
    GerenteService,
    DissidiosService,
    UsuarioService,
    DiretorService,
    LicitacaoService,
    ClienteService,
    RelatorioService,
    CarteiraContaService,
    ConsultarHistoricoService,
    HistoricoService,
    MotivoPerdaService,
    MotivoComumService,
    ModalidadeService,
    PreVendaService,
    BuService,
    CategoriaService,
    ConcorrenteService,
    PortalService,
    ComentarioEditalService,
    EmpresaService,
    DocumentoService,
    ConsultaPublicaService,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
