import Hero from './components/Hero'
import LoginCard from './components/LoginCard'
import { ArrowLeftIcon } from './components/icons'
import './App.css'

export default function App() {
  return (
    <div className="page">
      <div className="page__glow page__glow--purple" />
      <div className="page__glow page__glow--blue" />
      <a className="page__back" href="#">
        <ArrowLeftIcon className="page__back-icon" />
        На главную
      </a>
      <main className="layout">
        <Hero />
        <LoginCard />
      </main>
    </div>
  )
}
