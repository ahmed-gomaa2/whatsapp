export default function (state={}, action) {
    switch (action.type) {
        case 'CREATE_ROOM':
            return action.payload
        case 'CRETE_ROOM_ERR':
            console.log(action.payload)
            return action.payload
        default:
            return state
    }
}