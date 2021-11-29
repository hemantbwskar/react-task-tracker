import { Link } from "react-router-dom"

const Footer=()=>{
    return(
        <footer>
            <p>Copyright @copy: 2021</p>
            {/* <Link to='/about'>About</Link> */}
            <p>About</p>
            <h4>Version 0.0.7</h4>
            
            <a href='mailto:hemantbwskar@gmail.com'>Contact Me</a>
        </footer>
    )
}

export default Footer