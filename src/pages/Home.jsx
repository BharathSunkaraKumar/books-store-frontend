import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RingSpinner from '../components/spinner';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'
import {BsInfoCircle} from 'react-icons/bs'
import { AiOutlineEdit} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

export default function Home() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState('table')

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5000/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
  return (
    <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
            <button onClick={() => setShowType('table')} className='by-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'>
                Table
            </button>
            <button onClick={() => setShowType('card')} className='by-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'>
                Card
            </button>
        </div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Books List</h1>
            <Link to='/books/create'>
                <MdOutlineAddBox className='text-sky-700 hover:text-sky-800 text-4xl'/>
            </Link>
        </div>
        {loading ? (
            <RingSpinner/>
        ):(
            showType === 'table' ? (<BooksTable books={books}/>) : (
                <BooksCard books={books}/>
            )
        )}
    </div>
  )
}
