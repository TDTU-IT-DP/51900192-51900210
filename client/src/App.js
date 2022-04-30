import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ListMusicProvider } from './components/contexts/ListMusicContext';
import Home from './components/pages/home'
import { UserProvider } from './components/contexts/UserContext';
import Static from './components/pages/static';
import SignIn from './components/pages/auth/SignIn';
import SignUp from './components/pages/auth/SignUp';
import SignOut from './components/pages/auth/SignOut';
import Song from './components/pages/song';
import ManageSong from './components/pages/manage';
import UploadSong from './components/pages/manage/CreateSong';
import CreateAlbum from './components/pages/manage/CreateAlbum';
import NotFound from './components/pages/notfound';
import Admin from './components/pages/admin';
import AdminSong from './components/pages/admin/song';
import AdminCreateSong from './components/pages/admin/song/Create';

function App() {
  return (
    <>
      <ListMusicProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Static />}>
                {/* Home */}
                <Route index element={<Home />} />
                <Route path='signin/*' element={<SignIn />} />
                <Route path='signup/*' element={<SignUp />} />
                <Route path='signout/*' element={<SignOut />}/>
                <Route path='song/:tag' element={<Song />} />
                <Route path='manage/*' element={<ManageSong />}/>
                <Route path='manage/upload-song/*' element={<UploadSong />}/>
                <Route path='manage/create-album/*' element={<CreateAlbum/>}/>

                {/* Admin */}
                <Route path='admin/*' element={<Admin/>} />
                <Route path='admin/song/*' element={<AdminSong/>}/>
                <Route path='admin/song/create/*' element={<AdminCreateSong/>}/>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </UserProvider>
      </ListMusicProvider>
    </>
  );
}

export default App;
