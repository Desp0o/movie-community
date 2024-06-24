import ButtonFIlled from "../components/buttonFIlled/ButtonFilled"
import PageLayout from "../components/pageLayout/PageLayout"
import page404 from "../assets/page404.gif"
import Footer from "../components/footer/Footer"
import "./styles404.css"

const PageNotFound = () => {
  return (
    <PageLayout>
        <div className="page_not_found">
            <div className="page_not_found_texts">
            <p className="page_not_found_txt1">404</p>
            <p className="page_not_found_txt2">Page not found!</p>
            </div>

            <img src={page404} alt="page not found" className="no_page_img"/>

            <ButtonFIlled text="Back to home" link="/" />
        </div>
        <Footer />
    </PageLayout>
  )
}

export default PageNotFound