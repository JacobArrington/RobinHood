import './about.css'

const About = () => {
    return (
        <div className='about'>
            <h2>Developed by Marlon Santos, Kelly Kong, Jacob Arrington</h2>
            <h3>For more great projects, follow us on</h3>

            <div className="profiles-grid">
                {[
                    { name: "Marlon Santos", linkedin: "https://www.linkedin.com/in/marlon-santos-b1b07ab3/", angellist: "https://wellfound.com/u/marlon-santos-3", github: "https://github.com/Marl-Sant" },
                    { name: "Kelly Kong", linkedin: "https://www.linkedin.com/in/kelly-kong-033333186/", angellist: "https://wellfound.com/u/kelly-kong-1", github: "https://github.com/kkong88" },
                    { name: "Jacob Arrington", linkedin: "https://www.linkedin.com/in/jacob-arrington-190885278/", angellist: "https://wellfound.com/u/jacob-arrington-1", github: "https://github.com/JacobArrington" }
                ].map(profile => (
                    <div className="profile">
                        <h4>{profile.name}</h4>
                        <ul className='social'>
                            <li>
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </li>
                            <li>
                                <a href={profile.angellist} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-angellist"></i>
                                </a>
                            </li>
                            <li>
                                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-github"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default About;

