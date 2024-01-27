import '@fortawesome/fontawesome-free/css/all.css';

export default function SocialMedia() {
    return (
        <div className="social-media-icons flex justify-center mt-20">
            <a href="http://wwww.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook px-28 text-3xl hover:text-hover-blue"></i>
            </a>
            <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-square-x-twitter px-28 text-3xl hover:text-hover-blue"></i>
            </a>
            <a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram px-28 text-3xl hover:text-hover-blue"></i>
            </a>
        </div>
    );
}