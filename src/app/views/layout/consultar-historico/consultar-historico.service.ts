import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class ConsultarHistoricoService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  public verificarEdital(id: string): any {
    return this.urlService.sendRequestFetchPost(`/Edital/VerifyExists?id=${id}`);
  }
}
