import React from 'react'
import MyProperties from './MyProperties'
import ErrorBoundary from '../ErrorBoundary'
import Layout from '../layout/Layout'

const Properties = () => {
    return (
        <ErrorBoundary>
            <Layout>
                <MyProperties />
            </Layout>
        </ErrorBoundary>
    )
}

export default Properties
