import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({title,onAdd,showAdd}) => {

    return (
        <header class ='header'>
            <h1>{title}</h1>
            <Button color={showAdd?'orange':'green'} text={showAdd ?'close':'Add'} onClick={onAdd}/>
                    
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