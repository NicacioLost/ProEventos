import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/Helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  get f(): any {
    return this.form.controls;
  }

  public validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmaSenha')
    };
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      sobreNome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmaSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    }, formOptions);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  }
  public resetForm(event: any): void {
    event.preventDefaut();
    this.form.reset();
  }
}
