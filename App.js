
import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { MetaMaskContext } from './MetaMaskProvider';
import './App.css';
import SocialMedia from './artifacts/contracts/socialMedia.sol/SocialMedia.json';
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const App = () => {
    const { provider, account } = useContext(MetaMaskContext);
    const [contract, setContract] = useState(null);
    const [balance, setBalance] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        const initContract = async () => {
            if (provider && account) {
                const contractInstance = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    SocialMedia.abi, 
                    provider.getSigner()
                );
                setContract(contractInstance);
                try {
                    const user = await contractInstance.users(account);
                    setRegistered(!!user.username);
                    const userBalance = await contractInstance.getUserBalance(account);
                    setBalance(userBalance.toString());

                    const postCount = await contractInstance.postCount();
                    const postsArray = [];
                    for (let i = 1; i <= postCount; i++) {
                        const post = await contractInstance.getPost(i);
                        console.log(`Fetched post: ${JSON.stringify(post)}`);
                        postsArray.push({
                       
                            id: post[0].toString(), // Convert BigNumber to string
                            author: post[1],
                            content: post[2],
                            likes: post[3].toString(), // Convert BigNumber to string
                            timestamp: post[4].toNumber() // Convert BigNumber to number
                        });
                       
                    }
                    setPosts(postsArray);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError('Error fetching user data. Please try again later.');
                }
                
            }
        };

        initContract();
    }, [provider, account]);

    const handleRegister = async () => {
        if (!username) {
            setError('Username cannot be empty.');
            return;
        }
        
        try {
            const tx = await contract.register(username);
            await tx.wait();
            setRegistered(true);
            setError(null);
        } catch (error) { 
            console.error('Error registering user:', error);
            setError('Error registering user. Please try again later.');
        }
    };

   
    const handleCreatePost = async () => {
        if (!newPostContent) {
            setError('Post content cannot be empty.');
            return;
        }
      
        try {
            const tx = await contract.createPost(newPostContent);
            await tx.wait();
            setNewPostContent('');
            setError(null);

            const postCount = await contract.postCount();
            const post = await contract.getPost(postCount);
            setPosts([...posts, {
                    id: post[0].toString(), // Convert BigNumber to string
                    author: post[1],
                    content: post[2],
                    likes: post[3].toString(), // Convert BigNumber to string
                    timestamp: post[4].toNumber() // Convert BigNumber to number
                }]);
        } catch (error) {
            console.error('Error creating post:', error);
            setError('Error creating post. Please try again later.');
        }
    };

    const handleLikePost = async (postId) => {
        
        try {
            const tx = await contract.likePost(postId);
            await tx.wait();
            const updatedPost = await contract.getPost(postId);
            setPosts(posts.map(post => post.id === postId ? {
                id: updatedPost[0].toString(), // Convert BigNumber to string
                author: updatedPost[1],
                content: updatedPost[2],
                likes: updatedPost[3].toString(), // Convert BigNumber to string
                timestamp: updatedPost[4].toNumber() // Convert BigNumber to number
            } : post));
            setError(null);
        } catch (error) {
            console.error('Error liking post:', error);
            setError('Error liking post. Please try again later.');
        }
    };

    return (
        <div className="app">
            <h1>Welcome to the Social Media DApp</h1>
            {error && <p className="error">{error}</p>}
            {balance !== null ? (
                <p>Your balance: {balance} tokens</p>
            ) : (
                <p>Loading balance...</p>
            )}
            {!registered ? (
                <div className="register">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                    <button onClick={handleRegister}>Register</button>
                </div>
            ) : (
                <div className="create-post">
                    <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="What's on your mind?"
                    />
                    <button onClick={handleCreatePost}>Post</button>
                </div>
            )}
            <div className="posts">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <p><strong>{post.author}</strong> at {new Date(post.timestamp * 1000).toLocaleString()}</p>
                        <p>{post.content}</p>
                        <p>Likes: {post.likes}</p>
                        <button onClick={() => handleLikePost(post.id)}>Like</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
