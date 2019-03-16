export const getPosts = ()=>({
        rest: true, 
        endpoint: '/api/posts',
        method: 'GET',
        types: ['REQUEST', 'GET_POSTS_SUCCESS', 'FAILURE']
    
});

export const getPost = (id)=>({
    rest: true, 
    endpoint: '/api/posts/'+id,
    id,
    method: 'GET',
    types: ['REQUEST', 'GET_POST_SUCCESS', 'FAILURE']
});


export const deletePost = (id)=>({
    rest: true, 
    endpoint: '/api/posts/'+id,
    id,
    method: 'DELETE',
    types: ['REQUEST', 'DELETE_POST_SUCCESS', 'FAILURE']
});

export const createPost = (data)=>({
        rest: true,
        endpoint: '/api/posts',
        method: 'POST',
        body: data,
        types: ['REQUEST', 'CREATE_POST_SUCCESS', 'FAILURE']
    
});

export const updatePost = (id, data)=>({
    rest: true,
    endpoint: '/api/posts/'+id,
    method: 'PUT',
    body: data,
    id,
    types: ['REQUEST', 'UPDATE_POST_SUCCESS', 'FAILURE']

});

export default (state={records: []}, action) => {
    switch(action.type){
        case 'GET_POSTS_SUCCESS':
            return {
                ...state,
                records: action.response,
            }
        case 'GET_POST_SUCCESS':{
            const records = [...state.records];
            const post = action.response;
            const index = records.findIndex(p=>p.id == post.id);
            if(index > -1){
                records.splice(index, 1, post);
            }else{
                records.push(post);
            }
            return {
                ...state,
                records,
            }
        }
        case 'DELETE_POST_SUCCESS':{
            const records = [...state.records];
            const index = records.findIndex(p=>p.id == action.id);
            if(index > -1){
                records.splice(index, 1);
            }
            return {
                ...state,
                records,
            }
        }
        default:
        return state;
    }
}