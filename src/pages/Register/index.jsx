import styles from "./Register.module.scss"
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faHeartCircleCheck, faUserGroup, faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import routesConfig from "~/config/routes"
import { toast } from 'react-toastify'
import { useState } from "react"

const cx = classNames.bind(styles)

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const handleRegister = () => {
        if (username.length === 0 | password.length === 0 | confirmPassword.length === 0) {
            toast('Nhập thiếu thông tin!')
            return
        }
        if (password !== confirmPassword) {
            toast('Nhập sai mật khẩu!')
        }
        else if (password === confirmPassword) {
            toast('Đăng ký thành công!')
        }
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
                    <div className={cx('login-quote')}>
                        Chào cậu! Tớ luôn ở đây để lắng nghe và đồng hành cùng cậu. Hãy cho tớ biết những vấn đề của cậu nhé.
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