import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { domainToUnicode } from 'url';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
   nomeUser: string = '';
   user: User;
   mostrarMenu: boolean = false;

   constructor(private router: Router) {
      if ('user' in localStorage) {
         this.user = JSON.parse(localStorage.getItem('user'));
         this.nomeUser = this.user.nome;
      } else if ('user' in sessionStorage) {
         this.user = JSON.parse(sessionStorage.getItem('user'));
         this.nomeUser = this.user.nome;
      } else {
         this.router.navigate(['/login']);
         return;
      }

      // document.querySelector("body").addEventListener('mouseover', (event) => {
      //    if(event["toElement"].id == 'botaoMenuUsuario'){
      //       document.querySelector('.menuUsuario').classList.toggle('isOpen')
      //    }
      // })

   }

   ngOnInit(): void {
      
   }

   menuLogout() {
      this.mostrarMenu = !this.mostrarMenu;
   }

   logout() {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');

      this.router.navigate(['/login']);
   }
}
