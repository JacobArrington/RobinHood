import './about.css'


const About = () => {
    return (
        <div className='about'>
            <h2>Created by Marlon Santos, Kelly Kong, Jacob Arrington</h2>
            <h3>For more great projects follow us on</h3>

            <div className="profile">
                <h4>Marlon Santon</h4>
                <ul className='Social'>
                    <li>
                        <a href="https://www.linkedin.com/in/marlon-santos-b1b07ab3/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://wellfound.com/u/marlon-santos-3" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-angellist"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/Marl-Sant" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="profile">
                <h4>Kelly Kong</h4>
                <ul className='Social'>
                    <li>
                        <a href="https://www.linkedin.com/in/kelly-kong-033333186/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://wellfound.com/u/kelly-kong-1" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-angellist"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/kkong88" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="profile">
                <h4>Jacob Arrington</h4>
                <ul className='Social'>
                    <li>
                        <a href="https://www.linkedin.com/in/jacob-arrington-190885278/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://wellfound.com/u/jacob-arrington-1" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-angellist"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/JacobArrington" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default About;
