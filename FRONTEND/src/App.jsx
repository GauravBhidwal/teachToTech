import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/student/Home'
import CourseList from './pages/student/CourseList'
import About from './components/students/About'
import Contact from './components/students/Contact'
import CourseDetails from './pages/student/CourseDetails'
import Team from './components/students/Team'
import AddNotes from './pages/educator/AddNotes'
import AddCourse from './pages/educator/AddCourse'
import Notes from './pages/student/Notes'
import AddTrainer from './pages/educator/AddTrainer'
import AllUsers from './pages/educator/AllUsers'
import Articles from './pages/student/articles/Articles'
import AddArticle from './pages/student/articles/AddArticle'
import PreviewArticle from './pages/student/articles/PreviewArticle'
import ArticleSubmit from './pages/student/articles/ArticleSubmit'
import AllArticles from './pages/educator/AllArticles'
import AdminPreviewArticle from './pages/educator/AdminPreviewArticle'
import EditArticles from './pages/educator/EditArticles'
import AddAssignment from './pages/educator/AddAssignment'

export default function App() {
  return (
   <div>
      <Routes>
         <Route path='/' element = {<Home />}/>
         <Route path='/allcourses' element = {<CourseList />}/>
         <Route path="/allcourses/:categoryId" element={<CourseList />} />
         <Route path='/about' element = {<About />}/>
         <Route path='/contact' element = {<Contact />}/>
         <Route path='/course/:id' element={<CourseDetails/>}/>
         <Route path='/team' element={<Team/>}/>
         <Route path='/admin/addnotes' element={<AddNotes/>}/>
         <Route path='/admin/addcourse' element={<AddCourse/>}/>
         <Route path='/notes' element={<Notes/>}/>
         <Route path='/admin/addtrainer' element={<AddTrainer/>}/>
         <Route path='/admin/allusers' element={<AllUsers/>}/>
         <Route path='/allarticles' element={<Articles/>}/>
         <Route path='/addarticle' element={<AddArticle/>}/>
         <Route path='/previewarticle' element={<PreviewArticle/>}/>
         <Route path='/articlesubmit' element={<ArticleSubmit/>}/>
         <Route path='/admin/allarticlesforadmin' element={<AllArticles/>}/>
         <Route path='/adminpreview' element={<AdminPreviewArticle/>}/>
         <Route path="/editarticle" element={<EditArticles />} />
         <Route path='/admin/addassignment' element={<AddAssignment/>}/>
      </Routes>
   </div>
  )
}