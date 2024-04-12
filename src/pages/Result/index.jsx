import styles from './Result.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import link from '~/database/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react'
const cx = classNames.bind(styles)

function Result() {
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
        <div key={index} className={cx("center-item", "wide")}>
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
            <Tippy
                content={
                    <div className={cx('tippy-modal')}>
                        {doctor.info && <div className={cx('info')}>{doctor.info}</div>}
                        {doctor.specialize && <div className={cx('content')}>{doctor.specialize}</div>}
                    </div>
                }
                position="bottom"
                trigger="mouseenter"
                hideOnClick={false}
                animation="fade"
            >
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
            </Tippy>
        </div>
    ))
    const getId = (url) => {
        return url.split('v=')[1]
    }
    const renderOthers = () => link.others.map((other, index) => (
        <div key={index} className={cx('other')}>
            {index % 2 === 0 ? (
                <>
                    <div className={cx('header')}>
                        <div className={cx('name')}>{other.name}</div>
                        <div className={cx('content')}>{other.content}</div>
                    </div>
                    <div className={cx('list-bookmark')}>
                        {other.child.map((item, idx) => (
                            <a href={item.link} key={idx} className={cx('bookmark')} target="_blank" rel="noopener noreferrer">
                                <img className={cx('bg')} src={`https://i.ytimg.com/vi/${getId(item.link)}/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkNQbaNpg1go32OiQHUsGNoA6cVg`} />
                                <div className={cx('name')}>{item.name}</div>
                            </a>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className={cx('list-bookmark')}>
                        {other.child.map((item, idx) => (
                            <a href={item.link} key={idx} className={cx('bookmark')} target="_blank" rel="noopener noreferrer">
                                <img className={cx('bg')} src={`https://i.ytimg.com/vi/${getId(item.link)}/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkNQbaNpg1go32OiQHUsGNoA6cVg`} />
                                <div className={cx('name')}>{item.name}</div>
                            </a>
                        ))}
                    </div>
                    <div className={cx('header')}>
                        <div className={cx('name')}>{other.name}</div>
                        <div className={cx('content')}>{other.content}</div>
                    </div>
                </>
            )}
        </div>
    ))
    const renderBooks = () => link.books.map((book, index) => (
        <div key={index} >
            <Tippy
                content={
                    <div className={cx('tippy-modal')}>
                        <div className={cx('content')}>{book.content}</div>
                    </div>
                }
                placement="right"
                trigger="mouseenter"
                hideOnClick={false}
                animation="fade"
            >
                <div className={cx('bookmark')}>
                    <img className={cx('bg')} src={book.img} />
                    <div className={cx('name')}>{book.name}</div>
                </div>
            </Tippy>
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
            <div className={cx('others')}>
                {makeTitle('Các trang Web/Kênh có thể giúp bạn')}
                <div className={cx('center-box')}>
                    {renderOthers()}
                </div>
            </div>
            <div className={cx('books')}>
                <div className={cx('header')}>Sách</div>
                <div className={cx('center-box')}>
                    {renderBooks()}
                </div>
            </div>
        </div>
    )
}

export default Result