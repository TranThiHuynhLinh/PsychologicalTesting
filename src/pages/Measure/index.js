import classNames from "classnames/bind"
import styles from "./Measure.module.scss"
const cx = classNames.bind(styles)

function Measure() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>

            </div>
            <div className={cx('table')}>
                <div className={cx('table-header')}>
                    <div className={cx('header-title')}>Bạn gặp mỗi triệu chứng sau đây thường xuyên như thế nào trong 2 tuần vừa qua?</div>
                    <div className={cx('header-ans')}>
                        <div className={cx('item', 'zero')}>Hầu như không</div>
                        <div className={cx('item', 'sometimes')}>Một vài ngày</div>
                        <div className={cx('item', 'haft')}>Hơn một nửa số ngày</div>
                        <div className={cx('item', 'everyday')}>Gần như mỗi ngày</div>
                    </div>
                </div>
                <div className={cx('table-body')}>
                    <div className={cx('row')}>
                        <div className={cx('row-title')}>Ít quan tâm hoặc ít muốn làm các việc?</div>
                        <div className={cx('choose')}>
                            <div className={cx('button', 'zero')}>button</div>
                            <div className={cx('button', 'sometimes')}>button</div>
                            <div className={cx('button', 'haft')}>button</div>
                            <div className={cx('button', 'everyday')}>button</div>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('row-title')}>Ít quan tâm hoặc ít muốn làm các việc?</div>
                        <div className={cx('choose')}>
                            <div className={cx('button', 'zero')}>button</div>
                            <div className={cx('button', 'sometimes')}>button</div>
                            <div className={cx('button', 'haft')}>button</div>
                            <div className={cx('button', 'everyday')}>button</div>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('row-title')}>Ít quan tâm hoặc ít muốn làm các việc?</div>
                        <div className={cx('choose')}>
                            <div className={cx('button', 'zero')}>button</div>
                            <div className={cx('button', 'sometimes')}>button</div>
                            <div className={cx('button', 'haft')}>button</div>
                            <div className={cx('button', 'everyday')}>button</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Measure