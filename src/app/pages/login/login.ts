// src/app/pages/login/login.component.ts
import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  isLoginMode = true; 
  email = '';
  password = '';

  isLoading = false;
  errorMessage = '';
  successMessage = ''; // <-- Variável de sucesso ADICIONADA

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, preencha e-mail e senha.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      if (this.isLoginMode) {
        await this.authService.signIn({ email: this.email, password: this.password });
        this.isLoading = false;
        this.router.navigate(['/portfolio']);
      } else {
        const user = await this.authService.signUp({ email: this.email, password: this.password });
        this.isLoading = false;
        if (user && user.confirmation_sent_at) {
          this.successMessage = 'Cadastro realizado! Verifique seu e-mail para confirmação.';
          this.email = '';
          this.password = '';
          this.cdr.detectChanges();
          console.log('Cadastro bem-sucedido:', user);
        } else {
          this.errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
          console.error('Resposta inesperada do cadastro:', user);
        }
      }
    } catch (error: any) {
      this.isLoading = false;
      console.error('Erro na autenticação:', error);
      this.errorMessage = error.message || 'Ocorreu um erro. Por favor, tente novamente.';
    }
  }
}