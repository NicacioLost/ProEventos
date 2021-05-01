import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../../models/Evento';

import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
  // , providers: [EventoService]


})
export class EventosComponent implements OnInit {
  modalRef!: BsModalRef;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public widthImg = 100;
  public marginImg = 2;
  public exibirImg = true;
  private filtroListado = '';

    public get filtroLista(): string {
      return this.filtroListado;
    }

    public set filtroLista(value: string){
       this.filtroListado = value;
       this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
    }

    public filtrarEventos(filtrarPor: string): Evento[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        (evento: { tema: string; local: string; }) =>
         evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
         evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }

    constructor(
        private eventoService: EventoService,
        private modalService: BsModalService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) { }

    public ngOnInit(): void {
      this.spinner.show(),
      this.getEventos();
          /** spinner starts on init */
      // setTimeout(() => {
      //   /** spinner ends after 5 seconds */
      //   this.spinner.hide();
      // }, 3000);

    }
    public alterarImagem(): void {
      this.exibirImg = !this.exibirImg;
    }
    public getEventos(): void {

      // tslint:disable-next-line: deprecation
      this.eventoService.getEventos().subscribe({
        next: (eventos: Evento[]) => {
                    this.eventos = eventos;
                    this.eventosFiltrados = this.eventos;
                  },
        error: (error: any)  => {
          console.log(error),
          this.spinner.hide(),
          this.toastr.error('Erro ao Carregar os Eventos', 'Erro!');
        },
        complete: () => this.spinner.hide()
      });
  }

    openModal(template: TemplateRef<any>): void {
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
      this.modalRef.hide();
      this.toastr.success('O Evento foi deletado com sucesso', 'Deletado!');
    }

    decline(): void {
      this.modalRef.hide();
    }
}
