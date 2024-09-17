import React from 'react'
import ErrorBoundary from '../ErrorBoundary'
import DetailsPage from './Details'
import Layout from '../layout/Layout'

const Details = () => {
    return (
        <ErrorBoundary>
            <Layout>
                <DetailsPage />
            </Layout>
        </ErrorBoundary>
    )
}

export default Details
