import styles from "./Register.module.scss"
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faHeartCircleCheck, faUserGroup, faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import routesConfig from "~/config/routes"
import { toast } from 'react-toastify'
import { useState } from "react"
import * as user from "~/api/user"

const cx = classNames.bind(styles)

function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userType, setUserType] = useState('Customer')
    const handleRegister = () => {
        if (!username || !password || !confirmPassword) {
            toast.error('Nhập thiếu thông tin!')
            return
        }
        if (password !== confirmPassword) {
            toast.error('Nhập sai mật khẩu!')
            return
        }
        const role = userType === 'Counselor' ? 1 : 0
        const registrationSuccess = user.register(username, password, role)
        if (registrationSuccess) {
            toast.success('Đăng ký thành công!')
            navigate('/')
        } else toast.error('Đăng ký không thành công. Tài khoản có thể đã tồn tại.')
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-side')}>
                <div className={cx('banner-container')}>
                    <div className={cx('banner-title')}>
                        Depression Testing
                    </div>
                    <div className={cx('banner-func-wrapper')}>
                        <div className={cx('banner-func-text')}>
                            Đây một trang web được tạo ra với những công cụ đánh giá mức độ trầm cảm, từ đó đưa ra phản hồi và đề xuất các giải pháp nhằm cải thiện tình trạng của người dùng.
                        </div>
                        <FontAwesomeIcon icon={faFileCircleQuestion} className={cx('banner-icon')} />
                    </div>
                    <div className={cx('banner-func-wrapper')}>
                        <FontAwesomeIcon icon={faUserGroup} className={cx('banner-icon')} />
                        <div className={cx('banner-func-text')}>
                            Đồng thời, cũng là nơi kết nối giữa người bệnh với các chuyên gia tâm lí, những người đã từng mắc trầm cảm với mục tiêu tạo nên một không gian để người dùng có thể trò chuyện, giải bày, và đồng hành cùng nhau trên con đường chữa lành tâm hồn.
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('right-side')}>
                <div className={cx('login-container')}>
                    <div className={cx('logo')}>
                        <FontAwesomeIcon icon={faHeartCircleCheck} className={cx('heart-icon')} />
                        <div className={cx('logo-name')}>Depression<br />Testing</div>
                    </div>
                    <div className={cx('login-title')}>
                        Đăng ký
                    </div>
                    <div className={cx('login-form')}>
                        <div className={cx('input-form')}>
                            <div className={cx('input-title')}>Tên đăng nhập</div>
                            <input
                                className={cx('input')} placeholder="Tên đăng nhập..."
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className={cx('input-form')}>
                            <div className={cx('input-title')}>Mật khẩu</div>
                            <input
                                type="password" className={cx('input')}
                                placeholder="Mật khẩu..."
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('input-form')}>
                            <div className={cx('input-title')}>Xác nhận mật khẩu</div>
                            <input
                                type="password" className={cx('input')}
                                placeholder="Xác nhận mật khẩu..."
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('input-form')}>
                            <div className={cx('input-title')}>Loại tài khoản</div>
                            <select
                                className={cx('input')}
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="Customer">Khách hàng</option>
                                <option value="Counselor">Tư vấn viên</option>
                            </select>
                        </div>
                        <button className={cx('button')} onClick={handleRegister}>Đăng ký</button>
                    </div>
                    <div className={cx('register')}>
                        <Link className={cx('link')} to={routesConfig.login}>
                            Đã có tài khoản? Đăng nhập
                        </Link>
                        <FontAwesomeIcon icon={faArrowRight} className={cx('register-icon')} />
                    </div>
                    <div className={cx('copyright')}>
                        &#169; 2024 NVK TTHL
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register