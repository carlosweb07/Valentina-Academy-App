// src/services/ApiService.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BACKEND_URL } from '../constants/vars'

export interface RequestOptions extends Omit<RequestInit, 'headers' | 'body' | 'method'> {
  headers?: Record<string, string>
  body?: any
}

export class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = BACKEND_URL
  }

  // Método genérico para construir URLs con query params
  private buildUrl(route: string, queryParams?: Record<string, any>): string {
    let url = `${this.baseUrl}/${route}/`
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
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    options: RequestOptions = {},
    queryParams?: Record<string, any>,
    isMedia?: boolean
  ): Promise<T> {
    const url = this.buildUrl(route, queryParams)
    const token = await this.getToken()

    const headers: Record<string, string> = {
      ...(options.headers || {})
    }
    if (token) headers.Authorization = `Token ${token}`    
    

    const response = await fetch(url, {
      method,
      headers,
      body: options.body ? isMedia ? options.body : JSON.stringify(options.body) : undefined
    })

    const contentType = response.headers.get("content-type")

    let data: any = {}

    switch(contentType) {
      case "application/json":
        data = await response.json()
        break
      
      case "application/pdf":
        data = await response.blob()
        break
    }

    return data
  }

  // Helpers públicos
  public get<T>(route: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(route, 'GET', {}, params)
  }

  public post<T>(route: string, data: any, isMedia = false): Promise<T> {
    const options = {
      body: data,
      headers: {}
    }
    
    if(!isMedia) options.headers = {
      "Content-type": "application/json"
    }
    
    return this.request<T>(route, 'POST', options, undefined, isMedia)
  }

  public put<T>(route: string, data: any, isMedia = false): Promise<T> {
    const options = {
      body: data,
      headers: {}
    }
    
    if(!isMedia) options.headers = {
      "Content-type": "application/json"
    }

    return this.request<T>(route, 'PUT', options)
  }

  public patch<T>(route: string, data: any, isMedia = false): Promise<T> {
    const options = {
      body: data,
      headers: {}
    }
    
    if(!isMedia) options.headers = {
      "Content-type": "application/json"
    }

    return this.request<T>(route, 'PATCH', options)
  }

  public delete<T>(route: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(route, 'DELETE', {}, params)
  }
}

// Exporta una sola instancia para reusar en tu app
export default new ApiService()
