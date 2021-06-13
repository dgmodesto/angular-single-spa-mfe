import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-components/form-base.components';
import { CepSearch } from 'src/app/shared/models/address';
import { Advisor } from 'src/app/shared/models/advisor';
import { AdvisorService } from 'src/app/shared/services/advisor/advisor.service';
import { StringUtils } from 'src/app/shared/utils/string-utils';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];


  errors: any[] = [];
  advisorForm: FormGroup;
  advisor: Advisor = new Advisor();
  textDocument = 'CPF (requerido)';
  formResult = '';
  MASKS = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    private advisorService: AdvisorService,
    private router: Router,
    private toastr: ToastrService
  ) {
    super();

    this.validationMessages = {
      name: {
        required: 'Informe o Nome',
      },
      document: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
      },
      publicPlace: {
        required: 'Informe o Logradouro',
      },
      number: {
        required: 'Informe o Número',
      },
      district: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido'
      },
      city: {
        required: 'Informe a Cidade',
      },
      state: {
        required: 'Informe o Estado',
      }
    };

    super.configureMessagesValidationBase(this.validationMessages);
  }

  ngOnInit(): void {

    this.advisorForm = this.fb.group({
      name: ['', [Validators.required]],
      document: ['', [Validators.required, NgBrazilValidators.cpf]],
      enable: ['', [Validators.required]],
      address: this.fb.group({
        publicPlace: ['', [Validators.required]],
        number: ['', [Validators.required]],
        complement: [''],
        district: ['', [Validators.required]],
        cep: ['', [Validators.required, NgBrazilValidators.cep]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]]
      })
    });

    this.advisorForm.patchValue({ enable: true });

  }


  ngAfterViewInit(): void {
    super.configureValidationFormBase(this.formInputElements, this.advisorForm);
  }

  searchCep(cep: string): void {

    cep = StringUtils.justNumbers(cep);
    if (cep.length < 8) { return; }

    this.advisorService.searchCep(cep)
      .subscribe(
        cepRetorno => this.fillAddressSearch(cepRetorno),
        erro => this.errors.push(erro));
  }

  fillAddressSearch(cepSearch: CepSearch): void {

    this.advisorForm.patchValue({
      address: {
        publicPlace: cepSearch.logradouro,
        district: cepSearch.bairro,
        cep: cepSearch.cep,
        city: cepSearch.localidade,
        state: cepSearch.uf,
        complement: cepSearch.complemento,
      }
    });
  }


  addAdvisor(): void {
    if (this.advisorForm.dirty && this.advisorForm.valid) {

      this.advisor = Object.assign({}, this.advisor, this.advisorForm.value);
      this.formResult = JSON.stringify(this.advisor);

      this.advisor.address.cep = StringUtils.justNumbers(this.advisor.address.cep);
      this.advisor.document = StringUtils.justNumbers(this.advisor.document);

      this.advisorService.addAdvisor(this.advisor)
        .subscribe(
          sucesso => { this.processSuccess(sucesso); },
          falha => { this.processFail(falha); }
        );
    }
  }


  processSuccess(response: any): void {
    this.advisorForm.reset();
    this.errors = [];

    this.changeNoSave = false;

    const toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  processFail(fail: any): void {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
