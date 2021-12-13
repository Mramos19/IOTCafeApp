import { LoginRequest } from '../../../Model/User/Request/LoginRequest.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';

import { MessageService } from '../../../@pages/components/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})

export class LoginComponent implements OnInit {

  public _FormLogin: FormGroup = null;
  private _LoginRequest: LoginRequest = {};


  constructor(private _FormBuilder: FormBuilder, private _AutenticationService: AuthenticationService, private _Router: Router, private _NotificationService: MessageService) {

    this._FormLogin = this._FormBuilder.group({

      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })


  }


  ngOnInit() {


  }


  public onSubmit() {

    if (this._FormLogin.valid) {

      this._LoginRequest.email = this._FormLogin.controls['userName'].value;
      this._LoginRequest.password = this._FormLogin.controls['password'].value;


      this._AutenticationService.Login(this._LoginRequest).then(_Response => {

        if (_Response.statusCode == "00") {

          this._AutenticationService.SetToken((_Response.result.token));
          this._Router.navigate(['Home']);

        } else {
          this._NotificationService.create("warning", _Response.message, { Position: "top-right", Style: "flip bar", Duration: 0 });
        }

      }).catch(log => {

        this._NotificationService.create("error", `Error: ${log.error.message}`, { Position: "top-right", Style: "flip bar", Duration: 0 });

      });

    }
  }

}
