import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from '../components/assets/img/icon/logo.jpg'
import tg from '../components/assets/img/icon/telegram.gif'
import ins from '../components/assets/img/icon/instagram.gif'
import '../components/assets/css/media.css'

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <a href="/"><img src={logo} alt="" className="text-2xl font-serif font-bold text-gradient" width={60} style={{ borderRadius: '50%' }} /></a>
            <br />
            <p className="text-muted-foreground text-sm">
              {t("home.hero.subtitle")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("nav.products")}</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.products")}
              </Link>
              <Link to="/video-gallery" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.videoGallery")}
              </Link>
              <Link to="/image-gallery" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.imageGallery")}
              </Link>
              <Link to="/certificates" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.certificates")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("nav.contact")}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Telegram: <a href="https://t.me/Mebelshitsa">MAFTUN-MEBEL</a></p>
              <a href="tel:+998946776780"><p>Tel: +998 94 677 67 80</p></a>
              <div className="gffg">
                <a href="https://t.me/Mebelshitsa"><img src={tg} alt="" width={30} /></a>
                <a href="https://www.instagram.com/ashirmatabdukodirov?utm_source=qr&igsh=N2JodndrMmpoMWd3"><img src={ins} alt="" width={30} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MAFTUN MEBEL. {t("footer.rights")}
          </p>

          {/* Parvoz Company Branding */}
          <a
            href="https://parvoz-company.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <span>{t("footer.craftedBy")}</span>
            <span className="font-semibold text-primary group-hover:text-primary-glow transition-colors">
              Parvoz Company
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
