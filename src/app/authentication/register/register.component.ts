import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { take } from 'rxjs/operators';
//ALMS Le movi a las validaciones
const password = new FormControl('', [ Validators.required, Validators.minLength(8) ]);
const confirmPassword = new FormControl('', [CustomValidators.equalTo(password), Validators.minLength(8) ]);


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  //ALMS Modifique
  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      // tslint:disable-next-line - Disables all
      password: password,

      // tslint:disable-next-line - Disables all
      confirmPassword: confirmPassword,

      Ename: [null, Validators.compose([ Validators.required, Validators.minLength(2) ]) ]

    });
  }

  constructor(private fb: FormBuilder, 
    private router: Router) { }

onSubmit(): void {
  this.router.navigate(['/']);
}

}