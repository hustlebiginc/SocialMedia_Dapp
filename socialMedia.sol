// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.12 <0.9.0;


contract SocialMedia {
    struct User {
        address userAddress;
        string username;
        uint256 balance;
    }

    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 likes;
        uint256 timestamp;
    }

    mapping(address => User) public users;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => mapping(address => bool)) public likes;
    uint256 public postCount;
    uint256 public tokenReward = 10;

    event UserRegistered(address userAddress, string username);
    event PostCreated(uint256 id, address author, string content, uint256 timestamp);
    event PostLiked(uint256 id, address user, uint256 timestamp);

    modifier userExists(address _user) {
        require(bytes(users[_user].username).length > 0, "User does not exist");
        _;
    }

    modifier postExists(uint256 _postId) {
        require(posts[_postId].id == _postId, "Post does not exist");
        _;
    }

    function register(string memory _username) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(users[msg.sender].username).length == 0, "User already registered");

        users[msg.sender] = User({
            userAddress: msg.sender,
            username: _username,
            balance: 0
        });

        emit UserRegistered(msg.sender, _username);
    }

    function createPost(string memory _content) public userExists(msg.sender) {
        require(bytes(_content).length > 0, "Content cannot be empty");

        postCount++;
        posts[postCount] = Post({
            id: postCount,
            author: msg.sender,
            content: _content,
            likes: 0,
            timestamp: block.timestamp
        });

        emit PostCreated(postCount, msg.sender, _content, block.timestamp);
    }

    function likePost(uint256 _postId) public userExists(msg.sender) postExists(_postId) {
        require(!likes[_postId][msg.sender], "User already liked this post");

        likes[_postId][msg.sender] = true;
        posts[_postId].likes++;

        // Reward the author
        address author = posts[_postId].author;
        users[author].balance += tokenReward;

        emit PostLiked(_postId, msg.sender, block.timestamp);
    }

    function getPost(uint256 _postId) public view postExists(_postId) returns (
        uint256 id,
        address author,
        string memory content,
        uint256 likesCount,
        uint256 timestamp
    ) {
        Post memory post = posts[_postId];
        return (post.id, post.author, post.content, post.likes, post.timestamp);
    }

    function getUserBalance(address _user) public view userExists(_user) returns (uint256) {
        return users[_user].balance;
    }
}
