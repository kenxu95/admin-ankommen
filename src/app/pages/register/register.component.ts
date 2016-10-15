import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

import { REGISTER_POST_PATH } from '../../shared/auth-constants';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./register.scss')],
  template: require('./register.html'),
})

export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  constructor(fb:FormBuilder, private http:Http, private router:Router) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values:any):void {
    this.submitted = true;
    if (this.form.valid) {
      this.register(values.name, values.email, values.passwords.password);
    }
  }

  private register(name: string, email: string, password: string){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    // TODO: USE HTTPS
    // TODO: Store token in cookies instead of local storage?
    this.http.post(REGISTER_POST_PATH, JSON.stringify(
        {name: name, email: email, password: password, description: ''}), options)
        .subscribe(
          data => {
            if (data.status == 200)
              this.router.navigate(['/login']);
          },
          err => console.log(err));
  }

}




















