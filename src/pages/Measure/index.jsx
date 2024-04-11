import classNames from "classnames/bind"
import styles from "./Measure.module.scss"
import * as questionApi from "~/api/question"
import question from "~/database/question"
import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import routesConfig from "~/config/routes"
import { Link } from "react-router-dom"
const cx = classNames.bind(styles)

function Measure() {
    const navigate = useNavigate()
    const questions = questionApi.getAllQuestion()
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState('')
    const [scores, setScores] = useState(Array(questions.length).fill(null))

    const handleScoreChange = (index, score) => {
        const newScores = [...scores]
        newScores[index] = Number(score)
        setScores(newScores)
    }

    const calculateTotalScore = () => {
        const isAllAnswered = scores.every(score => score !== null)
        if (!isAllAnswered) {
            toast.error("Vui lòng trả lời tất cả các câu hỏi trước khi hoàn thành.")
        } else {
            const totalScore = scores.reduce((acc, current) => acc + current, 0)
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
            setModalContent(content)
            setShowModal(true)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                THANG ĐO TRẦM CẢM MODIFIED FOR TEENS (PHQ-9)
            </div>
            <div className={cx('table')}>
                <div className={cx('table-header')}>
                    <div className={cx('header-title')}>Bạn gặp mỗi triệu chứng sau đây thường xuyên như thế nào trong 2 tuần vừa qua?</div>
                    <div className={cx('header-ans')}>
                        <div className={cx('item', 'zero')}>Hầu như không (0)</div>
                        <div className={cx('item', 'sometimes')}>Một vài ngày (1)</div>
                        <div className={cx('item', 'haft')}>Hơn một nửa số ngày (2)</div>
                        <div className={cx('item', 'everyday')}>Gần như mỗi ngày (3)</div>
                    </div>
                </div>
                <div className={cx('table-body')}>
                    {questions.map((item, index) => {
                        return (
                            <div className={cx('row')} key={index}>
                                <div className={cx('row-title')}>{item.content}</div>
                                <div className={cx('choose')}>
                                    {[...Array(4)].map((_, score) => (
                                        <div key={score}>
                                            <input
                                                type="radio"
                                                name={`ques${index}`}
                                                id={`ques${index}-${score}`}
                                                value={score}
                                                onChange={() => handleScoreChange(index, score)}
                                            />
                                            <label htmlFor={`ques${index}-${score}`}></label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <button className={cx('button')} onClick={calculateTotalScore}>Xem kết quả</button>
            {showModal && (
                <div className={cx('modal')}>
                    <div className={cx('modal-content')}>
                        <button className={cx('modal-button')} onClick={() => setShowModal(false)}>X</button>
                        <div className={cx('content')}>
                            {modalContent}
                        </div>
                        <Link className={cx('link')} to={routesConfig.result}>
                            Chuyển đến Trung tâm hỗ trợ
                        </Link>
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default Measure