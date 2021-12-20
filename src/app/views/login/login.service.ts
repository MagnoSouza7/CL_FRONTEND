import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UrlService } from '../../shared/class/url-service';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    login(usuario: string, senha: string) {
       senha = this.ReplaceAll(senha,'+','%2B')
       senha = this.ReplaceAll(senha,'&','%26')
       senha = this.ReplaceAll(senha,'#','%23')
        return this.http.post(`${UrlService.BACKEND_URL}/Usuario/Login?login=${usuario}&senha=${senha}`, "");
    }

    solicitar(nome: string, email: string, motivo: string){
        return this.http.post(`${UrlService.BACKEND_URL}/SolicitacaoCadastro/CreateSolicitacao?nome=${nome}&email=${email}&motivo=${motivo}`, "");
    }

    private ReplaceAll(palavra:string, pesq:string, alvo:string):string{
       while(palavra.includes(pesq)){
          palavra = palavra.replace(pesq,alvo);
       }
       return palavra;
    }

}

