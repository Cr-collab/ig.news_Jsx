import {subscribeButton} from './styles.module.scss'

export function SubscribeButton({priceId}){
  return(
    <button
    type="button"
    className={subscribeButton}
    >
      Subscribe now
    </button>
  )
}