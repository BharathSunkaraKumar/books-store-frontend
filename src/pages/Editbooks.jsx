import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import RingSpinner from '../components/spinner';

const Editbooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishyear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author)
        setTitle(res.data.title)
        setPublishyear(res.data.publishYear)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  },[])

  const handleEdit = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios
      .put(`http://localhost:5000/books/${id}`, data)
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
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input type="text" value={publishYear} onChange={(e) => setPublishyear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>
          
            <button className='p-2 bg-sky-300 m-8' onClick={handleEdit}>save</button>
          
        </div>
      )}
    </div>
  )
}

export default Editbooks