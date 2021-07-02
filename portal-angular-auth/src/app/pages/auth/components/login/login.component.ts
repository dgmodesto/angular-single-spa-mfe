import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  utils = System.import('portal-angular-utils');
  emitEventUtil: System.Module;
  public form: FormGroup;
  private localStorageUtils = new LocalStorageUtils();

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
  ngOnInit(): void {
  }

  public login(): any {
    debugger;
    const val = this.form.value;

    if (val.email && val.password) {
      var dadosLoginString = val.email.includes('assessor')
        ? this.getMockAdvisor()
        : val.email.includes('customer')
        ? this.getMockCustomer()
        : this.getMockAssistent();

      var dadosLoginJson = JSON.parse(dadosLoginString);

      this.localStorageUtils.salvarDadosLocaisUsuario(dadosLoginJson);
      this.localStorageUtils.salvarTokenUsuario(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNzI1OGMwMC03NDk0LTRlMmEtOTE0Yi1hMGIxNjU4ZGJhZGIiLCJlbWFpbCI6ImRvdWdsYXNnb21lc21vZGVzdG9AZ21haWwuY29tLmJyIiwianRpIjoiYjkyMjNlYmYtNjU0Mi00NWE3LTlhMGItNDY4YTg2YWRhNTkzIiwibmJmIjoxNjI0Mjk0MTc0LCJpYXQiOjE2MjQyOTQxNzQsImV4cCI6MTYyNDMwMTM3NCwiaXNzIjoiTWV1U2lzdGVtYSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0In0.decx_ptrUE9byNs622CLYd85jDXEPTPAYKkR7SBsXqw'
      );

      this.emitEventUtil.setLoginAuth(dadosLoginJson);

      window.location.href = '/portal/angular-advisor/advisor/list';
    }
  }

  private getMockCustomer(): string {
    return `
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNzI1OGMwMC03NDk0LTRlMmEtOTE0Yi1hMGIxNjU4ZGJhZGIiLCJlbWFpbCI6ImRvdWdsYXNnb21lc21vZGVzdG9AZ21haWwuY29tLmJyIiwianRpIjoiYjkyMjNlYmYtNjU0Mi00NWE3LTlhMGItNDY4YTg2YWRhNTkzIiwibmJmIjoxNjI0Mjk0MTc0LCJpYXQiOjE2MjQyOTQxNzQsImV4cCI6MTYyNDMwMTM3NCwiaXNzIjoiTWV1U2lzdGVtYSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0In0.decx_ptrUE9byNs622CLYd85jDXEPTPAYKkR7SBsXqw",
      "expiresIn": 7200,
      "userToken": {
        "id": "27258c00-7494-4e2a-914b-a0b1658dbadb",
        "email": "douglasgomesmodesto@gmail.com.br",
        "claims": [
          {
            "value": "27258c00-7494-4e2a-914b-a0b1658dbadd",
            "type": "Cliente"
          },
          {
            "value": "27258c00-7494-4e2a-914b-a0b1658dbadb",
            "type": "sub"
          },
          {
            "value": "douglasgomesmodesto@gmail.com.br",
            "type": "email"
          },
          {
            "value": "b9223ebf-6542-45a7-9a0b-468a86ada593",
            "type": "jti"
          },
          {
            "value": "1624294175",
            "type": "nbf"
          },
          {
            "value": "1624294175",
            "type": "iat"
          }
        ]
      }
    }
    `;
  }

  private getMockAdvisor(): string {
    return `
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNzI1OGMwMC03NDk0LTRlMmEtOTE0Yi1hMGIxNjU4ZGJhZGIiLCJlbWFpbCI6ImRvdWdsYXNnb21lc21vZGVzdG9AZ21haWwuY29tLmJyIiwianRpIjoiYjkyMjNlYmYtNjU0Mi00NWE3LTlhMGItNDY4YTg2YWRhNTkzIiwibmJmIjoxNjI0Mjk0MTc0LCJpYXQiOjE2MjQyOTQxNzQsImV4cCI6MTYyNDMwMTM3NCwiaXNzIjoiTWV1U2lzdGVtYSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0In0.decx_ptrUE9byNs622CLYd85jDXEPTPAYKkR7SBsXqw",
      "expiresIn": 7200,
      "userToken": {
        "id": "27258c00-7494-4e2a-914b-a0b1658dbadb",
        "email": "douglasgomesmodesto@gmail.com.br",
        "claims": [
          {
            "value": "27258c00-7494-4e2a-914b-a0b1658dbadc",
            "type": "Assessor"
          },
          {
            "value": "27258c00-7494-4e2a-914b-a0b1658dbaas",
            "type": "Novo-Assessor"
          },
          {
            "value": "27258c00-7494-4e2a-914b-a0b1658dbadd",
            "type": "Cliente"
          },   
          {
            "value": "27258c00-7494-4e2a-914b-a0b1658dbade",
            "type": "Produto"
          },
          {
            "value": "27258c00-7494-4e2a-914b-a0b1658dbadb",
            "type": "sub"
          },
          {
            "value": "douglasgomesmodesto@gmail.com.br",
            "type": "email"
          },
          {
            "value": "b9223ebf-6542-45a7-9a0b-468a86ada593",
            "type": "jti"
          },
          {
            "value": "1624294175",
            "type": "nbf"
          },
          {
            "value": "1624294175",
            "type": "iat"
          }
        ]
      }
    }
    `;
  }

  private getMockAssistent(): string {
    return `
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNzI1OGMwMC03NDk0LTRlMmEtOTE0Yi1hMGIxNjU4ZGJhZGIiLCJlbWFpbCI6ImRvdWdsYXNnb21lc21vZGVzdG9AZ21haWwuY29tLmJyIiwianRpIjoiYjkyMjNlYmYtNjU0Mi00NWE3LTlhMGItNDY4YTg2YWRhNTkzIiwibmJmIjoxNjI0Mjk0MTc0LCJpYXQiOjE2MjQyOTQxNzQsImV4cCI6MTYyNDMwMTM3NCwiaXNzIjoiTWV1U2lzdGVtYSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0In0.decx_ptrUE9byNs622CLYd85jDXEPTPAYKkR7SBsXqw",
      "expiresIn": 7200,
      "userToken": {
        "id": "27258c00-7494-4e2a-914b-a0b1658dbadb",
        "email": "douglasgomesmodesto@gmail.com.br",
        "claims": [
          {
            "value": "27258c00-7494-4e2a-914b-a0b1658dbadc",
            "type": "Assessor"
          },
          {
            "value": "27258c00-7494-4e2a-914b-a0b1658dbadd",
            "type": "Cliente"
          },
          {
            "value": "27258c00-7494-4e2a-914b-a0b1658dbadb",
            "type": "sub"
          },
          {
            "value": "douglasgomesmodesto@gmail.com.br",
            "type": "email"
          },
          {
            "value": "b9223ebf-6542-45a7-9a0b-468a86ada593",
            "type": "jti"
          },
          {
            "value": "1624294175",
            "type": "nbf"
          },
          {
            "value": "1624294175",
            "type": "iat"
          }
        ]
      }
    }
    `;
  }
}
