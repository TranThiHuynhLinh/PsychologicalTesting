import account from "~/database/account"
import * as data from "~/api/data"

let local_account = {}

const initializeData = () => {
    local_account = data.retrieveData() || account
}

export const getRole = username => {
    initializeData()
    for (const userType in local_account) {
        const user = local_account[userType].find(user => user.username === username)
        if (user) return user.role
    }
    return "unknown"
}

export const isExist = (username, role) => {
    initializeData()
    const userTypeList = role === 0 ? local_account.clients : local_account.counselors
    return userTypeList.some(user => user.username === username)
}

export const login = (username, password) => {
    initializeData()
    console.log(local_account)
    for (const userType in local_account) {
        const user = local_account[userType].find(user => user.username === username && user.password === password)
        if (user) {
            localStorage.setItem('username', username)
            return true
        }
    }
    return false
}

export const register = (username, password, role) => {
    initializeData()
    const newUser = {
        username, password, role, ...role === 0 && {
            sex: "", age: "", std_year: "", family_status: "", family_eco: "",
            address: "", latest_gpa: "", is_chronic: ""
        }
    }

    if (isExist(username, role)) {
        console.error("Username already exists within the role.")
        return false
    }
    if (role === 0) local_account.clients.push(newUser)
    else if (role === 1) local_account.counselors.push(newUser)
    else {
        console.error("Invalid role.")
        return false
    }

    localStorage.setItem('account', JSON.stringify(local_account))
    return true
}

export const updateUser = (username, updatedData) => {
    initializeData()
    const userIndex = local_account.clients.findIndex(user => user.username === username)
    if (userIndex !== -1) {
        local_account.clients[userIndex] = {
            ...local_account.clients[userIndex],
            ...updatedData
        }
        localStorage.setItem('account', JSON.stringify(local_account))
        return true
    } else {
        console.error("User not found.")
        return false
    }
}


export const getUserData = (username) => {
    initializeData()
    const user = local_account.clients.find(user => user.username === username)
    if (user) {
        return {
            age: user.age || '',
            sex: user.sex || '',
            std_year: user.std_year || '',
            family_status: user.family_status || '',
            family_eco: user.family_eco || '',
            address: user.address || '',
            is_chronic: user.is_chronic || ''
        }
    } else {
        return {
            age: '',
            sex: '',
            std_year: '',
            family_status: '',
            family_eco: '',
            address: '',
            is_chronic: ''
        }
    }
}


