import * as crypto from "crypto";

const tlsClient = require("../tlsClient/tlsClient");

async function getInformation(origin: string, destination: string, date: string, adult = 1, teen = 0){
    const client = new tlsClient.tlsClient({sessionId: crypto.randomBytes(20).toString('hex'), debug: false})
    const resp = await client.get("https://www.eurowings.com/de/buchen/fluege/flugsuche.html?isReward=false&source=web&destination=PMI&origins=BER&origin=BER&fromdate=2023-04-10&triptype=oneway&adults=1&children=0&infants=0&lng=de-DE")
    console.log(resp)
    const resp1 = await client.get("https://www.eurowings.com/de/buchen/fluege/flugsuche/flug-buchen/select.booking.json", {
        headers: {
            "accept": "application/json, text/plain, */*",
            "x-csrf-token": "{a426b214e173c06f2548f4b5e9792ce67ed555b1499bda8856adb6305408af4e056f6cb294bfcc23b464107d9c5d61b145d3c88d99dcd76a2c0d3c21bcd3a1171714da241ed6ec3a8949978936f633a89b2089b7b4ff716fb5fe19a3659dafaa}",
            "referer": "https://www.eurowings.com/de/buchen/fluege/flugsuche.html?isReward=false&source=web&destination=PMI&origins=BER&origin=BER&fromdate=2023-04-10&triptype=oneway&adults=1&children=0&infants=0&lng=de-DE",
            "akamai-bm-telemetry": "a=B5369575C3705E101A1CE4FF6F3B5AC5&&&e=RUU1NTMzQTk0RUUxOUNCMkI3MTYzNTQwODhBM0Y4NDJ+WUFBUVM0UVVBazl5dmZpR0FRQUFTNUwxL1JNdStMVm85MXd4QVRSMXlyMHlEL3FrTFZsYnFBK1Jja0diUEV5T1RoUWpGNEd1R2ZrZW1ldkl5NUFlblhlVXp4ZVB1aE5FYnJkM0RHZ1l1Sm9zYThHdWlMT25yeHc0b3JoWjBWSW5pK1JMaHdES0daZEZCSHRWdy8yaHhLQ3AwU1VrRU1VRWRTMU9JRWl1S3dycFIwblRyNm1MeDJFK1lFaEhCbHRTRmJhdFBLRG5RZ0ZiVWt3c3B6cmdvUDZxZXRIWDRpWlBsN1cxQzNGS1p0ZUNiOEVpVWVzQkgwZ2ZoSTE1UGx5V05kR1ljRU00elNvTGFzN0dKdzcwanBTcHFqa0VhMkpZTENqOTN5eXgvejBlWEVVWXN4ND1+MzQyNTMyOH4zNDg3NTUz&&&sensor_data=MjszNDI1MzI4OzM0ODc1NTM7NSw0OCwwLDEsMiwwO1RbS31WfThubj5DXk5LQUBFPUt0RUpbN3Q0dzRUR1Esfj5GTms1SHg2VHElMXNLfjEoRWhQdGk6JVVGXSx7MGgyPzRIYTlPKkMhLktUUWNHUDk8OyZhNEp1RzJOR0ZXKHZWTXx+MUwxV3xBbFFQL2Q8eEZ1ZjllOStgUH1OZ3ZROERGaTR6bHdNJkJwekxlUF9uO3tvRTojJl5iLmxwLXUsanRHO0BuZS8gM2x9N25YcC57eDV5IXR1SVJ9XWgwTURWdGwseldOSlswZHgqcGt8OS5hZUNNOko8LnFYaS8qRiZJLCg+eGpROG5DZXxpZClQKnNsY3FuITdsTzBbfiF2XUQ3Ylc/OnFqOyV0WGNeVUozfCZ9JCk3LEJ0djJtaDB+SDprWExPQSVpUz89NjxtNyF8figuNktOWUxCbUNAQHA7KmJhTmdzNz10Q3B8IEokIWd5fDhbWV53d11PenA7YS0sW2hSYlZZKSxafGRTKXtxSCEpPX5EVmBOVGlCWVs8PWJePzlvdioha3RoLyQtW0Rha3ZdQSpkQEBGIyhxQ1lDWU5od08sfjBLOzI4YUU0PmdDUzoydTZ5T3k8bSgmIEYkZlV1cSxCZUYqdX1YJl9VUHUmK3g0SnQ1TEwzRy83d3RUKUdkSEYgTSpHRU5nZE0pWy0qQG1qcmRwdzVDek5+RTspaDZJb0VhMEEydz1XWUteTWtmR2o9UW08ZmlTayApTGFlU211aTcsICF2WFNFeW09K1EvT2pAdjQ1S2QvMi1NUC5vdEQgN2NBLnlCNGVebzkucXt2bnY4Q2EpRHR3MTpYVlc1ZkRbc1QvIV4/WSwpODgoTSxmPmBAYi1GcGNTLD19Qih8WG1nfFUhSWY+fCAwfU1mU3c9bWAocHlvN24qcDYzZzZ3aUB5a2dpQ25eLzA1bGw4RUtZJTlNbVRqbypna3l1TSQvQXlPYi1OJU9Tdi9QZEFCQGRqQDVFT0wjRyNmdzJAe2glaiUhPzNPRzBDfU9JN3hZRHIxYUJkV0Z9VTR4bFR7SFkrITwmJXBJMyMwKzh7JmZXeT09ejZdS35qUkktdV89LWx+fWVVRjU8MEBBT3dLZl94SU1nPVk7eGtYSjgxfFpGP0ZVSUI7JC1+eyU7XmFPIURIST9uQzBwaFhkSU97IzRueE97XntWIHlfMVhYb1dPMGBsbUshPUtJOFU9QCt5PGhnY35FPDtRUnIxUl9qYWFKeSs6ez46JTtVKCViZ08yNDJJMWZsXSsvWWg1QG0pYCt7OlAsYFJBZWFBZHplYksrPU4xICx6IDJfTWcjREZTMSxLfDR7JEUhKDpBWklEJm41SzsgKzlle0loQll5NTEofWNEPn4qczREYmorKyZ3a3dMMHs6SGoqZTM7fUZecW1XeDkrbyshT318KmNSNkI9LGNjaWs8REBvN3dNdWcoSjA0MSAzQTIjZU9OQ3k2SUZWRXJfJX1nI3E3K1hfPl5pXjZlK0RsckBhUTR0IWUgUi85KS5HZ0gqWTgqVjlWent7TSEofUBXKENobTcsPjc9cVVSXyFDMGROTVdzdGkkNUFGRFJOcyxlJXJZWnA6OD17WHJxRXVfNypoZT9+SS8qSnxjZ3k1dzd0cS99eUQsRTRmUnFIcGluXzl8aVgzR217Z0xLYTBWVFhPdHx8SyllWzhXblNAaVdhO0MmQk8/VVtXQ1ZgMyFJKms/YVkyflROJl9ieCF5ZSFdfllfO3sjTnNGQVZgYlc9Kl5Lb2FwMy5JIDgoQSYhIHh4ciYkeTxmOXM/UjdoWWJjU1FaeD1bWlBsQyxAOytJRUlJTS59RGxaVms2fmFMMWJ+dkg5RSo5c0N+cVdpLUEyJjE2fXBOdn5HcC5XNjt3Mnt8JWV6NkA4RkEyRnx+cistLSZ+eVcsUDB0SCArZXBpYFVTYXJAQ0swayZ9Pm5RYzM+UDc5I2Y+aUErJS9lYSo1RDQ4eWNyKl85QEVRP2lLbXYzPmN0Y3ZNVi4xcmViIHM5WmdLMEhvVVMoMVBoIWZBR2xwfFpEYyBJY2dmfiY5Y3p4e1Q+WW9eQVRNKzptIVp3SUZMOjVKaE04RTFLVyQqOUdKX3U5V1M2VFdMQW44Iz00ZC1nbDRYPy0sOFkvJjpaWF4mJTc+JXQ5TEw6eDomSXFvMWpFWih6a3wxfVgoN2Jzd3doZlFTTG58aCtsPyhTfjlYWlh8TkZEUmIxS307XXMrI3NQJnomSmQ+YFI1QTomQmhiakFzeHA3RmslXi1aOSMhLGAuOTJSXj8kZGllQUc6Z2xGUSg1N01rP1c7aUNRcnEuYERPXSVXP3JeQT5xWSFXVnZdZUFPe1JlMnJmay9ea25gRntTKVdTJStrZVExWUFLYEg6QUx6QSUkLGlHLH0uMn5hcFM9Z1oxL01lSj0hYncyUUJ+THM6JGk/SkhyanY+cl4yTXdScXwrc35ZVy9bPWl0YCs/bkgsVEpPMXZBWmBZS3QgcFFRPVZFVDtAfXAwSkJDa3ZQJnxmSj4qXTVmKkh1OmRDJjEwRT1MRFIhIUhydV1hNWBDTUBELSlgeDx1NzFXNCNpfW80M0U9STsrVDM0JEV4ZFZFLS0mJVlHUGkgLnFbV2E6TGhuKVlrLjtuKQ=="
        }
    })
    console.log(resp1)
    while(1){
        const resp2 = await client.post("https://www.eurowings.com/de/buchen/fluege/flugsuche/flug-buchen/select.booking.json?action=QUERY_FLIGHT_DATA", {
            data: {
                "_payload": {
                    "_type": "UPDATE_COMPONENT",
                    "_updates": [{
                        "_type": "ew/components/booking/flightselect",
                        "_path": "/content/eurowings/de/buchen/fluege/flugsuche/flug-buchen/select/jcr:content/main/flightselect",
                        "_action": "QUERY_FLIGHT_DATA",
                        "_parameters": {
                            "origin": "BER",
                            "destination": "PMI",
                            "outwardDate": "2023-04-10",
                            "adultCount": 1,
                            "tripType": "ONE_WAY"
                        }
                    }]
                }
            }
        });
        console.log(resp1.body)
    }
}

~(async () => {
    await getInformation("", "", "")
})();

