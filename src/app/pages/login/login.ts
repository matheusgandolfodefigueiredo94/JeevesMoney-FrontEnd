// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
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
    private router: Router
  ) { }

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, preencha e-mail e senha.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = ''; // <-- Limpa a mensagem de sucesso

    try {
      if (this.isLoginMode) {
        // --- MODO LOGIN ---
        await this.authService.signIn({ email: this.email, password: this.password });
        
        // Agora o AuthGuard vai funcionar graças à mudança no serviço.
        this.router.navigate(['/portfolio']); // <-- CORRIGIDO para /portfolio

      } else {
        // --- MODO CADASTRO ---
        const user = await this.authService.signUp({ email: this.email, password: this.password });
        
        if (user && user.confirmation_sent_at) {
          // Cadastro bem-sucedido
          this.successMessage = 'Cadastro realizado! Verifique seu e-mail para confirmação.';
          this.email = '';
          this.password = '';
          console.log('Cadastro bem-sucedido:', user);
        } else {
          this.errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
          console.error('Resposta inesperada do cadastro:', user);
        }
      }
    } catch (error: any) {
      console.error('Erro na autenticação:', error);
      this.errorMessage = error.message || 'Ocorreu um erro. Por favor, tente novamente.';
    } finally {
      // Garante que isLoading seja sempre false no final
      this.isLoading = false;
      // Força detecção de mudanças caso necessário
      setTimeout(() => this.isLoading = false, 0);
    }
  }
}