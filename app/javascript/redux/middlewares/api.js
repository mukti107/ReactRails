export default store=>next=>action=>{
    if(action.rest){
        switch(action.method){
            case 'GET':
            return fetch(action.endpoint)
                .then(resp=>resp.json())
                .then(response=>next({...action, type: action.types[1], response}));
            default:
            return fetch(action.endpoint, {
                    method: action.method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(action.body||{})
                })
                .then(resp=>resp.json())
                .then(response=>next({...action, type: action.types[1], response}));
        }
    }else{
        next(action);
    }
}