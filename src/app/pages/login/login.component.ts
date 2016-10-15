import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { LOGIN_POST_PATH } from '../../shared/auth-constants';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

// DISPLAYS LOGIN PAGE

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;

  constructor(fb:FormBuilder, private http:Http, private router:Router){
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }

  // Called when form is submitted
  public onSubmit(values: any):void {
    if (this.form.valid) {
      this.login(values.email, values.password);
    }
  }

  // Submits login request
  // TODO: USE HTTPS
  // TODO: Store the JWT token in cookie instead of local storage
  // TODO: Handle invalid requests gracefully
  private login(email: string, password: string){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    this.http.post(LOGIN_POST_PATH, JSON.stringify({email: email, password: password}), options)
    .subscribe(
      data => {
        if (data.status == 200){
          // Store the JWT token so auth_http() can find it
          localStorage.setItem('id_token', data.json().token);
          this.router.navigate(['/pages/dashboard']); //Route to dashboard
        }
      },
      err => console.log(err));
  }
}
















