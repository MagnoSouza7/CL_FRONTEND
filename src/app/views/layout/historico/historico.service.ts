import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class HistoricoService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  GetHistoricoByEditalId(id: string){
    return this.urlService.sendRequestPost(`/Historico/GetHistoricoByEditalId?id=${id}`);
  }
}
