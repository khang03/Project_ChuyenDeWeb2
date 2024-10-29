import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout, HeaderOnlyLayout } from '~/components/Layout';

import { Switch } from '@mui/material';
import Profile from './Pages/Profile';
import DetailPost from './Pages/DetailPost';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout === HeaderOnlyLayout) {
                            Layout = HeaderOnlyLayout;
                        }
                        return (
                            <Fragment>
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                ></Route>
                            </Fragment>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
