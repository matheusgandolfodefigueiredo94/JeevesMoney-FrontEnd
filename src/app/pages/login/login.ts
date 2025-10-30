// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-login',
  standalone: true, // <-- Isso confirma que é um componente standalone
  imports: [
    FormsModule,  // <-- 2. ADICIONE AQUI
    CommonModule  // <-- 3. ADICIONE AQUI (para *ngIf, etc.)
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  // Controla se o formulário está em modo "Login" ou "Cadastro"
  isLoginMode = true; 
  
  // Ligados ao formulário via ngModel
  email = '';
  password = '';

  // Controle de UI
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, preencha e-mail e senha.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      if (this.isLoginMode) {
        // --- MODO LOGIN ---
        await this.authService.signIn({ email: this.email, password: this.password });
        
        // Se o login for bem-sucedido, o onAuthStateChange no serviço
        // vai disparar, e podemos redirecionar o usuário.
        this.router.navigate(['/dashboard']); // <-- Mude para sua rota principal

      } else {
        // --- MODO CADASTRO ---
        await this.authService.signUp({ email: this.email, password: this.password });
        this.errorMessage = 'Cadastro realizado! Verifique seu e-mail para confirmação.';
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Ocorreu um erro.';
    } finally {
      this.isLoading = false;
    }
  }
}