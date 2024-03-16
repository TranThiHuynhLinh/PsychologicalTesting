import styles from "./Login.module.scss"
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Login() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Login</h1>
        </div>
    )
}

export default Login