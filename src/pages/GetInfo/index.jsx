import React, { useState, useEffect } from 'react'
import * as user from "~/api/user"
import * as data from "~/api/data"

function GetInfo() {
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [yearOfStudy, setYearOfStudy] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')
    const [familyEconomicStatus, setFamilyEconomicStatus] = useState('')
    const [livingArrangements, setLivingArrangements] = useState('')
    const [healthStatus, setHealthStatus] = useState('')

    const handleAgeChange = (e) => setAge(e.target.value)
    const handleGenderChange = (e) => setGender(e.target.value)
    const handleYearOfStudyChange = (e) => setYearOfStudy(e.target.value)
    const handleMaritalStatusChange = (e) => setMaritalStatus(e.target.value)
    const handleFamilyEconomicStatusChange = (e) => setFamilyEconomicStatus(e.target.value)
    const handleLivingArrangementsChange = (e) => setLivingArrangements(e.target.value)
    const handleHealthStatusChange = (e) => setHealthStatus(e.target.value)
    useEffect(() => {
        const username = data.getLoginUser()
        if (username) {
            const userData = user.getUserData(username)
            setAge(userData.age)
            setGender(userData.sex)
            setYearOfStudy(userData.std_year)
            setMaritalStatus(userData.family_status)
            setFamilyEconomicStatus(userData.family_eco)
            setLivingArrangements(userData.address)
            setHealthStatus(userData.is_chronic === true ? "Có" : "Không")
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedData = {
            age,
            sex: gender,
            std_year: yearOfStudy,
            family_status: maritalStatus,
            family_eco: familyEconomicStatus,
            address: livingArrangements,
            is_chronic: healthStatus === "Có"
        }
        const username = data.getLoginUser()
        if (username) {
            const result = user.updateUser(username, updatedData)
            if (result) {
                console.log("User information updated successfully.")
            } else {
                console.error("There was a problem updating the user information.")
            }
        } else {
            console.error("No username found in localStorage. User must be logged in to update information.")
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="age">Tuổi:</label>
                <input type="number" id="age" value={age} onChange={handleAgeChange} />
            </div>
            <div>
                <label htmlFor="gender">Giới tính:</label>
                <select id="gender" value={gender} onChange={handleGenderChange}>
                    <option value="">Chọn</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Nam">Nam</option>
                    <option value="Khác">Khác</option>
                </select>
            </div>
            <div>
                <label htmlFor="yearOfStudy">Sinh viên năm thứ mấy?</label>
                <select id="yearOfStudy" value={yearOfStudy} onChange={handleYearOfStudyChange}>
                    <option value="">Chọn</option>
                    <option value="Năm 1">Năm 1</option>
                    <option value="Năm 2">Năm 2</option>
                    <option value="Năm 3">Năm 3</option>
                    <option value="Năm 4">Năm 4</option>
                    <option value="Khác">Khác</option>
                </select>
            </div>
            <div>
                <label htmlFor="maritalStatus">Tình trạng gia đình (bố mẹ):</label>
                <select id="maritalStatus" value={maritalStatus} onChange={handleMaritalStatusChange}>
                    <option value="">Chọn</option>
                    <option value="Sống chung">Sống chung</option>
                    <option value="Ly thân / ly hôn">Ly thân / ly hôn</option>
                    <option value="Khác">Khác</option>
                </select>
            </div>
            <div>
                <label htmlFor="familyEconomicStatus">Kinh tế gia đình:</label>
                <select id="familyEconomicStatus" value={familyEconomicStatus} onChange={handleFamilyEconomicStatusChange}>
                    <option value="">Chọn</option>
                    <option value="Nghèo/ cận nghèo">Nghèo/ cận nghèo</option>
                    <option value="Bình thường">Bình thường</option>
                    <option value="Khá giả">Khá giả</option>
                </select>
            </div>
            <div>
                <label htmlFor="livingArrangements">Nơi sinh sống hiện tại:</label>
                <select id="livingArrangements" value={livingArrangements} onChange={handleLivingArrangementsChange}>
                    <option value="">Chọn</option>
                    <option value="Sống chung với bố mẹ">Sống chung với bố mẹ</option>
                    <option value="Sống ở nhà riêng">Sống ở nhà riêng</option>
                    <option value="Phòng trọ">Phòng trọ</option>
                    <option value="Ở nhà người quen, họ hàng">Ở nhà người quen, họ hàng</option>
                    <option value="Khác">Khác</option>
                </select>
            </div>
            <div>
                <label htmlFor="healthStatus">Có bệnh mãn tính không?</label>
                <select id="healthStatus" value={healthStatus} onChange={handleHealthStatusChange}>
                    <option value="">Chọn</option>
                    <option value="Có">Có</option>
                    <option value="Không">Không</option>
                </select>
            </div>
            <button type="submit">Xác nhận</button>
        </form>
    )
}

export default GetInfo
