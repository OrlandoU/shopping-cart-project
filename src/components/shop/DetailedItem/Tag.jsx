import { Link} from "react-router-dom";

function Tag(props){

    return (
        <Link to={`/shop/${props.filter}/${props.id}`} >
            {props.text}
        </Link>
    )
    
}

export default Tag