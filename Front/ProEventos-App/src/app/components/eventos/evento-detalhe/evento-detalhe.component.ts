import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})

export class EventoDetalheComponent implements OnInit {
  evento = {} as Evento;
  form!: FormGroup;
  estadoVerbo = 'post';

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private router: ActivatedRoute,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
                this.localeService.use('pt-br');
              }

    public carregarEvento(): void {
      const eventoIdParam = this.router.snapshot.paramMap.get('id');
      if (eventoIdParam !== null){
        this.spinner.show();
        this.estadoVerbo = 'put';

        // tslint:disable-next-line: deprecation
        this.eventoService.getEventoById(+eventoIdParam).subscribe(
          (evento: Evento) =>
          {
            this.evento = {...evento};
            this.form.patchValue(this.evento);
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar um Evento', 'Erro!');

            console.error(error);
          },

          ).add(() => this.spinner.hide()); // (+) convert para inteiro
        }
      }

      ngOnInit(): void {
        this.validation();
        this.carregarEvento();
      }

      get f(): any {
        return this.form.controls;
      }

      get bsDatePickerConfig(): any {
        return {
          adaptivePosition: true,
          isAnimated: true,
          dateInputFormat: 'DD/MM/YYYY hh:mm a',
          containerClass: 'theme-default',
          showWeekNumbers: false
        };
      }

      public validation(): void {

        this.form = this.fb.group({
          tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
          local: ['', Validators.required],
          dataEvento: ['', Validators.required],
          qtdePessoas: ['', [Validators.required, Validators.max(20000)]],
          telefone: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          imagemURL: ['', Validators.required],
        });

        // this.form = new FormGroup({
        //   tema: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        //   local: new FormControl('', Validators.required),
        //   dataEvento: new FormControl('', Validators.required),
        //   qtdePessoas: new FormControl('', [Validators.required, Validators.max(120000)]),
        //   telefone: new FormControl('', Validators.required),
        //   email: new FormControl('', [Validators.required,Validators.email]),
        //   imagemURL: new FormControl('', Validators.required),
        // });
      }

      public resetForm(): void {
        this.form.reset();
      }

      public cssValidator(campoForm: FormControl): any {
        return {'is-invalid': campoForm.errors && campoForm.touched};
      }

      public salvarAlteracao(): void {
        this.spinner.show();
        if (this.form.valid) {

          if (this.estadoVerbo === 'post')
          { this.evento = {...this.form.value};
            this.eventoService.postEvento(this.evento).subscribe(
            () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso'),
            (error: any ) => {
              console.error(error);
              this.toastr.error('Erro ao salvar evento', 'Error!');
            },
            ).add(() => this.spinner.hide());
          } else // {...trema} faz uma copia dos dados e nao uma referencia
          {this.evento = {id: this.evento.id, ...this.form.value}; // {...} faz uma copia dos dados e nao uma referencia
           this.eventoService.putEvento(this.evento.id, this.evento).subscribe(
            () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso'),
            (error: any ) => {
              console.error(error);
              this.toastr.error('Erro ao salvar evento', 'Error!');
            },
            ).add(() => this.spinner.hide());
          }
        }
      }
}
