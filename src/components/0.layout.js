import React, { Suspense } from 'react';
import routes from './routes';

const Layout = () => {

    const renderLoading = () => (
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="spinner-grow text-dark" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )

    return (
        <div className="app">
            <Suspense fallback={renderLoading}>
                <main className='main'>
                    {routes.map((routes, index) => (
                        <React.Fragment key={index}>
                            <div id={routes.key} className='container'>
                                <routes.component />
                            </div>
                        </React.Fragment>
                    ))}
                </main>
            </Suspense>
        </div>
    )
}

export default Layout;
