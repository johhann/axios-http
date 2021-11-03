const { default: axios } = require("axios")

function getPost() {
    axios
        .get('https://jsonplaceholder.typicode.com/posts/5')
        .then(res => console.log(`one post ${res.data}`))
        .catch(err => console.error(err))
}

const getComments = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/comments/2')
    console.log('one comment' + res);
}

const simultaneous = async () => {
    try {
        const [res1, res2] = await axios.all([
            axios.get('https://jsonplaceholder.typicode.com/comments?_limit=3'),
            axios.get('https://jsonplaceholder.typicode.com/users?_limit=3')
        ])

        console.log('Comments')
        console.log(res1.data)

        console.log('Users')
        console.log(res2.data)
    } catch (err) {
        console.error(err);
    }
}

const transformPost = async () => {
    const req = {
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/comments/2',
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.name = data.name.toUpperCase()
            data.body = data.body.toUpperCase()
            return data
        })
    }
    try {
        const res = await axios(req)
        console.log(res.data)
    } catch (err) {
        console.error(err);
    }
        
}

getPost()
getComments()
simultaneous()
transformPost()
