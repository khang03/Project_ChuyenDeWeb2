import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import HeaderOnlyLayout from './components/Layout/HeaderOnlyLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch } from '@mui/material';
import Find from './Pages/Find';
import ProfileOther from './Pages/ProfileOther';

function App() {
    
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        // handle
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout === HeaderOnlyLayout) {
                            Layout = HeaderOnlyLayout;
                        }
                        // Return
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        {' '}
                                        <Page />{' '}
                                    </Layout>
                                }
                            ></Route>
                        );
                        return (
                            <Router>
                                <Switch>
                                  <Route path="/" exact component={Find}/>
                                  <Route path="/user/:username" component={ProfileOther}/>
                                </Switch>
                            </Router>
                        )
                    })}
                </Routes>
                {/* Gửi thông báo toàn trang */}
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
