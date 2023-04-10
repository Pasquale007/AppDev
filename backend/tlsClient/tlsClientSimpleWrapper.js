const ffi = require('ffi-napi');
const utf8 = require('utf8');
const {isJSON} = require("tls");

class tlsClient{
    constructor(config) {
        /*var kernel32 = ffi.Library("kernel32", {
            'SetDllDirectoryA': ["bool", ["string"]]
        })
        kernel32.SetDllDirectoryA(__dirname);*/

        //Set debug
        this.debug = false

        if(this.debug){
            console.log(`Starting tlsClient...`)
        }

        //Set go client
        if(process.platform === "win32"){
            if(this.debug){
                console.log(`Using win32`)
            }
            this.client = ffi.Library(__dirname + '/c.dll', {
                'request': ['string', ['string']],
                'getCookiesFromSession': ['string', ['string']]
            });
        }
        else if(process.platform === "darwin"){
            if(this.debug){
                console.log(`Using darwin`)
            }
            this.client = ffi.Library(__dirname + '/c.dylib', {
                'request': ['string', ['string']],
                'getCookiesFromSession': ['string', ['string']]
            });
        }
        else if(process.platform === "linux"){
            if(this.debug){
                console.log(`Using linux`)
            }
            this.client = ffi.Library(__dirname + '/c.so', {
                'request': ['string', ['string']],
                'getCookiesFromSession': ['string', ['string']]
            });
        }


        //Set proxy
        this.proxy = "";
        if(this.proxy !== "" && !this.proxy.includes("@")){
            throw new Error(`No @ included in proxy ${this.proxy}`);
        }
        if(this.debug){
            console.log(`Using proxy: ${this.proxy}`)
        }

        //Set headers
        this.headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7"
        }
        if(this.debug){
            console.log(`Using headers: ${JSON.stringify(this.headers)}`)
        }

        //Set sessionId
        this.sessionId = ""
        if(this.debug){
            console.log(`Using sessionId: ${this.sessionId}`)
        }
    }

    async setDefaultHeaderValue(key, value){
        this.headers[key] = value;
    }

    /**
     * @param {string} key header key
     **/
    async deleteDefaultHeaderValue(key){
        delete this.headers[key];
    }

    /**
     * @param {string} url Request url
     * @param {string} config Request config
     * * */
    async post(url, config){
        return this.sendRequest("POST", url, config)
    }

    /**
     * @param {string} url Request url
     * @param {string} config Request config
     * * */
    async get(url, config){
        return this.sendRequest("GET", url, config)
    }

    /**
     * @param {string} url Request url
     * @param {string} config Request config
     * * */
    async put(url, config){
        return this.sendRequest("PUT", url, config)
    }

    async sendRequest(method, url, config){
        let headers = {}
        headers = Object.assign({}, this.headers, headers);
        const requestPayload = {
            "tlsClientIdentifier": "chrome_103",
            "followRedirects": false,
            "insecureSkipVerify": false,
            "timeoutSeconds": 30,
            "sessionId": this.sessionId,
            "proxyUrl": this.proxy,
            "headers": headers,
            "headerOrder": Object.entries(headers).map(([key]) => (key)),
            "requestUrl": url,
            "requestMethod": method,
            "requestBody": "",
            "requestCookies": []
        }
        if(this.debug){
            console.log(`Sending ${method} request: ${JSON.stringify(requestPayload)}`)
        }
        let resp = ""
        const requestPromise = await new Promise((resolve, reject) => {
            this.client.request.async(JSON.stringify(requestPayload), (err, response) => {
                // convert response string to json
                resp = JSON.parse(response)
                resp.body = utf8.encode(resp.body);
                try{
                    resp.body = JSON.parse(resp.body);
                }catch (e) {
                }
                resolve(resp)
            })
        })
        if(this.debug){
            console.log(`Response ${method} request: ${JSON.stringify(resp)}`)
        }
        return requestPromise;
    }

    /**
     * @param {string} url Cookie url
     * */
    async getCookies(url){
        if(this.sessionId === ""){
            console.log("No session id available!")
        }
        const payload = {
            sessionId: this.sessionId,
            url: url,
        }

        const cookiePromise = await new Promise((resolve, reject) => {
            this.client.getCookiesFromSession.async(JSON.stringify(payload), (err, cookiesResponse) => {
                const cookiesInSession = JSON.parse(cookiesResponse)

                resolve(cookiesInSession)
            })
        })
        return cookiePromise;
    }

    /**
     * @param {string} url Url
     * @param {string} name name
     */
    async getCookie(url, name){
        let cookiePromise = await this.getCookies(url)
        let result = cookiePromise.find(o => o.Name === name);
        return result;
    }

    /**
     * @param {string} name Cookie name
     * @param {string} value Cookie value
     * @param {string} domain Cookie domain
     * */
    async setCookie(name, value, domain){
        await this.get(domain, {
            debug: false,
            "requestCookies": [{"name": name, "value": value, "path": "/", "domain": ""}]
        })
    }

    async isJson(v) {
        return !!v && typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date) && isJsonable(v);
        function isJsonable(v) {
            try{
                return JSON.stringify(v) === JSON.stringify(JSON.parse(JSON.stringify(v)));
            } catch(e){
                /*console.error("not a dict",e);*/
                return false;
            }
        }
    }
}

module.exports = {tlsClient}