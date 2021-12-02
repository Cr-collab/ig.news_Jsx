import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom'
import Link from 'next/link'
import {signIn, useSession, signOut} from  'next-auth/client'





export default function Posts({ posts }) {
  
  const [session]= useSession();

  return(
     <>
        <Head>
           <title>  Posts | Ignews </title>
        </Head>


        <main className={styles.container}>
           <div className={styles.posts}>

              {
                posts.map((post)=>{
                  return(
                    <Link href={`/posts/${ session?.activeSubscription ? post.slug : `preview/${post.slug}`}`} >
                      <a >
                      <time>
                        {post.updatedAt}
                      </time>
                      <strong>
                          {post.title}
                      </strong>

                      <p>
                        {post.excerpt}
                      </p>
                  </a>
                </Link>

                  )
                })
              }
            
           </div>
        </main>
     </>
  )
}


export const  getStaticProps  = async () =>{
     const prismic = getPrismicClient()

     const response =  await prismic.query(
      [ Prismic.predicates.at('document.type', 'publication')],
      {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100
      }
     )
  
      const posts = response.results.map(post => {
        return {
          slug: post.uid,
          title: RichText.asText(post.data.title),
          excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
          updatedAt : new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
            day: '2-digit',
            month: 'long',
            year: '2-digit'
          })

        }
      } )

     return {
       props :{
           posts
       }
     }
}