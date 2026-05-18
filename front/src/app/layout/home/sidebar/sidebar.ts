import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'mobilemed-sidebar',
  imports: [
    CommonModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  
  @Input() menu: { label: string, path: string }[] = [];

  constructor(private router: Router) { }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
