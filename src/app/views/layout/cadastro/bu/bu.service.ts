import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable()
export class BuService {
   constructor(private urlService: UrlService) {}

   getBus() {
      return this.urlService.sendRequestPost(`/Bu/GetAll`);
   }

   createBu(nome: string) {
      return this.urlService.sendRequestPost(`/Bu/Create`, JSON.stringify({
         nome
      }));
   }

   updateBu(id: number, nome: string, ativo: boolean) {
      return this.urlService.sendRequestPut(`/Bu/Update`, JSON.stringify({
         id,
         nome,
         ativo
      }));
   }
}
