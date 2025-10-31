// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { environment } from '../../environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  
  // Usamos um BehaviorSubject para que os componentes possam "ouvir"
  // as mudanças no estado de autenticação (logado/deslogado)
  private _currentUser = new BehaviorSubject<boolean>(false);
  
  // Expomos o observable para os componentes usarem
  currentUser = this._currentUser.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    // Ouve mudanças na autenticação (login, logout)
    this.supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (event === 'SIGNED_IN') {
        this._currentUser.next(true);
      } else if (event === 'SIGNED_OUT') {
        this._currentUser.next(false);
      }
    });

    // Inicia verificando se já existe uma sessão
    this.checkUser();
  }

  // Verifica se o usuário já está logado ao carregar a app
  private async checkUser() {
    const { data: { session } } = await this.supabase.auth.getSession();
    if (session) {
      this._currentUser.next(true);
    }
  }

  // Método de Cadastro (SignUp)
  async signUp(credentials: { email: string, password: string }) {
    try {
      const { data, error } = await this.supabase.auth.signUp(credentials);
      
      if (error) {
        console.error('Erro no cadastro:', error);
        throw new Error(this.getErrorMessage(error.message));
      }
      
      console.log('Resposta do cadastro:', data);
      return data.user; // Retorna diretamente o objeto user
    } catch (error) {
      console.error('Erro inesperado no cadastro:', error);
      throw error;
    }
  }

  // Método de Login (SignIn)
  async signIn(credentials: { email: string, password: string }): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword(credentials);
    if (error) throw error;

    // ----- LINHA ADICIONADA -----
    // Força a atualização do estado de login IMEDIATAMENTE.
    // Isso garante que o AuthGuard veja "true" no próximo passo.
    if (data.session) {
      this._currentUser.next(true);
    }
    // -----------------------------
    
    return data;
  }

  // Método de Logout
  async signOut(): Promise<any> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  // Pega a sessão atual (útil para enviar o token para sua API .NET)
  get session() {
    return this.supabase.auth.getSession();
  }

  // Traduz mensagens de erro do Supabase
  private getErrorMessage(error: string): string {
    switch (error) {
      case 'User already registered':
        return 'Este e-mail já está cadastrado.';
      case 'Invalid login credentials':
        return 'E-mail ou senha inválidos.';
      case 'Email not confirmed':
        return 'Por favor, confirme seu e-mail antes de fazer login.';
      case 'Password should be at least 6 characters':
        return 'A senha deve ter pelo menos 6 caracteres.';
      default:
        return 'Ocorreu um erro. Por favor, tente novamente.';
    }
  }
}