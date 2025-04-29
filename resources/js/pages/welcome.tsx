import NavBar from '@/components/NavBar'
import BooksList from '../hooks/BooksList'

export default function welcome() {
  return (
    <div>
      <NavBar/>
      <BooksList/>
    </div>
  )
}
