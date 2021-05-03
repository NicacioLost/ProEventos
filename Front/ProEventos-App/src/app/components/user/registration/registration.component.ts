import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/Helpers/ValidatorField';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmaSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    }, formOptions);
  }
  public resetForm(): void {
    this.form.reset();
  }
}
