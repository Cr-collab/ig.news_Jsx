import { stripe } from '../../services/stripe'
import { getSession } from 'next-auth/client'

import { fauna } from '../../services/fauna'
import { query as q } from 'faunadb'

export default async (req, response) => {
  if (req.method === 'POST') {
    const session = await getSession({ req })

    const user = await fauna.query(
      q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
    )

    let customerId = user.data.stripe_customers_id

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email
        //metadata
      })

      await fauna.query(
        q.Update(q.Ref(q.Collection('users'), String(user.ref.id)), {
          data: {
            stripe_customers_id: stripeCustomer.id
          }
        })
      )

      customerId = stripeCustomer.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{ price: 'price_1JkbWXJpm2yHf8U5NVScqIzF', quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return response.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).end('Method not Allowed')
  }
}
