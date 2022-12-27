import { Link} from "react-router-dom";

function Tag(props){

    const parseQuery = () => {
        if(!Object.keys(props.tags).length) return `${props.filter}=${props.query}`
        
        let tags = props.tags.query.split('&').map((wholeQuery, index) => {
            let query = wholeQuery.split('=')
            return { [query[0]]: query[1].split(',') }
        })

        let finalObj = {}
        for (let i = 0; i < tags.length; i++) {
            Object.assign(finalObj, tags[i]);
        }

        tags = finalObj

        if(props.filter in tags && props.query in tags[props.filter]){
            tags[props.filter].push(props.query)
        } else{
            tags[props.filter] = [props.query]
        }

        console.log(tags)
        return Object.keys(tags).map(filter => {
            return filter + '=' + tags[filter].join(',')
        }).join('&')
    }

    return (
        <Link to={`/shop/${parseQuery()}`} >
            {props.text}
        </Link>
    )
    
}

export default Tag