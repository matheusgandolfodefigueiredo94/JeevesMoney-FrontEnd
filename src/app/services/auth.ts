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
  async signUp(credentials: { email: string, password: string }): Promise<any> {
    const { data, error } = await this.supabase.auth.signUp(credentials);
    if (error) throw error;
    return data;
  }

  // Método de Login (SignIn)
  async signIn(credentials: { email: string, password: string }): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
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
}