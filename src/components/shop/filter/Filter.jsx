import { useParams } from "react-router-dom"

export default function Filter() {
    const info = useParams()
    console.log(info)
    return (
        <>
            <h1>Filter Page</h1>
        </>
    )
}