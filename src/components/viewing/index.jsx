import React from 'react'
import Viewing from './Viewing'
import ErrorBoundary from '../ErrorBoundary'
import Layout from '../layout/Layout'
import Requests from './Requests'

export const AllViewings = () => {
    return (
        <ErrorBoundary>
            <Layout>
                <Viewing />
            </Layout>
        </ErrorBoundary>
    )
}

export const ViewingRequests = () => {
    return (
        <ErrorBoundary>
            <Layout>
                <Requests />
            </Layout>
        </ErrorBoundary>
    )
}


