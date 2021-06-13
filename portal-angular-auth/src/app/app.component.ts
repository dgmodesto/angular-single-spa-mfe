import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  utils = System.import('@dgmodesto/portal-angular-utils');
  emitEventUtil: System.Module;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.utils
      .then((u) => {
        this.emitEventUtil = u;
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  public login(): any {
    const val = this.form.value;

    if (val.email && val.password) {
      // this.authService.login(val.email, val.password)
      //     .subscribe(
      //         () => {
      //             console.log("User is logged in");
      //             // this.router.navigateByUrl('/');
      //         }
      //     );
      this.emitEventUtil.setLoginAuth('hashdeautenticacao');

      window.location.href = '/portal/angular-advisor/advisor/list';
    }
  }
}
