import axios from "axios";

export const call = async (title) => {
    axios.post('https://exp.host/--/api/v2/push/send', {
        to: 'ExponentPushToken[gnEnyABShQlqEBR4gIQLPi]',
        sound: 'default',
        title: title,
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    }, {
        headers: {
            'Accept': 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
            //'Authorization': 'key=AIzaSyDe060CqRPDtVhnqwBhW27yU7yW4-p_Jgw'
        }
    },).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
}

export const testForPushTicket = async () => {
    axios.post('https://exp.host/--/api/v2/push/getReceipts', {
        'ids': ['bb4f6e5b-1d97-4b4e-9a83-52d7c711b57d'] // bekommen wir aus der 'call' anfrage
    }, {
        headers: {
            'Accept': 'application/json',
        }
    },).then(response => {
        console.log(response.data)
    }).catch(err => {
        console.log(err)
    })
}