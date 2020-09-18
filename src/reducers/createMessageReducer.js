export default function (state={}, action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return action.payload
        default:
            return state
    }
}