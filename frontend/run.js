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