import React from 'react'
import ErrorBoundary from '../ErrorBoundary'
import Layout from '../layout/Layout'
import FavoritesPage from './Favorite'

const Favorites = () => {
    return (
        <ErrorBoundary>
            <Layout>
              <FavoritesPage/>
            </Layout>
        </ErrorBoundary>
    )
}

export default Favorites
