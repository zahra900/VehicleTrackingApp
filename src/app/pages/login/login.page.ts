import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {

  credentialsForm: FormGroup;
  createAccount: Boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      permissionLevel: [1],
    });
  }

  backToLogin(){
    this.createAccount = !this.createAccount
  }

  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }

  register() {
    this.createAccount = true;
    if (this.credentialsForm.valid) {
      this.authService.register(this.credentialsForm.value).subscribe(res => {
        this.authService.login(this.credentialsForm.value).subscribe();
      });
    }

  }

}
