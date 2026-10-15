import React from 'react'
import { useOutletContext } from 'react-router-dom'
import Product from './Product'

export default function Home() {
const {searchQuery = ''} = useOutletContext() || {};
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-orange-200">
      <article>
      <h1 className="text-3xl font-bold text-center mt-8">Welcome to Nova Cart</h1>
        <p className="text-lg text-center mt-4">Your one-stop shop for all your shopping needs!</p>
        <Product searchQuery={searchQuery} />
      </article>
    </div>
  )
}
