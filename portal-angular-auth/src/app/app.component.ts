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
  title = 'portal-angular-auth';

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
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
    }
  }
}
