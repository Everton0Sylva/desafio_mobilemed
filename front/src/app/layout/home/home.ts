import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Header } from './header/header';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';
import { Subject, takeUntil } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'mobilemed-home',
  imports: [
    Header,
    CommonModule,
    Sidebar,
    RouterOutlet
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public menu = [
    { label: 'Pacientes', path: '/paciente' },
    { label: 'Exames', path: '/exame' },
  ];
}
