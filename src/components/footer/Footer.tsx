import { Link } from "react-router-dom"
import { facebookIcon, instagramIcon } from "../../assets/newSvg/socialIcons"
import "./footer.css"

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer_inner">
        {/* left side */}
        <div className="footer_l">
          <p className="Get_In_Touch">Get In Touch</p>
          <p className="footer_p2">Contact us for any inquiries or collaborations regarding our movie community.</p>

          <div className="social_icons_footer">
            <a href="/" target="blank" rel="noopener noreferrer" aria-label="visit webpages facebook">{facebookIcon}</a>
            <a href="/" target="blank" rel="noopener noreferrer" aria-label="visit webpages instagram">{instagramIcon}</a>
          </div>
        </div>

        {/* right side */}
        <div className="footer_r">

          {/* feature block */}
          <div className="features_block">
            <p className="features_block_title">FEATURES</p>

            {/* features */}
            <div className="footer_r_features">
              <Link to="" className="footer_r_item">Latest Polls</Link>
              <Link to="" className="footer_r_item">Movie Filters</Link>
              <Link to="" className="footer_r_item">Post Reviews</Link>
              <Link to="" className="footer_r_item">Latest News</Link>
              <Link to="" className="footer_r_item">Fun Quizzes</Link>
              <Link to="" className="footer_r_item">Community</Link>
            </div>
          </div>

          {/* contact */}
          <div className="contact_block">
              <p className="features_block_title">Contact</p>
              <div className="contact_block_items">
                <Link to="" className="footer_r_item">About  us</Link>
                <Link to="" className="footer_r_item">Email</Link>
                <Link to="" className="footer_r_item">Support</Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer