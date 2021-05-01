import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {
  @Input() titulo!: string;
  @Input() iconClass = 'fa fa-user';
  @Input() botaoListar = false;
  @Input() subtitulo = 'Desde 2021';

  constructor(private router: Router) { }

  ngOnInit(): void {}

  listar(): void {
    this.router.navigate([`/${this.titulo.toLowerCase()}/lista`]);
  }

}
