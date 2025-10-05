# Casibom Casino

Türkiye'nin en güvenilir online casino platformu. Modern React ve Express.js teknolojileri ile geliştirilmiştir.

## Özellikler

- 🎰 **16 Farklı Slot Oyunu** - Numara sırasına göre düzenlenmiş oyunlar
- 🔐 **Güvenli Giriş/Kayıt Sistemi** - Kullanıcı kimlik doğrulama
- 💰 **Para Yatırma Sistemi** - Hızlı ve güvenli ödeme
- 🏆 **Kazananlar Bölümü** - Gerçek zamanlı kazanç gösterimi
- 📱 **Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- 🎨 **Modern UI/UX** - Kullanıcı dostu arayüz

## Teknolojiler

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Veritabanı**: In-Memory Storage (Geliştirme için)
- **Build Tool**: Vite

## Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd casibom-casino
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
# Frontend (Port 3000)
npm run dev

# Backend (Port 5000) - Yeni terminal
npm run server
```

4. Tarayıcınızda `http://localhost:3000` adresini açın.

## Kullanım

### Oyun Akışı
1. **Kayıt Ol** - Yeni hesap oluşturun
2. **Giriş Yap** - Hesabınıza giriş yapın
3. **Para Yatır** - Bakiye ekleyin
4. **Oyun Oyna** - Slot oyunlarını oynayın

### API Endpoints

#### Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

#### Ödeme
- `POST /api/payment/deposit` - Para yatırma

#### Oyunlar
- `GET /api/games` - Tüm oyunları listele
- `GET /api/games/:id` - Belirli oyun detayı

#### Kazananlar
- `GET /api/winners` - Kazananları listele

## Proje Yapısı

```
casibom-casino/
├── src/
│   ├── components/          # React bileşenleri
│   │   ├── Header.tsx
│   │   ├── HeroCarousel.tsx
│   │   ├── PromoCards.tsx
│   │   ├── GamesGrid.tsx
│   │   ├── WinnersSection.tsx
│   │   ├── Footer.tsx
│   │   ├── LoginModal.tsx
│   │   ├── RegisterModal.tsx
│   │   └── PaymentModal.tsx
│   ├── shared/             # Paylaşılan kodlar
│   │   ├── schema.ts       # TypeScript tipleri
│   │   └── storage.ts      # Veri depolama
│   ├── App.tsx             # Ana uygulama
│   ├── main.tsx            # Giriş noktası
│   └── index.css           # Stil dosyası
├── server/                 # Backend kodları
│   ├── index.js           # Ana sunucu
│   ├── routes.js          # API rotaları
│   └── vite.js            # Vite entegrasyonu
├── public/
│   └── images/            # Oyun görselleri (1-16.png)
└── package.json
```

## Güvenlik

- Şifreler production'da hash'lenmelidir
- JWT token sistemi eklenmelidir
- Rate limiting uygulanmalıdır
- HTTPS kullanılmalıdır

## Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## İletişim

Proje hakkında sorularınız için issue açabilirsiniz.

