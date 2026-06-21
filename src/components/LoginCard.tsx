import { useState } from 'react'
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  GoogleIcon,
  GitHubIcon,
} from './icons'
import { login, startOAuth, type OAuthProvider } from '../api/auth'
import { ApiError } from '../api/client'

export default function LoginCard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)

  // Состояния запроса: loading блокирует форму, error показывается пользователю.
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setError(null)
    setLoading(true)
    try {
      const { user } = await login({ email, password, remember })
      // TODO(backend): после входа редиректим в дашборд — заменить на роутинг.
      console.log('Успешный вход:', user)
      window.location.assign('/dashboard')
    } catch (err) {
      // ApiError несёт человекочитаемое message; всё прочее — общий текст.
      setError(err instanceof ApiError ? err.message : 'Не удалось войти. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuth = async (provider: OAuthProvider) => {
    if (loading) return
    setError(null)
    try {
      await startOAuth(provider) // редиректит на провайдера
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Не удалось начать вход через провайдера.')
    }
  }

  return (
    <section className="card">
      <h2 className="card__title">Вход в аккаунт</h2>
      <p className="card__subtitle">
        Добро пожаловать обратно! Войдите, чтобы продолжить обучение.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field__label">E-mail</span>
          <span className="field__control">
            <MailIcon className="field__icon" />
            <input
              type="email"
              placeholder="Введите ваш e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={loading}
            />
          </span>
        </label>

        <label className="field">
          <span className="field__label">Пароль</span>
          <span className="field__control">
            <LockIcon className="field__icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={loading}
            />
            <button
              type="button"
              className="field__toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </span>
        </label>

        <div className="form__row">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span className="checkbox__box" />
            Запомнить меня
          </label>
          <a className="link" href="#">
            Забыли пароль?
          </a>
        </div>

        {error && (
          <p className="form__error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? 'Вход…' : 'Войти'}
          {!loading && <ArrowRightIcon className="btn__icon" />}
        </button>
      </form>

      <div className="divider">
        <span>или продолжите с</span>
      </div>

      <div className="socials">
        <button
          type="button"
          className="btn btn--social"
          onClick={() => handleOAuth('google')}
          disabled={loading}
        >
          <GoogleIcon className="btn__brand" />
          Продолжить с Google
        </button>
        <button
          type="button"
          className="btn btn--social"
          onClick={() => handleOAuth('github')}
          disabled={loading}
        >
          <GitHubIcon className="btn__brand" />
          Продолжить с GitHub
        </button>
      </div>

      <p className="card__footer">
        Нет аккаунта?{' '}
        <a className="link link--accent" href="#">
          Зарегистрироваться
        </a>
      </p>
    </section>
  )
}
