import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  get f(): any {
      return this.form.controls;
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
}
