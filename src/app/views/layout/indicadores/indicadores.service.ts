import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class IndicadoresService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  autenticateTokenUser(){
    return this.urlService.sendRequestPost(`/Usuario/AutenticateTokenUser`);
  }
}
