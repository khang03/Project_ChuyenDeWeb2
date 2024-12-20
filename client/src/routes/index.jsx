
import Home from '~/Pages/Home';
import Profile from '~/Pages/Profile';
import Notification from '~/Pages/Notification';
import Find from '~/Pages/Find';
import DetailPost from '~/Pages/DetailPost';
import Chat from '~/Pages/Chat';
import ProfileOther from '~/Pages/ProfileOther';
import HeaderOnlyLayout from '~/components/Layout/HeaderOnlyLayout';
import Register from '~/Pages/Register';
import Login from '~/Pages/Login';
import Changpass from '~/Pages/ChangePass';
import AdminPage from '~/Pages/Admin';
import { DefaultLayout } from '~/components/Layout';
// Annguyen
import { ResetPassword } from '~/Pages/ResetPassword/ResetPassword';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/Profile/', component: Profile },
    { path: '/ProfileOther/:username', component: ProfileOther },
    { path: '/Notification', component: Notification },
    { path: '/Find', component: Find },
    { path: '/Chat', component: Chat, layout: HeaderOnlyLayout },
    { path: '/DetailPost/:id', component: DetailPost },
    { path: '/ChangPass/:id', component: Changpass },
    { path: '/Register/', component: Register, layout: null },
    { path: '/Login', component: Login, layout: null },
    // Annguyen: Đường dẫn http://localhost:3000/ResetPassword
    { path: '/ResetPassword', component: ResetPassword, layout: null },
    { path: '/Admin', component: AdminPage, },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
