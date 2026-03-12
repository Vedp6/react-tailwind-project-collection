import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Card from "./components/Card"

function App() {
  

  return (
    <>
      <Navbar/>
      <div className="Cards">
        <Card title="Card 1" description="Hey I am Card 1" />
        <Card title="Card 2" description="Hey I am Card 2" />
        <Card title="Card 3" description="Hey I am Card 3" />
        <Card title="Card 4" description="Hey I am Card 4" />
        
      </div>
      <Footer/>
    </>
  )
}

export default App
