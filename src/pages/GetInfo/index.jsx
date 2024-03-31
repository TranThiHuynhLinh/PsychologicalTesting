import React, { useState, useEffect } from 'react'
import * as user from "~/api/user"
import * as data from "~/api/data"
import classNames from 'classnames/bind'
import styles from './GetInfo.module.scss'
const cx = classNames.bind(styles)

function GetInfo() {
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [yearOfStudy, setYearOfStudy] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')
    const [familyEconomicStatus, setFamilyEconomicStatus] = useState('')
    const [livingArrangements, setLivingArrangements] = useState('')
    const [healthStatus, setHealthStatus] = useState('')
    const [progressLevel, setProgressLevel] = useState(0)

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
            const fields = [
                userData.age,
                userData.sex,
                userData.std_year,
                userData.family_status,
                userData.family_eco,
                userData.address,
                userData.is_chronic ? "Có" : "Không"
            ]
            const filledFieldsCount = fields.reduce((acc, field) => acc + (field ? 1 : 0), 0)
            setProgressLevel(filledFieldsCount)
            setAge(userData.age)
            setGender(userData.sex)
            setYearOfStudy(userData.std_year)
            setMaritalStatus(userData.family_status)
            setFamilyEconomicStatus(userData.family_eco)
            setLivingArrangements(userData.address)
            setHealthStatus(userData.is_chronic === true ? "Có" : "Không")
        }
    }, [])

    useEffect(() => {
        const fields = [age, gender, yearOfStudy, maritalStatus, familyEconomicStatus, livingArrangements, healthStatus]
        const filledFieldsCount = fields.reduce((acc, field) => acc + (field ? 1 : 0), 0)
        setProgressLevel(filledFieldsCount)
    }, [age, gender, yearOfStudy, maritalStatus, familyEconomicStatus, livingArrangements, healthStatus])

    const renderProgressLevelBar = (level) => {
        return (
            <div className={cx('progress-bar')}>
                {[...Array(7)].map((_, index) => (
                    <div key={index} className={cx('progress-bar-segment', { filled: index < level })}></div>
                ))}
            </div>
        )
    }


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
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className={cx('input-form')}>
                        <div className={cx('input-title')}>Tuổi</div>
                        <input
                            className={cx('input')}
                            type="number" min={0} max={150}
                            value={age} onChange={handleAgeChange}
                        />
                    </div>
                    <div className={cx('input-form')}>
                        <div className={cx('input-title')}>Giới tính:</div>
                        <select id="gender" value={gender} onChange={handleGenderChange}>
                            <option value="">Chọn</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Nam">Nam</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className={cx('input-form')}>
                        <div className={cx('input-title')}>Sinh viên năm thứ mấy?</div>
                        <select id="yearOfStudy" value={yearOfStudy} onChange={handleYearOfStudyChange}>
                            <option value="">Chọn</option>
                            <option value="Năm 1">Năm 1</option>
                            <option value="Năm 2">Năm 2</option>
                            <option value="Năm 3">Năm 3</option>
                            <option value="Năm 4">Năm 4</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    <div className={cx('input-form')}>
                        <div className={cx('input-title')}>Tình trạng gia đình (bố mẹ)</div>
                        <select id="maritalStatus" value={maritalStatus} onChange={handleMaritalStatusChange}>
                            <option value="">Chọn</option>
                            <option value="Sống chung">Sống chung</option>
                            <option value="Ly thân / ly hôn">Ly thân / ly hôn</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className={cx('input-form')}>
                        <div className={cx('input-title')}>Kinh tế gia đình</div>
                        <select id="familyEconomicStatus" value={familyEconomicStatus} onChange={handleFamilyEconomicStatusChange}>
                            <option value="">Chọn</option>
                            <option value="Nghèo/ cận nghèo">Nghèo/ cận nghèo</option>
                            <option value="Bình thường">Bình thường</option>
                            <option value="Khá giả">Khá giả</option>
                        </select>
                    </div>
                    <div className={cx('input-form')}>
                        <div className={cx('input-title')}>Nơi sinh sống hiện tại</div>
                        <select id="livingArrangements" value={livingArrangements} onChange={handleLivingArrangementsChange}>
                            <option value="">Chọn</option>
                            <option value="Sống chung với bố mẹ">Sống chung với bố mẹ</option>
                            <option value="Sống ở nhà riêng">Sống ở nhà riêng</option>
                            <option value="Phòng trọ">Phòng trọ</option>
                            <option value="Ở nhà người quen, họ hàng">Ở nhà người quen, họ hàng</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className={cx('input-form')}>
                        <div className={cx('input-title')}>Có bệnh mãn tính không?</div>
                        <select id="healthStatus" value={healthStatus} onChange={handleHealthStatusChange}>
                            <option value="">Chọn</option>
                            <option value="Có">Có</option>
                            <option value="Không">Không</option>
                        </select>
                    </div>
                    <div></div>
                </div>
            </form>
            {renderProgressLevelBar(progressLevel)}
            <button type="submit" className={cx('button')}>Xác nhận</button>
        </div>
    )
}

export default GetInfo
