export default function cookieOptions(path="/",maxAge=60*60*24*30*1000,domain="") {
    return {
        path: path,
        expires: new Date(new Date().getTime() + maxAge),
        domain: domain
    }
}

