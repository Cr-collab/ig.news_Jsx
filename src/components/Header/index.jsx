import {headerContainer, headerContent, active } from './styles.module.scss'

export function Header(){
  return(
    <header className={headerContainer}>
      <div className={headerContent}>
         <img src="/images/logo.svg" alt="Ig.news" />
         <nav >
           <a className={active} > Home </a>
           <a > Posts </a>
         </nav>
      </div>
    </header>
  )
}