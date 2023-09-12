import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter,faInstagram,faLinkedin,faFacebook } from '@fortawesome/free-brands-svg-icons';
import useWindowSize from "@rooks/use-window-size";
import ParticleImage, { Vector,forces } from "react-particle-image";

function Homepage() {

    const links = {
        linkedin : 'https://www.linkedin.com/in/siddharth6758kundu/',
        twitter : 'https://www.twitter.com/',
        instagram : 'https://www.instagram.com/',
        facebook : 'https://www.facebook.com/'
    }

    const particleOptions = {
        filter: ({ x, y, image }) => {
          const pixel = image.get(x, y);
          return pixel.b > 50;
        },
        color: ({ x, y, image }) => "#fa1919",
        radius: () => 0.88,
        mass: () => 40,
        friction: () => 0.15,
        initialPosition: ({ canvasDimensions }) => {
            return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
        }
      };

      const motionForce = (x, y) => {
        return forces.disturbance(x, y, 20);
      };

      const { innerWidth, innerHeight } = useWindowSize();



    return (
        <div className="body">
            <div id='homepage'>
                <div id="navbar-home">
                    <div id="logo">
                        <h2>Ani<span style={{color:"#fa1919"}}>me</span>Reco</h2>
                    </div>
                    <div id="nav-items">
                        <div className="nav-item">
                            <a href="#about">About</a>
                        </div>
                        <div className="nav-item">
                            <a href="#contact">Contact</a>
                        </div>
                    </div>
                </div>
                {/* <img id="image" src={require('../public/image.jpg')} alt='title' /> */}
                <div id='particles'>
                    <ParticleImage
                        src={require('../public/image.png')}
                        width={Number(innerWidth)}
                        height={Number(innerHeight-100)}
                        scale={2.3}
                        entropy={0}
                        maxParticles={200000}
                        particleOptions={particleOptions}
                        mouseMoveForce={motionForce}
                        touchMoveForce={motionForce}
                        backgroundColor="#191919"
                        />
                </div>
                <div id="title-home">
                    Anime Recommendation System
                </div>
                <div id="select">
                    <div className="select-item">
                        <a href='/namesearch'>Search Animes</a>
                        <br /><br />
                        <p>&rarr;&nbsp; Input Anime name:<br />
                            i.e. Naruto,One piece etc.<br /><br />
                            System will provide you with similar anime.<br /></p>
                    </div>
                    <div className="select-item">
                        <a href='/usersearch'>Custom Selection</a>
                        <br /><br />
                        <p>&rarr;&nbsp; Choose your genre(s):<br />
                            i.e. Adventure,Action etc.<br /><br />
                            &rarr;&nbsp; Select anime type:<br />
                            Movie,TV,OVA etc.<br /><br />
                            &rarr;&nbsp; Provide other details as per user satisfaction.</p>
                    </div>
                </div>
            </div>
            <div id="about">
                <h2>About</h2><br />
                <p>The Animation Recommendation System is an advanced technological <img src={require('../public/mcimages.jpg')} width="350" height="400" alt="deco1" style={{float:"right"}} /> solution designed to cater to the diverse preferences and interests of animation enthusiasts. Powered by cutting-edge algorithms and machine learning techniques, this system analyzes user preferences, viewing history, and other relevant data to generate personalized recommendations for animated content. <br /><br /> Whether you are a casual viewer or a die-hard fan of animation, this recommendation system aims to enhance your entertainment experience by suggesting the most engaging and captivating animated shows, movies, and series tailored to your unique tastes.<br /><br /> The recommendation engine is continuously learning and evolving, utilizing state-of-the-art machine learning
                models to improve its understanding of individual preferences. By leveraging the power of artificial intelligence, it adapts to user feedback, adjusts recommendations based on viewing habits, and ensures that the suggested content aligns with your evolving interests. The user interface of the Animation Recommendation System is designed to be intuitive and user-friendly. It provides easy<img src={require('../public/goku.jpg')} width="350" height="400" style={{float:"left"}} alt='deco2'/> navigation through different genres and categories, allowing you to explore a wide range of options effortlessly.<br /><br /> In a world filled with countless animated offerings, the Animation Recommendation System aims to be your trusted companion, guiding you towards the animated content that best matches your preferences. Whether you're discovering new gems or rediscovering beloved classNameics, this system strives to enhance your animation viewing journey, making it a seamless and delightful experience from start to finish.</p>
            </div>
            <div id="contact">
                <br/><h2>Contact</h2><br/>
                <div id="contact-ids">
                    <button className='contact_btn' onClick={()=> {window.location.href = links.twitter}}><FontAwesomeIcon icon={faTwitter} /></button>
                    <button className='contact_btn' onClick={()=> {window.location.href = links.linkedin}}><FontAwesomeIcon icon={faLinkedin} /></button>
                    <button className='mail_btn'><a href="mailto: sidd6758harth@gmail.com">Siddharth Kundu</a></button>
                    <button className='contact_btn' onClick={()=> {window.location.href = links.instagram}}><FontAwesomeIcon icon={faInstagram} /></button>
                    <button className='contact_btn' onClick={()=> {window.location.href = links.facebook}}><FontAwesomeIcon icon={faFacebook} /></button>
                </div>
                <hr/><br/>
                <span style={{fontSize:"14px"}}>Copyrights Reserved 2023</span>
            </div>
        </div>
    );
}

export default Homepage;
