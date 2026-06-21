import { CodeIcon, UsersIcon, ShieldIcon } from './icons'
import Illustration from './Illustration'

const features = [
  { icon: CodeIcon, title: 'Практика', text: 'Реальные проекты и задания' },
  { icon: UsersIcon, title: 'Поддержка', text: 'Сообщество и помощь 24/7' },
  { icon: ShieldIcon, title: 'Сертификаты', text: 'Подтвердите навыки и выделитесь' },
]

export default function Hero() {
  return (
    <section className="hero">
      <header className="hero__top">
        <div className="brand">
          <div className="brand__logo">
            <CodeIcon className="brand__logo-icon" />
          </div>
          <div className="brand__text">
            <span className="brand__name">CodeCore</span>
            <span className="brand__tagline">Учись. Создавай. Развивайся.</span>
          </div>
        </div>
      </header>

      <h1 className="hero__title">
        Учитесь программировать
        <br />
        <span className="hero__title-accent">и создавайте будущее</span>
      </h1>

      <p className="hero__desc">
        Практические курсы, реальные проекты и поддержка сообщества помогут вам
        освоить востребованные технологии и построить карьеру мечты.
      </p>

      <ul className="features">
        {features.map(({ icon: Icon, title, text }) => (
          <li className="feature" key={title}>
            <span className="feature__icon">
              <Icon />
            </span>
            <div className="feature__body">
              <span className="feature__title">{title}</span>
              <span className="feature__text">{text}</span>
            </div>
          </li>
        ))}
      </ul>

      <Illustration />
    </section>
  )
}
