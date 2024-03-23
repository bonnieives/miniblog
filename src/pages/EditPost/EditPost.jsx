import styles from './EditPost.module.css'
import { useState, useEffect } from 'react'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {
  const {id} = useParams()
  const {document:post} = useFetchDocument("posts",id)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if(post){
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

//      const textTags = post.tagsArray.join(",")

      setTags(post.tagsArray)
    }
  }, [post])

  const {user} = useAuthValue()

  const {updateDocument, response} = useUpdateDocument("posts")

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

    const data = {
      title,
      image,
      body,
      tagsArray: tags,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    navigate("/dashboard")

  }

  return (
    <div className={styles.create_post}>
      {post && (
        <>
              <h2>Edit Post: {post.title}</h2>
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
        <p className={styles.preview_title}>Image preview:</p>
        <img className={styles.image_preview} src={post.image} alt={post.title} />
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
        </>
      )}

    </div>
  )
}

export default EditPost
