import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './DefaultLayout.module.scss'
import classNames from 'classnames/bind'
import { faBars, faCircleInfo, faFileLines, faNewspaper, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import routesConfig from '~/config/routes'
import { useState, useEffect } from 'react'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isShowButton, setIsShowButton] = useState(true)
    const location = useLocation()

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
    }
    useEffect(() => {
        if (location.pathname === routesConfig.login || location.pathname === routesConfig.register) {
            setIsShowButton(false)
        }
        else {
            setIsShowButton(true)
        }
    }, [location.pathname])
    return (
        <div className={cx('wrapper')}>
            {children}
            <div className={cx('navigate', { show: isShowButton })}>
                <div className={cx('button')} onClick={toggleModal}>
                    <FontAwesomeIcon icon={faBars} className={cx('icon')} />
                </div>
                <div className={cx('modal', { show: isModalVisible })}>
                    <Link to={routesConfig.login} className={cx('item')}>
                        <FontAwesomeIcon icon={faRightToBracket} className={cx('icon')} />
                        Đăng nhập
                    </Link>
                    <Link to={routesConfig.getInfo} className={cx('item')}>
                        <FontAwesomeIcon icon={faCircleInfo} className={cx('icon')} />
                        Điền thông tin cá nhân
                    </Link>
                    <Link to={routesConfig.measure} className={cx('item')}>
                        <FontAwesomeIcon icon={faFileLines} className={cx('icon')} />
                        Thang đo
                    </Link>
                    <Link to={routesConfig.result} className={cx('item')}>
                        <FontAwesomeIcon icon={faNewspaper} className={cx('icon')} />
                        Thông tin hỗ trợ
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout