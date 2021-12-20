import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { LayoutComponent } from './views/layout/layout.component';
import { HomeComponent } from './views/layout/home/home.component';
import { SlaComponent } from './views/layout/sla/sla.component';
import { EditalComponent } from './views/layout/edital/edital.component';
import { GerenteComponent } from './views/layout/parecer/gerente/gerente.component';
import { AlterarEditalComponent } from './views/layout/alterar/alterar-edital/alterar-edital.component';
import { AlterarParecerGerenteComponent } from './views/layout/alterar/alterar-parecer-gerente/alterar-parecer-gerente.component';
import { IndicadoresComponent } from './views/layout/indicadores/indicadores.component';
import { DiretorComponent } from './views/layout/parecer/diretor/diretor.component';
import { AlterarParecerDiretorComponent } from './views/layout/alterar/alterar-parecer-diretor/alterar-parecer-diretor.component';
import { LicitacaoComponent } from './views/layout/parecer/licitacao/licitacao.component';
import { AlterarParecerLicitacaoComponent } from './views/layout/alterar/alterar-parecer-licitacao/alterar-parecer-licitacao.component';
import { RelatorioComponent } from './views/layout/relatorio/relatorio.component';
import { ConsultarHistoricoComponent } from './views/layout/consultar-historico/consultar-historico.component';
import { HistoricoComponent } from './views/layout/historico/historico.component';
import { DissidiosComponent } from './views/layout/dissidios/dissidios.component';
import { UsuarioComponent } from './views/layout/cadastro/usuario/usuario.component';
import { ClienteComponent } from './views/layout/cadastro/cliente/cliente.component';
import { CarteiraContaComponent } from './views/layout/carteira-conta/carteira-conta.component';
import { MotivoPerdaComponent } from './views/layout/cadastro/motivo-perda/motivo-perda.component';
import { MotivoComumComponent } from './views/layout/cadastro/motivo-comum/motivo-comum.component';
import { ModalidadeComponent } from './views/layout/cadastro/modalidade/modalidade.component';
import { PreVendaComponent } from './views/layout/cadastro/pre-venda/pre-venda.component';
import { BuComponent } from './views/layout/cadastro/bu/bu.component';
import { CategoriaComponent } from './views/layout/cadastro/categoria/categoria.component';
import { ConcorrenteComponent } from './views/layout/cadastro/concorrente/concorrente.component';
import { PortalComponent } from './views/layout/cadastro/portal/portal.component';
import { ComentarioEditalComponent } from './views/layout/comentario-edital/comentario-edital.component';
import { EmpresaComponent } from './views/layout/cadastro/empresa/empresa.component';
import { DocumentoComponent } from './views/layout/documento/documento.component';
import { ConsultaPublicaComponent } from './views/layout/consulta-publica/consulta-publica.component';


const routes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: '', component: LayoutComponent },
   { path: 'home', component: HomeComponent },
   { path: 'sla', component: SlaComponent },
   { path: 'edital', component: EditalComponent },
   { path: 'parecer-gerente', component: GerenteComponent },
   { path: 'alterar-edital', component: AlterarEditalComponent },
   { path: 'alterar-parecer-gerente', component: AlterarParecerGerenteComponent },
   { path: 'alterar-parecer-diretor', component: AlterarParecerDiretorComponent },
   { path: 'alterar-parecer-licitacao', component: AlterarParecerLicitacaoComponent },
   { path: 'indicadores', component: IndicadoresComponent },
   { path: 'parecer-diretor', component: DiretorComponent },
   { path: 'parecer-licitacao', component: LicitacaoComponent },
   { path: 'dissidios', component: DissidiosComponent },
   { path: 'usuario', component: UsuarioComponent },
   { path: 'cliente', component: ClienteComponent },
   { path: 'relatorio', component: RelatorioComponent },
   { path: 'carteira', component: CarteiraContaComponent },
   { path: 'consultar-historico', component: ConsultarHistoricoComponent },
   { path: 'historico', component: HistoricoComponent },
   { path: 'motivo-perda', component: MotivoPerdaComponent },
   { path: 'motivo-comum', component: MotivoComumComponent },
   { path: 'modalidade', component: ModalidadeComponent },
   { path: 'pre-venda', component: PreVendaComponent },
   { path: 'bu', component: BuComponent },
   { path: 'categoria', component: CategoriaComponent },
   { path: 'concorrente', component: ConcorrenteComponent },
   { path: 'portal', component: PortalComponent },
   { path: 'comentario-edital', component: ComentarioEditalComponent },
   { path: 'empresa', component: EmpresaComponent},
   { path: 'documento', component: DocumentoComponent},
   { path: 'consultaPublica', component: ConsultaPublicaComponent},
   { path: '404', component: LayoutComponent },
   { path: '**', component: LayoutComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
