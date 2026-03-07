import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchList = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
        console.log('Image value:', response.data.products[0]?.image) // single log, no duplicate
      } else {
        setError('Failed to load products.')
      }
    } catch (err) {
      setError('Error fetching products. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      console.log('Removing product:', id, 'Token:', token) // debug
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )
      console.log('Remove response:', response.data) // debug
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message || 'Failed to remove product.')
      }
    } catch (err) {
      console.error('Remove error:', err.response?.data || err.message)
      toast.error('Error removing product.')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading products...</p>
  if (error)   return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        <p className="text-sm text-gray-400 mt-1">{list.length} product{list.length !== 1 ? 's' : ''} listed</p>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[80px_2fr_1fr_1fr_80px] gap-4 bg-gray-100 px-4 py-3 rounded-t text-xs font-semibold text-gray-500 uppercase tracking-wide">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Delete</span>
      </div>

      {/* Product Rows */}
      {list.length === 0 ? (
        <p className="text-center py-10 text-gray-400">No products found.</p>
      ) : (
        list.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[80px_2fr_1fr_1fr_80px] gap-4 items-center px-4 py-3 border-b text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            {/* Product Image */}
            <img
              src={Array.isArray(product.image) ? product.image[0] : product.image}
              alt={product.name}
              className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm"
              onError={(e) => { e.target.src = 'https://placehold.co/56x56?text=N/A' }}
            />

            {/* Name */}
            <span className="font-medium text-gray-800">{product.name}</span>

            {/* Category */}
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-full w-fit">
              {product.category}
            </span>

            {/* Price */}
            <span className="font-semibold text-gray-800">${product.price}</span>

            {/* Delete Button */}
            <button
              onClick={() => removeProduct(product._id)}
              className="flex items-center justify-center w-8 h-8 mx-auto rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition text-lg font-bold cursor-pointer"
              title="Remove product"
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default List