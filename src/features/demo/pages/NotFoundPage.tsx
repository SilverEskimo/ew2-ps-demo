import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-4">Page not found</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage