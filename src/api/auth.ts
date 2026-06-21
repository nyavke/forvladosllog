/**
 * Методы авторизации CodeCore.
 *
 * ── Контракт для backend-разработчиков ───────────────────────────────────────
 *
 * POST /auth/login
 *   Запрос:  { email: string, password: string, remember: boolean }
 *            remember=true → сессия долгоживущая (например, cookie на 30 дней),
 *            remember=false → сессия до закрытия браузера.
 *   Ответ 200: { user: { id, name, email, avatarUrl? } }
 *            + Set-Cookie с httpOnly-сессией.
 *   Ответ 401: { message: "Неверный e-mail или пароль", code: "INVALID_CREDENTIALS" }
 *   Ответ 422: { message: "...", code: "VALIDATION_ERROR" }  // невалидные поля
 *
 * GET /auth/oauth/:provider/url   (provider = 'google' | 'github')
 *   Ответ 200: { url: string }   // фронт делает redirect на этот url.
 *   После согласия провайдер вернёт пользователя на ваш callback,
 *   вы ставите сессию-cookie и редиректите обратно на фронт.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { apiRequest } from './client'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export interface LoginPayload {
  email: string
  password: string
  remember: boolean
}

export interface LoginResponse {
  user: User
}

export type OAuthProvider = 'google' | 'github'

/** Вход по e-mail и паролю. Бросает ApiError при ошибке. */
export function login(payload: LoginPayload, signal?: AbortSignal): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: payload,
    signal,
  })
}

/**
 * Получить URL для OAuth-входа и перенаправить пользователя к провайдеру.
 * Бэкенд отдаёт готовую ссылку (с state/PKCE) — фронт только редиректит.
 */
export async function startOAuth(provider: OAuthProvider): Promise<void> {
  const { url } = await apiRequest<{ url: string }>(`/auth/oauth/${provider}/url`)
  window.location.assign(url)
}
