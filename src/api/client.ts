/**
 * HTTP-клиент для общения с backend-API CodeCore.
 *
 * ── Для backend-разработчиков ────────────────────────────────────────────────
 * Базовый адрес берётся из переменной окружения VITE_API_BASE_URL
 * (см. .env.example). Если она не задана — используется '/api' (удобно, когда
 * фронт и бэк живут за одним доменом / проксируются nginx-ом).
 *
 * Соглашения, которые ожидает фронтенд:
 *   • Тело запроса/ответа — JSON (Content-Type: application/json).
 *   • Успех: HTTP 2xx + JSON-тело.
 *   • Ошибка: HTTP 4xx/5xx + JSON вида { "message": "текст для пользователя",
 *     "code": "MACHINE_CODE" }. Поле message показывается пользователю как есть,
 *     поэтому пишите его на русском и человекочитаемо.
 *   • Авторизация — httpOnly-cookie (credentials: 'include'). Если перейдёте на
 *     Bearer-токен в заголовке — добавьте его в getAuthHeaders() ниже.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

/** Унифицированная ошибка API: несёт человекочитаемое message и машинный code. */
export class ApiError extends Error {
  readonly status: number
  readonly code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

/** Заголовки авторизации. Сейчас полагаемся на httpOnly-cookie, заголовки пустые. */
function getAuthHeaders(): Record<string, string> {
  // Пример для Bearer-токена:
  // const token = localStorage.getItem('accessToken')
  // return token ? { Authorization: `Bearer ${token}` } : {}
  return {}
}

/**
 * Низкоуровневый запрос к API.
 * @param path   путь относительно базового URL, например '/auth/login'
 * @param init   стандартные опции fetch (method, body уже сериализуем за вас)
 */
export async function apiRequest<TResponse>(
  path: string,
  init: { method?: string; body?: unknown; signal?: AbortSignal } = {},
): Promise<TResponse> {
  const { method = 'GET', body, signal } = init

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      signal,
      // credentials: 'include' — браузер пришлёт/примет httpOnly-cookie сессии.
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...getAuthHeaders(),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    // Сеть недоступна / CORS / сервер не отвечает — fetch бросает TypeError.
    throw new ApiError('Не удалось связаться с сервером. Проверьте интернет.', 0)
  }

  // 204 No Content — тела нет, возвращаем undefined.
  if (response.status === 204) {
    return undefined as TResponse
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      (data && typeof data.message === 'string' && data.message) ||
      'Что-то пошло не так. Попробуйте ещё раз.'
    throw new ApiError(message, response.status, data?.code)
  }

  return data as TResponse
}
