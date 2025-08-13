import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import RingSpinner from '../components/spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function DeleteBooks() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState()
  const onDeleteHandle = () => {
    setLoading(true)
    
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        alert('an error happend, please check console')
        console.log(err)
      })
   
  }
  return (
    <div className='px-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Books</h1>
      {loading ? <RingSpinner/> : ""}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={onDeleteHandle}>Yes, Delete it</button>
      </div>
    </div>
  )
}

export default DeleteBooks