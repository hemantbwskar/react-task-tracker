import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({title}) => {
    const onClick=()=>{
        console.log('Click!')
    }
    return (
        <header class ='header'>
            <h1>{title}</h1>
            <Button text='Add' onClick={onClick}/>
                    
        </header>
    )
}

Header.defaultProps={
    title:'Task Tracker'
}

Header.propTypes={
    title: PropTypes.string.isRequired,
}

// css in JS
const headingstyle={
    color:'red', backgroundColor: 'black'
}

export default Header
