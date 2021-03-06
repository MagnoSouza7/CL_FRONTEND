import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  getRoles() {
    return this.urlService.sendRequestPost(`/Role/GetAllRoles`);
  }

  getUser(){
    return this.urlService.getUser();
  }

  public cadastrarUsuario(email: string, role: string, login: string, senha: string): any {
    return this.urlService.sendRequestFetchPost(`/Usuario/Create?login=${login}&senha=${senha}`, JSON.stringify({
      email: email,
      roleId: Number(role)
    }));
  }

   alterarUsuario(usuarioId: string, role: string, ativo: boolean): any {
      return this.urlService.sendRequestPut(`/Usuario/Update`, JSON.stringify({
         id: Number(usuarioId),
         roleId: Number(role),
         ativo
      }));
   }

getAllUser(){
   return this.urlService.sendRequestPost(`/Usuario/GetAll`)
}

  getSolicitacoes(){
    return this.urlService.sendRequestPost(`/SolicitacaoCadastro/GetAll`);
  }

  public autorizarCadastro(id: number, login: string, senha: string, roleId: number): any {
    return this.urlService.sendRequestFetchPost(`/SolicitacaoCadastro/AutorizarSolicitacao?id=${id}&login=${login}&senha=${senha}&roleId=${roleId}`);
  }

  naoAutorizarCadastro(id: number){
    return this.urlService.sendRequestPost(`/SolicitacaoCadastro/NaoAutorizarSolicitacao?id=${id}`);
  }

}
