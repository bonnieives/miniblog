import React from 'react'
import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")
  const {insertDocument, response} = useInsertDocument("posts")
  const {user} = useAuthValue()
  const navigate = useNavigate();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const tagsArray = inputValue
      .split(",")
      .map(tag => tag.trim().toLowerCase()); // Trim and convert to lowercase
  
    setTags(tagsArray);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    try {
      new URL(image)
    } catch (error) {
      setFormError("Image URL: You must inform an URL format")
    }

    if(!title || !image || !tags || !body) {
      setFormError("Please fill all fields!")
    }

    if (formError) {
      return
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray: tags,
      uid: user.uid,
      createdBy: user.displayName
    })

    navigate("/")

  }



  return (
    <div className={styles.create_post}>
      <h2>Create Post</h2>
      <p>Write about whatever you want and share your knowledge</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input 
          type="text"
          name="title" 
          required 
          placeholder='Think about a good title' 
          onChange={(e) => setTitle(e.target.value)}
          value={title}/>
        </label>
        <label>
          <span>Image URL:</span>
          <input 
          type="text"
          name="image" 
          required 
          placeholder='Insert an image that represents your post' 
          onChange={(e) => setImage(e.target.value)}
          value={image}/>
        </label>
        <label>
          <span>Content</span>
          <textarea 
          name="body"
          required 
          placeholder='Insert the content of your post' 
          onChange={(e) => setBody(e.target.value)}
          value={body}/>
        </label>
        <label>
          <span>Tags:</span>
          <input 
            type="text"
            name="tags" 
            required 
            placeholder='Insert the tags separated using commas' 
            onChange={handleChange}  // Use the handleChange function
            value={tags.join(',')}   // Join the tags array back into a string for display
          />
        </label>
            {!response.loading && <button className='btn'>Post</button>}
            {response.loading && <button className='btn' disabled>Please wait ...</button>}
            {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
