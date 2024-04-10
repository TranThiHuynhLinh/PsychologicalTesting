import styles from './Result.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import question from '~/database/question'
import { toast } from 'react-toastify'
import link from '~/database/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function Result() {
    const totalScore = localStorage.getItem("totalScore")
    const result = question['result']
    const scoring = (totalScore) => {
        if (totalScore < 5) {
            return result[0]['content']
        } else if (totalScore < 10) {
            return result[1]['content']
        } else if (totalScore < 15) {
            return result[2]['content']
        } else if (totalScore < 20) {
            return result[3]['content']
        } else {
            return result[4]['content']
        }
    }
    const content = scoring(totalScore)
    useEffect(() => {
        if (!isToastShowing) {
            toast.success(`${content}`, {
                onClose: () => setIsToastShowing(false)
            });
            setIsToastShowing(true)
        }
    }, [])
    const [isToastShowing, setIsToastShowing] = useState(false)
    const toggleResult = () => {
        if (!isToastShowing) {
            toast.success(`${content}`, {
                onClose: () => setIsToastShowing(false)
            });
            setIsToastShowing(true);
        }
    }
    const spanGenerator = (text) => {
        return (
            <div className={cx('flip-animation')}>
                {text.split('').map((char, index) => (
                    <span key={index}>{char}</span>
                ))}
            </div>
        )
    }
    const makeTitle = (text) => {
        return (
            <div className={cx('center-header')}>
                {text.split(' ').map((word, index) => (
                    spanGenerator(word)
                ))}
            </div>
        )
    }
    const renderCenters = () => link.center.map((center, index) => (
        <div key={index} className={cx("center-item", "narrow")}>
            <div className={cx("center-item_link")}>
                <div className={cx("center-item_bg")}></div>
                <div className={cx("center-item_title")}>
                    {center.location}
                </div>
                <div className={cx("center-item_date-box")}>
                    Địa chỉ: &nbsp;
                    <span className={cx("center-item_date")}>
                        {center.address}
                    </span>
                </div>
                <div className={cx("center-item_date-box")}>
                    Hotline: &nbsp;
                    <span className={cx("center-item_date")}>
                        {center.hotline}
                    </span>
                </div>
            </div>
        </div>
    ))
    const renderDoctors = () => link.doctor.map((doctor, index) => (
        <div key={index} className={cx("center-item", 'wide')}>
            <div className={cx("center-item_link")}>
                <div className={cx("center-item_bg")}></div>
                <div className={cx("center-item_title")}>
                    {doctor.name}
                    <FontAwesomeIcon icon={faUserDoctor} className={cx('icon')} />
                </div>
                <div className={cx("center-item_date-box")}>
                    Địa chỉ: &nbsp;
                    <span className={cx("center-item_date")}>
                        {doctor.address}
                    </span>
                </div>
                <div className={cx("center-item_date-box")}>
                    Hotline: &nbsp;
                    <span className={cx("center-item_date")}>
                        {doctor.hotline}
                    </span>
                </div>
            </div>
        </div>
    ))
    return (
        <div className={cx('wrapper')}>
            <div className={cx('center')}>
                {makeTitle('Trung tâm khám và điều trị')}
                <div className={cx("center-box")}>
                    {renderCenters()}
                </div>
            </div>
            <div className={cx('doctor')}>
                {makeTitle('Bác sĩ chuyên gia')}
                <div className={cx('center-box')}>
                    {renderDoctors()}
                </div>
            </div>
            {/* <button onClick={toggleResult} className={cx('button-toggle')}>
                        Xem kết quả
                    </button> */}
        </div>
    )
}

export default Result