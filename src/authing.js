
let authing

const redirectUri = location.origin
const init = async () => {
    if(authing) return authing

    const {default: axios} = await import('https://cdn.jsdelivr.net/npm/redaxios@0.5.1/dist/redaxios.module.js')
    window.axios = axios
    await import('https://cdn.authing.co/packages/web/5.1.0/index.global.js')

    const {AuthingFactory} = window

    authing = new AuthingFactory.Authing({
        domain: 'https://dgjx.authing.cn',
        appId: "5ea1495b7a8efd8869ec49d4",
        redirectUri,
        userPoolId: '5ea1495a7a8efd3f61ec49cd',
        useImplicitMode: true,
    });

    return authing
}
await init();


export default async () => {
    let loginState

    if (authing.isRedirectCallback()) {
        await authing.handleRedirectCallback()
        location.replace('/')
        return
    }

    loginState = await authing.getLoginState();

    if(!loginState){
        authing.loginWithRedirect()
        return
    }
    return authing
}

export const logout = () => authing.logoutWithRedirect({
    redirectUri: authing.domain
})
export const authUser = async () => authing.getUserInfo()

export const authUserProfile = () => authing.domain + '/u'