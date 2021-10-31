import Head from 'next/head'
import { Fragment } from 'react'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import {contentContainer, hero} from './home.module.scss'

export default function Home({product}) {
  return (
    <Fragment>
       <Head>
        <title>Home | ig.news</title>
      </Head>
       
       <main className={contentContainer}>
         <section className={hero}>
            <span>👏 Hey , welcome </span>
            <h1> News about the <span>React</span> world</h1>
            <p> 
              Get access to all the publications <br />
              <span> for {  product.amount } month </span> 
             </p>
         <SubscribeButton  priceId={product.priceId} />
         </section>

         <img 
         src="/images/avatar.svg"
          alt="Girl coding" 
          />
          
       </main>
    </Fragment>
  )
}


export const getStaticProps = async () =>{
  const price = await stripe.prices.retrieve('price_1JkbWXJpm2yHf8U5NVScqIzF',{
    expand: ['product']
  })


  const  product =  {
     priceId : price.id,
     amount : new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD'
     }).format(price.unit_amount / 100)
  };
  return  {
        props: { 
          product
        },
        revalidate: 60 * 60 * 24 , //24 hours 
  }
}
