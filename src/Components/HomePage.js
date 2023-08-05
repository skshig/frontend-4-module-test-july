import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/actions/apiActions";
import { useNavigate } from "react-router-dom";
import { addToDetails } from "../redux/actions/detailsActions";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { loading, posts, error } = useSelector(state => state.posts);
    console.log(loading, posts, error)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    function handleCardDetails(post) {
        dispatch(addToDetails(post));
        navigate(`/item/${post.id}`);
    }

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>{error}</h1>

    return (
        <div className="container">
            <h1>Social Media for Travellers</h1>
            <input type="text" placeholder="serach..." style={{width:"100%", height:"1.5rem"}}/>
            <div className="mainDiv">
            {
                posts && posts.map((post) => {
                    return (
                        <div className="items" key={post.id} onClick={() => {
                            handleCardDetails(post)
                        }}>
                            <img id="imgs" src={`https://picsum.photos/100?random=${post.id}`} alt={post.title} />
                            <div className="texts">
                                <p>userId: {post.userId}</p>
                                <p>title: {post.title.slice(0, 10)}</p>
                                <p>body: {post.body.slice(0, 50)}</p>
                                <p>Read More...</p>
                                {/* <p>{post.body.charAt(0).toUpperCase()+post.body.slice(1,50)}<Link to={`/post`} className="read-more" onClick={()=>{localStorage.setItem("item",JSON.stringify(post))}}>Read More...</Link></p> */}
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>

    )
}

export default HomePage


