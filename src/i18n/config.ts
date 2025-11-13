import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uz: {
    translation: {
      nav: {
        home: "Bosh sahifa",
        about: "Biz haqimizda",
        products: "Mahsulotlar",
        videoGallery: "Video Gallery",
        imageGallery: "Rasm Gallery",
        certificates: "Sertifikatlar",
        faq: "Savol-Javob",
        contact: "Aloqa",
      },
      home: {
        hero: {
          title: "Qo'l mehnati san'ati",
          subtitle: "Mahsulotlarning sifati ularning arzonligi bilan afzalliklarga ega.",
          cta: "Mahsulotlarni ko'rish",
        },
        featured: "Tanlangan mahsulotlar",
        viewAll: "Barchasini ko'rish",
      },
      product: {
        addToCart: "Savatga qo'shish",
        inCart: "Savatda",
        price: "Narxi",
        oldPrice: "Eski narx",
        new: "Yangi",
        outOfStock: "Tugagan",
      },
      cart: {
        title: "Savat",
        empty: "Savatingiz bo'sh",
        total: "Jami",
        checkout: "Xarid qilish",
        continueShopping: "Xaridni davom ettirish",
      },
      footer: {
        craftedBy: "Ishlab chiqargan",
        rights: "Barcha huquqlar himoyalangan",
      },
    },
  },
  ru: {
    translation: {
      nav: {
        home: "Главная",
        about: "О нас",
        products: "Продукты",
        videoGallery: "Видео Галерея",
        imageGallery: "Фото Галерея",
        certificates: "Сертификаты",
        faq: "Вопросы",
        contact: "Контакты",
      },
      home: {
        hero: {
          title: "Искусство ручной работы",
          subtitle: "Качество продукции выгодно сочетается с ее низкой ценой.",
          cta: "Смотреть продукты",
        },
        featured: "Избранные товары",
        viewAll: "Смотреть все",
      },
      product: {
        addToCart: "В корзину",
        inCart: "В корзине",
        price: "Цена",
        oldPrice: "Старая цена",
        new: "Новинка",
        outOfStock: "Нет в наличии",
      },
      cart: {
        title: "Корзина",
        empty: "Корзина пуста",
        total: "Итого",
        checkout: "Оформить",
        continueShopping: "Продолжить покупки",
      },
      footer: {
        craftedBy: "Создано",
        rights: "Все права защищены",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        products: "Products",
        videoGallery: "Video Gallery",
        imageGallery: "Image Gallery",
        certificates: "Certificates",
        faq: "FAQ",
        contact: "Contact",
      },
      home: {
        hero: {
          title: "Artisan Craftsmanship",
          subtitle: "Each piece is a unique creation made with love and mastery",
          cta: "View Products",
        },
        featured: "Featured Products",
        viewAll: "View All",
      },
      product: {
        addToCart: "Add to Cart",
        inCart: "In Cart",
        price: "Price",
        oldPrice: "Old Price",
        new: "New",
        outOfStock: "Out of Stock",
      },
      cart: {
        title: "Cart",
        empty: "Your cart is empty",
        total: "Total",
        checkout: "Checkout",
        continueShopping: "Continue Shopping",
      },
      footer: {
        craftedBy: "Crafted by",
        rights: "All rights reserved",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'uz',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
