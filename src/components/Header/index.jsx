import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'
import {headerContainer, headerContent, active } from './styles.module.scss'

export function Header(){
  return(
    <header className={headerContainer}>
      <div className={headerContent}>
         <img src="/images/logo.svg" alt="Ig.news" />
         <nav >
           <ActiveLink href="/" activeClassName={active}>
              <a   > Home </a>
           </ActiveLink>

           <ActiveLink href="/posts" activeClassName={active}  prefetch >
             <a  > Posts </a>
           </ActiveLink>

         </nav>
         <SignInButton/>
      </div>
    </header>
  )
}