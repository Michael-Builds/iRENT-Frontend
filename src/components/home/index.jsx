import React from 'react'
import Landing from './Landing'
import ErrorBoundary from '../ErrorBoundary'
import Layout from '../layout/Layout'

export const Home = () => {
    return (
        <ErrorBoundary>
            <Layout>
                <Landing />
            </Layout>
        </ErrorBoundary>
    )
}
