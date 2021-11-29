import { useRouter } from "next/dist/client/router";
import Link from 'next/link'
import { cloneElement } from "react";

export function ActiveLink({ children , activeClassName , ...rest}) {

   const {asPath} =  useRouter()

   const className = asPath === rest.href  ? activeClassName : ''

   return(
     <Link {...rest}>
        {cloneElement(children, { 
          className
        })}
     </Link>
   )

}