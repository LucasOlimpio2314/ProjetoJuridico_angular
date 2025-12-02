import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';

export const routes: Routes = [
  // Rota Principal
  {
    path: '', // quando o usuario acessar a raiz do site
    component: Home
  },

  {
    path:'**',
    redirectTo: '' //casso acesse uma roda inexistente joga para principal
  }
];
