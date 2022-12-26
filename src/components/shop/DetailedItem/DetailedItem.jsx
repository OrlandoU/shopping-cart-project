import { useParams } from "react-router-dom"

export default function DetailedItem(){
    const info = useParams()
    console.log(info)

    return(
        <>
            <h1>Item Page</h1>
        </>
    )
}