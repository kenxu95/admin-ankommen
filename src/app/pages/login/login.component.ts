import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LOGIN_POST_PATH } from '../../shared/auth-constants';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  // public submitted:boolean = false;

  constructor(fb:FormBuilder, private http:Http, private router:Router){
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }

  public onSubmit(values: any):void {
    // this.submitted = true;
    if (this.form.valid) {
      this.login(values.email, values.password);
    }
  }

  private login(email: string, password: string){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    // TODO: USE HTTPS
    // TODO: Store token in cookies instead of local storage?
    this.http.post(LOGIN_POST_PATH, JSON.stringify({email: email, password: password}), options)
    .subscribe(
      data => {
        if (data.status == 200){
          // Store the JWT token so auth_http() can find it
          localStorage.setItem('id_token', data.json().token);

          // Route to dashboard
          this.router.navigate(['/pages/dashboard']);
        }
      },
      err => console.log(err));
  }
}















