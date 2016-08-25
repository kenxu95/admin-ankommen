import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AuthenticationService } from '../../shared/authentication.service';

 @Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  providers: [AuthenticationService],
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private authService:AuthenticationService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }

  public onSubmit(values: any):void {
    this.submitted = true;
    if (this.form.valid) {
      this.authService.login(values.email, values.password);
    }
  }
}
