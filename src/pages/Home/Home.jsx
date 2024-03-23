import React from 'react'
import styles from './Home.module.css'

import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments.'
import PostDetail from '../../components/PostDetail'


const Home = () => {
  const [query, setQuery] = useState("")
  const {documents: posts, loading} = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    if(query){
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Se our most recent posts</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder='Search using tags'
        onChange={(e) => setQuery(e.target.value)}/>
        <button className="btn btn-dark">Search</button>
      </form>
      <div>
        <h1>Posts</h1>
        {loading && <p>Loading...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post}/>)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>No post found</p>
            <Link to="/posts/create" className='btn'>Create your first post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
