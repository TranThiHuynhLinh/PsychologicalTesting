import classNames from "classnames/bind"
import styles from "./Measure.module.scss"
import * as question from "~/api/question"
import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import routesConfig from "~/config/routes"
const cx = classNames.bind(styles)

function Measure() {
    const navigate = useNavigate()
    const questions = question.getAllQuestion()
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
            localStorage.setItem("totalScore", totalScore)
            navigate(routesConfig.result)
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
            <button className={cx('button')} onClick={calculateTotalScore}>Hoàn thành</button>
        </div>
    )
}

export default Measure