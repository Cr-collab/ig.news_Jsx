import {subscribeButton} from './styles.module.scss'
import {useSession , signIn} from 'next-auth/client'
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import { useRouter } from 'next/router';

export function SubscribeButton({priceId}){
    const [session] = useSession()
    console.log(session)
    const router = useRouter();

    async function handleSubscribe(){
         if(!session){
           signIn('github')
           return;
         }

         if(session.activeSubscription) {
           router.push('/posts')
          return 
        }

         try {
               const response = await api.post('/subscribe')

               

               const { sessionId } = response.data
               const stripe = await getStripeJs()

               await stripe.redirectToCheckout({ sessionId })


         }catch(err){
            alert(err.message)
         }
    }

  return(
    <button
    type="button"
    className={subscribeButton}
    onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}