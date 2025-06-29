// src/services/ApiService.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

export interface RequestOptions extends Omit<RequestInit, 'headers' | 'body' | 'method'> {
  headers?: Record<string, string>
  body?: any
}

export class ApiService {
  private baseUrl: string

  constructor() {
    // extra.backendUrl lo defines en app.json o .env
    this.baseUrl = (Constants.manifest?.extra?.backendUrl as string) || ''
  }

  // Método genérico para construir URLs con query params
  private buildUrl(route: string, queryParams?: Record<string, any>): string {
    let url = `${this.baseUrl}/${route}`
    if (queryParams && Object.keys(queryParams).length > 0) {
      const qs = Object.entries(queryParams)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join('&')
      url += `?${qs}`
    }
    return url
  }

  // Recupera token de almacenamiento local
  private async getToken(): Promise<string | null> {
    return AsyncStorage.getItem('access_token')
  }

  // Request principal
  private async request<T>(
    route: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    options: RequestOptions = {},
    queryParams?: Record<string, any>
  ): Promise<T> {
    const url = this.buildUrl(route, queryParams)
    const token = await this.getToken()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
    if (token) headers.Authorization = `Token ${token}`

    const response = await fetch(url, {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API ${method} ${url} failed: ${errorText}`)
    }
    return response.json()
  }

  // Helpers públicos
  public get<T>(route: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(route, 'GET', {}, params)
  }

  public post<T>(route: string, data: any): Promise<T> {
    return this.request<T>(route, 'POST', { body: data })
  }

  public put<T>(route: string, data: any): Promise<T> {
    return this.request<T>(route, 'PUT', { body: data })
  }

  public delete<T>(route: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(route, 'DELETE', {}, params)
  }
}

// Exporta una sola instancia para reusar en tu app
export default new ApiService()
