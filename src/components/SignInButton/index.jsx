import {signInButton} from './styles.module.scss'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import {signIn, useSession, signOut} from  'next-auth/client'

export function SignInButton(){

   const [session]= useSession();


  return session ? (

    <button
    type="button"
    className={signInButton}
    >
      <FaGithub
      color="#04d361"
      />

      {session.user.name}

      <FiX
       color="#737380"
       onClick={()=> signOut()}
      />

    </button>

  ) : (

    <button
    type="button"
    className={signInButton}
    onClick={()=> signIn('github')}
    >
      <FaGithub
      color="#eba417"
      />
      Sing in with Github
    </button>

  )
}