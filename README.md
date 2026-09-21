# ServisPort 🏛️
> **Kamu Hizmet Masası & Randevu Portalı • GovTech E-Devlet & Redis Dağıtık Kilit Mimarisi**

[![Canlı Demo](https://img.shields.io/badge/Canl%C4%B1_Demo-servisport.web.app-0f766e?style=for-the-badge&logo=google-chrome&logoColor=white)](https://servisport.web.app)
[![Lisans](https://img.shields.io/badge/Lisans-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Teknoloji](https://img.shields.io/badge/Teknoloji-Vanilla_ES6%2B_No_Framework-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org)
[![Arayüz](https://img.shields.io/badge/Tasar%C4%B1m-Civic_Desk_GovTech-042f2e?style=for-the-badge&logo=css3)](https://developer.mozilla.org)
[![Dil](https://img.shields.io/badge/Dil-T%C3%BCrk%C3%A7e_%7C_English-green?style=for-the-badge)](https://servisport.web.app)

---

## 📸 Canlı Önizleme (Previews)

### 1. Dijital Kamu Masası & 4 Adımlı Randevu Portalı
Üstte duyuru bandı (`.civic-bulletin-bar`) ve hero arama alanı (`.civic-hero`), 4 ana kamu hizmet kartı, Redis kilit havuzlu randevu sihirbazı, canlı başvuru takip tablosu ve **Başvuruyu İptal Et / Sil** aksiyonu:
![ServisPort Kamu Masası Önizleme](docs/preview-dashboard.png)

### 2. Resmi E-Belediye Kamu Masası Giriş Portalı
T.C. Akıllı Belediyecilik bilgi sistemi başlık bandı, 256-Bit SSL ve KVKK güvenlik mührü, T.C. Kimlik / e-Devlet giriş alanları ve hazır roller:
![ServisPort Login Önizleme](docs/preview-login.png)

---

## 🌟 Öne Çıkan Özellikler

### 1. Sektöre Özgü GovTech Kamu Masası Mimarisi
- **Civic Desk Kurumsal Mimarisi**:
  - Üstte canlı duyuru akışı (`2026/Q3 İmar, Nüfus ve Sosyal Yardım başvuruları kabul edilmektedir`).
  - 4 büyük hizmet kategorisi (*Nüfus & Kimlik*, *İmar & Yapı Ruhsatı*, *İşyeri Ruhsat & Denetim*, *Sosyal Destek & Yardım*).
- **Redis 7.2 Dağıtık Kilit (Distributed Lock) Simülasyonu**:
  - Vatandaş bir saat aralığı seçtiğinde `SETNX` & `EXPIRE` komutlarıyla 10 dakikalık kilit rezerve edilir; çift rezervasyon (race condition) donanım seviyesinde engellenir.
  - Canlı Redis olay akışı ve gecikme (latency) telemetrisi.

### 2. Vatandaş Başvurusunu İptal Etme & Silme Mekanizması
- **Başvuruyu İptal Et / Sil (`promptDeleteApplication`)**: Başvuru takip tablosunda her kaydın yanında kırmızı çöp kutusu butonu yer alır.
- **Onay Modalı (`#deleteAppModal`)**: Başvuru referans koduyla onay penceresi açılır.
- **Redis Kilit Havuzuna İade**: Başvuru silindiğinde rezerve edilen randevu slotu Redis havuzuna anında iade edilir, başvuru sayaçları düşürülür ve `localStorage` (`sp_apps_v2`) senkronize edilir.

### 3. Oturum Kalıcılığı (Session Persistence) & Zero-Flicker Başlangıç
- **Sayfa Yenilemelerinde Oturumu Hatırla**: Giriş onaylandığında `localStorage.setItem('sp_logged_in', 'true')` kaydı işlenir.
- **Sıfır Titreme (Zero-Flicker)**: Sayfa yenilendiğinde (F5) inline script kontrolü sayesinde giriş ekranı hiç açılmadan doğrudan kamu masası gelir.
- **Güvenli Çıkış**: Sağ üstteki kırmızı **"Çıkış"** butonuna basıldığında oturum sonlandırılır.
- **Hazır Demo Bilgileri**: Giriş ekranında T.C. kimlik / e-posta ve şifre hazır girili gelir; altındaki hızlı rol butonlarıyla (`Kayıtlı Vatandaş`, `Kurumsal Müşteri / Esnaf`, `Birim Sorumlusu`) anında rol değiştirilebilir.

### 4. Çift Dilli Tam Destek (TR | EN)
- Sağ üstteki `[ TR | EN ]` dil seçici ile tüm kamu hizmet adları, randevu adımları, form etiketleri ve belediye duyuruları dinamik olarak çevrilir.
- Başlangıç varsayılan dili **Türkçe**'dir.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Katman | Teknoloji | Görevi |
| :--- | :--- | :--- |
| **Arayüz (UI)** | HTML5, CSS3 GovTech Turkuazı | E-Devlet ve akıllı belediyecilik görsel dili, 4 adımlı form |
| **İş Mantığı** | Vanilla JavaScript (ES6+) | Dağıtık kilit havuzu mantığı, başvuru takip algoritması |
| **İkonlar** | Bootstrap Icons v1.11.3 | Kamu, kimlik ve güvenlik simgeleri |
| **Depolama** | HTML5 `localStorage` | Başvuru kayıtları, oturum durumu ve dil ayarları |
| **Yayın** | Firebase Hosting | Yüksek erişilebilirlikli HTTPS kamu barındırması |

---

## 📁 Proje Dizin Yapısı

```
ServisPort/
├── index.html              # Kamu masası ve e-belediye giriş portalı
├── docs/                   # Dokümantasyon ve ekran görüntüleri
│   ├── preview-dashboard.png # Kamu hizmet masası yüksek çözünürlüklü önizleme
│   └── preview-login.png     # Resmi kamu giriş ekranı önizleme
└── README.md               # Proje dokümantasyonu
```

---

## ⚡ Hızlı Başlangıç (Local Setup)

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/kubrvk/ServisPort.git
   cd ServisPort
   ```
2. `index.html` dosyasını tarayıcınızda açın:
   ```bash
   start index.html
   ```
3. Alternatif yerel HTTP sunucusu ile çalıştırmak için:
   ```bash
   npx serve .
   ```
4. Tarayıcınızda açılan adrese gidin.
   - *Giriş ekranını atlayıp doğrudan kamu masasını açmak için:* `http://localhost:3000/?demo=1`

---

## 🌐 Canlı Sistem

- **Canlı URL**: [https://servisport.web.app](https://servisport.web.app)
- **Doğrudan Demo Bağlantısı**: [https://servisport.web.app/?demo=1](https://servisport.web.app/?demo=1)

---

## 👤 Geliştirici

**Developed by Beraat Yetkin**
- GitHub: [@kubrvk](https://github.com/kubrvk)
- Proje Deposu: [ServisPort](https://github.com/kubrvk/ServisPort)
- Portfolyo: [Beraat Yetkin Portfolio](https://github.com/kubrvk/portfolio)
