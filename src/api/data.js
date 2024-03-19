import account from "~/database/account"

export const retrieveData = () => {
    const storedData = localStorage.getItem('account')
    if (storedData) {
        return JSON.parse(storedData)
    }
    return null
}

export const storeDataFromDb = () => {
    if (!retrieveData()) {
        localStorage.setItem('account', JSON.stringify(account))
    }
}

export const getLoginUser = () => {
    return localStorage.getItem('username')
}

export const updateData = () => {

}
