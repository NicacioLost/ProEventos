import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palestrantes',
  templateUrl: './palestrantes.component.html',
  styleUrls: ['./palestrantes.component.scss']
})
export class PalestrantesComponent implements OnInit {

  public palestrante: any = {
    Tema: 'Angular',
    Local: 'Belo Horizonte'
  };


  constructor() { }

  ngOnInit() {
  }

}
