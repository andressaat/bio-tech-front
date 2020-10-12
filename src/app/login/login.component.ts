import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string): boolean{
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }else{
      this.snackBar.open('preencha os campos', undefined, { duration: 8000, verticalPosition: 'bottom', panelClass: ['snack-error'] });
    }
    this.formSubmitAttempt = true;
  }

}
