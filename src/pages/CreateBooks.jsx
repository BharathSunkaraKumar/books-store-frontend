import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import RingSpinner from '../components/spinner';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishyear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios
      .post(`http://localhost:5000/books`, data)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
        alert('somting went wrong, please check the console')
      })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <RingSpinner/> : (
        <div>
          <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            <label>Publish Year</label>
            <input type="text" value={publishYear} onChange={(e) => setPublishyear(e.target.value)} />
          </div>
          <div>
            <button onClick={handleSubmit}>save</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateBooks