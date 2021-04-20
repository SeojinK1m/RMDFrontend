import style from './navbar.module.css'

function Navbar () {
    return (
        <div>
            <a href="/">
                <h2 className={style.Navbar}>
                    RMD
                </h2>
            </a>
        </div>
    )
}

export default Navbar