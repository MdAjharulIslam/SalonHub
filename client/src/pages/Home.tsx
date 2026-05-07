
import NewsLetter from '../components/NewsLetter'
import Hero from '../components/Hero'
import TopRatedServices from '../components/TopRatedServices'
import Category from '../components/Category'
import MapBranch from '../components/MapBranch'
import FAQ from '../components/FAQ'



const Home = () => {
  return (
    <div>
 
      <Hero />
      <Category />
      <TopRatedServices />
      <MapBranch />
      <FAQ />
      <NewsLetter />

      
    </div>
  )
}

export default Home
