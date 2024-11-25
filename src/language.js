import { createI18n } from "vue-i18n";
const messages = {
  tr: {
    login: {
      // Login sayfası için
      title: "Sipariş Keyfi Panel Yönetim Sistemi’ne Hoş Geldiniz",
      loginAccount: "Hesabınıza giriş yapın",
      email: "Email",
      password: "Şifre",
      rememberMe: "Beni hatırla",
      forgotMyPassword: "Şifremi unuttum",
      login: "Giriş",
      sendPassword: "Şifre Gönder",
      emailAddress: "E-posta Adresi",
      close: "Kapat",
      send: "Gönder",
    },
  },
  us: {
    login: {
      // Login sayfası için
      title: "Welcome to the Sipariş Keyfi Panel Management System",
      loginAccount: "Login to your account",
      email: "Email",
      password: "Password",
      rememberMe: "Remember me",
      forgotMyPassword: "Forgot my password",
      login: "Login",
      sendPassword: "Send Password",
      emailAddress: "Email Address",
      close: "Close",
      send: "Send",
    },
  },
};

export const i18n = createI18n({
  locale: "tr",
  fallbackLocale: "en",
  messages,
});
