import { Link } from "react-router-dom"

const About=()=>{
    return(
        <div>
            <h4>Version 0.0.7</h4>
            <Link to='/'>Go back</Link>
            <Link to='mailto:hemantbwskar@gmail.com'>Contact Me</Link>
        </div>
    )
}

export default About