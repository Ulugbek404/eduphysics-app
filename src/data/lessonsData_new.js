// 9-Sinf Fizika Dasturi - To'liq Yangilangan Darslar ma'lumotlari

export const lessonsData = {
    chapters: [
        // ========================================
        // 1. MEXANIKA
        // ========================================
        {
            id: 'mechanics',
            title: 'Mexanika',
            description: 'Jismlarning harakati va kinematika',
            icon: '🚀',
            color: 'blue',
            lessons: [
                {
                    id: 'mech-1',
                    title: 'Mexanik Harakat. Moddiy Nuqta. Sanoq Sistemasi',
                    description: 'Mexanik harakat tushunchasi, moddiy nuqta, sanoq sistemasi',
                    duration: '20 min',
                    xp: 50,
                    content: {
                        theory: `# Mexanik Harakat

## Asosiy Tushunchalar

### Mexanik Harakat
**Mexanik harakat** - jismning boshqa jismlarga nisbatan o'rnini o'zgartirishi.

**Muhim:** Harakat nisbiy tushunchadir. Bir jism bir sanoq sistemasida harakatda, boshqasida tinch bo'lishi mumkin.

### Moddiy Nuqta
**Moddiy nuqta** - o'lchamlari hisobga olinmaydigan jism.

**Qachon jismni moddiy nuqta deb olish mumkin:**
- Jism o'lchamlari yo'lga nisbatan juda kichik bo'lsa
- Masalan: Yer-Quyosh masofasida Yer moddiy nuqta

### Sanoq Sistemasi
**Sanoq sistemasi** - harakatni kuzatish uchun tanlangan:
- Sanoq jismi
- Koordinatalar sistemasi  
- Vaqt o'lchash asboblari

**Misollar:**
- **Yer** - ko'pchilik hodisalar uchun
- **Poyezd** - yo'lovchilar harakati uchun
- **Quyosh** - sayyoralar harakati uchun

## Nisbiylik Prinsipi

Bir xil hodisa turli sanoq sistemalarida turlicha ko'rinadi.

**Misol:** Poyezdda o'tirgan yo'lovchi:
- Poyezd ichida - tinch holatda
- Yer uchun - harakatda
- Boshqa poyezd uchun - boshqa tezlikda harakatda`,
                        examples: [
                            {
                                title: 'Misol 1: Moddiy nuqta',
                                problem: 'Quyidagi hollarning qaysi birida jismni moddiy nuqta deb olish mumkin?\na) Yer Quyosh atrofida aylanayotganda\nb) Avtomobil garajga kirayotganda\nc) Samolyot qit\'ada uchayotganda',
                                solution: `**Tahlil:**

a) **Yer-Quyosh masofasi** ≈ 150 million km
   Yer diametri ≈ 12,000 km
   Nisbat: 12,000 / 150,000,000 ≈ 0.00008
   ✅ **Moddiy nuqta deb olish mumkin**

b) **Avtomobil uzunligi** ≈ 4-5 m
   Garaj o'lchami ≈ 6-7 m
   ❌ **Moddiy nuqta deb olish MUMKIN EMAS**

c) **Samolyot uzunligi** ≈ 50-70 m
   Qit'a masofasi ≈ 1000+ km
   ✅ **Moddiy nuqta deb olish mumkin**

**Javob:** a) va c) hollarda moddiy nuqta deb olish mumkin`,
                                answer: 'a) va c)'
                            },
                            {
                                title: 'Misol 2: Sanoq sistemasi',
                                problem: 'Poyezd 80 km/soat tezlik bilan harakatlanmoqda. Poyezdda o\'tirgan yo\'lovchi yo\'lak bo\'ylab 5 km/soat tezlik bilan yurmoqda. Yo\'lovchining Yerga nisbatan tezligini toping.',
                                solution: `**Berilgan:**
- Poyezd tezligi (Yerga nisbatan): v₁ = 80 km/soat
- Yo'lovchi tezligi (poyezdga nisbatan): v₂ = 5 km/soat

**Yechim:**

Agar yo'lovchi poyezd harakati yo'nalishida yursa:
v = v₁ + v₂ = 80 + 5 = 85 km/soat

Agar yo'lovchi poyezd harakatiga qarama-qarshi yursa:
v = v₁ - v₂ = 80 - 5 = 75 km/soat

**Javob:** 85 km/soat yoki 75 km/soat (yo'nalishga bog'liq)`,
                                answer: '85 km/soat yoki 75 km/soat'
                            },
                            {
                                title: 'Misol 3: Nisbiylik',
                                problem: 'Ikki poyezd bir-biriga qarab 60 km/soat va 40 km/soat tezlik bilan harakatlanmoqda. Birinchi poyezddagi yo\'lovchi uchun ikkinchi poyezdning tezligi qanday?',
                                solution: `**Berilgan:**
- Birinchi poyezd: v₁ = 60 km/soat
- Ikkinchi poyezd: v₂ = 40 km/soat
- Yo'nalish: bir-biriga qarab

**Yechim:**

Qarama-qarshi harakatda tezliklar qo'shiladi:
v_nisbiy = v₁ + v₂
v_nisbiy = 60 + 40
v_nisbiy = 100 km/soat

**Javob:** 100 km/soat`,
                                answer: '100 km/soat'
                            }
                        ],
                        video: '',
                        formulas: [
                            { name: 'Nisbiy tezlik (bir yo\'nalishda)', formula: 'v = v₁ - v₂', description: 'Bir yo\'nalishda harakat' },
                            { name: 'Nisbiy tezlik (qarama-qarshi)', formula: 'v = v₁ + v₂', description: 'Qarama-qarshi harakat' }
                        ]
                    }
                },
                {
                    id: 'mech-2',
                    title: 'Harakat Traektoriyasi. Yo\'l va Ko\'chish',
                    description: 'Traektoriya turlari, yo\'l va ko\'chish tushunchalari',
                    duration: '20 min',
                    xp: 50,
                    content: {
                        theory: `# Traektoriya, Yo'l va Ko'chish

## Traektoriya

**Traektoriya** - jism harakat qilayotganda chizgan chiziq.

### Traektoriya Turlari:

**1. To'g'ri chiziqli**
- Misol: Erkin tushayotgan jism
- Misol: Gorizontal yo'lda harakatlanayotgan avtomobil

**2. Egri chiziqli**
- Misol: Otilgan tosh
- Misol: Samolyot traektoriyasi

**3. Aylanma**
- Misol: Soat millari
- Misol: Sayyoralar harakati

## Yo'l (s)

**Yo'l** - traektoriya bo'ylab o'tgan masofaning uzunligi.

**Xususiyatlari:**
- Skalyar kattalik (faqat son)
- Har doim musbat
- Birlik: metr (m), kilometr (km)

## Ko'chish (Δr)

**Ko'chish** - boshlang'ich nuqtadan oxirgi nuqtagacha bo'lgan to'g'ri chiziq.

**Xususiyatlari:**
- Vektor kattalik (yo'nalishi bor)
- Musbat yoki manfiy bo'lishi mumkin
- Birlik: metr (m)

## Yo'l va Ko'chish Farqi

| Yo'l (s) | Ko'chish (Δr) |
|----------|---------------|
| Skalyar | Vektor |
| Traektoriya uzunligi | To'g'ri masofa |
| s ≥ |Δr| | |Δr| ≤ s |

**Maxsus holat:** To'g'ri chiziqli harakatda s = |Δr|`,
                        examples: [
                            {
                                title: 'Misol 1: Yo\'l va ko\'chish',
                                problem: 'O\'quvchi maktab maydonining 100 m × 60 m to\'rtburchak shaklidagi chetlarini aylanib chiqdi. Yo\'l va ko\'chishni toping.',
                                solution: `**Berilgan:**
- To'rtburchak: 100 m × 60 m
- O'quvchi to'liq aylanib chiqdi

**Yechim:**

**Yo'l:**
s = 2(a + b)
s = 2(100 + 60)
s = 2 × 160
s = 320 m

**Ko'chish:**
Boshlang'ich va oxirgi nuqta bir xil
Δr = 0 m

**Javob:** Yo'l = 320 m, Ko'chish = 0 m`,
                                answer: 's = 320 m, Δr = 0 m'
                            },
                            {
                                title: 'Misol 2: Yarim aylana',
                                problem: 'Jism radiusi 10 m bo\'lgan aylana bo\'ylab yarim aylana harakat qildi. Yo\'l va ko\'chishni toping.',
                                solution: `**Berilgan:**
- Radius: R = 10 m
- Yarim aylana

**Yechim:**

**Yo'l (yarim aylana uzunligi):**
s = πR
s = 3.14 × 10
s = 31.4 m

**Ko'chish (diametr):**
Δr = 2R
Δr = 2 × 10
Δr = 20 m

**Javob:** Yo'l = 31.4 m, Ko'chish = 20 m`,
                                answer: 's = 31.4 m, Δr = 20 m'
                            },
                            {
                                title: 'Misol 3: To\'g\'ri chiziqli harakat',
                                problem: 'Avtomobil to\'g\'ri yo\'lda 50 m oldinga, keyin 30 m orqaga harakat qildi. Yo\'l va ko\'chishni toping.',
                                solution: `**Berilgan:**
- Oldinga: s₁ = 50 m
- Orqaga: s₂ = 30 m

**Yechim:**

**Yo'l:**
s = s₁ + s₂
s = 50 + 30
s = 80 m

**Ko'chish:**
Δr = s₁ - s₂
Δr = 50 - 30
Δr = 20 m (oldinga yo'nalishda)

**Javob:** Yo'l = 80 m, Ko'chish = 20 m`,
                                answer: 's = 80 m, Δr = 20 m'
                            }
                        ],
                        video: '',
                        formulas: [
                            { name: 'Aylana uzunligi', formula: 'L = 2πR', description: 'To\'liq aylana uzunligi' },
                            { name: 'Yarim aylana', formula: 's = πR', description: 'Yarim aylana uzunligi' },
                            { name: 'To\'rtburchak perimetri', formula: 'P = 2(a + b)', description: 'To\'rtburchak perimetri' }
                        ]
                    }
                },
                {
                    id: 'mech-3',
                    title: 'To\'g\'ri Chiziqli Tekis Harakat. Tezlik',
                    description: 'Tekis harakat, tezlik formulasi, birliklar',
                    duration: '25 min',
                    xp: 50,
                    content: {
                        theory: `# To'g'ri Chiziqli Tekis Harakat

## Tekis Harakat

**Tekis harakat** - tezlik o'zgarmas bo'lgan harakat.

**Xususiyatlari:**
- Tezlik = const
- Tezlanish = 0
- Teng vaqt oralig'ida teng yo'l bosadi

## Tezlik

**Tezlik** - jismning vaqt birligi ichida bosib o'tgan yo'li.

### Asosiy Formula:
\`\`\`
v = s / t
\`\`\`

Bunda:
- **v** - tezlik (m/s yoki km/soat)
- **s** - yo'l (m yoki km)
- **t** - vaqt (s yoki soat)

### Boshqa formulalar:

**Yo'lni topish:**
\`\`\`
s = v × t
\`\`\`

**Vaqtni topish:**
\`\`\`
t = s / v
\`\`\`

## Tezlik Birliklari

### SI sistemasida:
**m/s** (metr/sekund) - asosiy birlik

### Amaliyotda:
**km/soat** (kilometr/soat)

### Birliklarni o'tkazish:
\`\`\`
1 m/s = 3.6 km/soat
1 km/soat = 1/3.6 m/s ≈ 0.28 m/s
\`\`\`

**Eslab qolish qoidasi:**
- m/s → km/soat: **×3.6**
- km/soat → m/s: **÷3.6**

## Harakat Grafiklari

### s(t) - Yo'l-vaqt grafigi:
- To'g'ri chiziq
- Qiyalik = tezlik

### v(t) - Tezlik-vaqt grafigi:
- Gorizontal chiziq
- Grafik ostidagi yuza = yo'l`,
                        examples: [
                            {
                                title: 'Misol 1: Tezlikni hisoblash',
                                problem: 'Avtomobil 3 soatda 240 km yo\'l bosdi. Tezligini toping.',
                                solution: `**Berilgan:**
- s = 240 km
- t = 3 soat

**Topish kerak:** v = ?

**Yechim:**
v = s / t
v = 240 km / 3 soat
v = 80 km/soat

**Javob:** 80 km/soat`,
                                answer: '80 km/soat'
                            },
                            {
                                title: 'Misol 2: Yo\'lni topish',
                                problem: 'Poyezd 60 km/soat tezlik bilan 2.5 soat harakatlandi. Qancha yo\'l bosgan?',
                                solution: `**Berilgan:**
- v = 60 km/soat
- t = 2.5 soat

**Topish kerak:** s = ?

**Yechim:**
s = v × t
s = 60 km/soat × 2.5 soat
s = 150 km

**Javob:** 150 km`,
                                answer: '150 km'
                            },
                            {
                                title: 'Misol 3: Birliklarni o\'tkazish',
                                problem: '72 km/soat tezlikni m/s ga o\'tkazing.',
                                solution: `**Berilgan:**
- v = 72 km/soat

**Topish kerak:** v = ? m/s

**Yechim:**
v = 72 km/soat ÷ 3.6
v = 20 m/s

**Tekshirish:**
20 m/s × 3.6 = 72 km/soat ✓

**Javob:** 20 m/s`,
                                answer: '20 m/s'
                            },
                            {
                                title: 'Misol 4: Vaqtni topish',
                                problem: 'Velosipedchi 36 km masofani 18 km/soat tezlik bilan bosib o\'tdi. Qancha vaqt ketgan?',
                                solution: `**Berilgan:**
- s = 36 km
- v = 18 km/soat

**Topish kerak:** t = ?

**Yechim:**
t = s / v
t = 36 km / 18 km/soat
t = 2 soat

**Javob:** 2 soat`,
                                answer: '2 soat'
                            }
                        ],
                        video: '',
                        formulas: [
                            { name: 'Tezlik', formula: 'v = s / t', description: 'Tezlik = Yo\'l / Vaqt' },
                            { name: 'Yo\'l', formula: 's = v × t', description: 'Yo\'l = Tezlik × Vaqt' },
                            { name: 'Vaqt', formula: 't = s / v', description: 'Vaqt = Yo\'l / Tezlik' },
                            { name: 'Birlik o\'tkazish', formula: '1 m/s = 3.6 km/soat', description: 'Tezlik birliklarini o\'tkazish' }
                        ]
                    }
                },
                {
                    id: 'mech-4',
                    title: 'Notekis Harakat. O\'rtacha Tezlik',
                    description: 'Notekis harakat, o\'rtacha va oniy tezlik',
                    duration: '20 min',
                    xp: 50,
                    content: {
                        theory: `# Notekis Harakat

## Notekis Harakat Nima?

**Notekis harakat** - tezlik o'zgarib turadigan harakat.

**Misollar:**
- Avtomobil tormozlanayotganda
- Poyezd tezlashayotganda
- Velosipedchi tepaliklarda

## O'rtacha Tezlik

**O'rtacha tezlik** - butun yo'l davomidagi tezlik.

### Formula:
\`\`\`
v_o'rtacha = s_umumiy / t_umumiy
\`\`\`

**Muhim:** O'rtacha tezlik tezliklarning o'rtacha arifmetigi EMAS!

### Noto'g'ri:
\`\`\`
v_o'rtacha ≠ (v₁ + v₂) / 2
\`\`\`

### To'g'ri:
\`\`\`
v_o'rtacha = (s₁ + s₂) / (t₁ + t₂)
\`\`\`

## Oniy Tezlik

**Oniy tezlik** - ma'lum bir paytdagi tezlik.

**Misollar:**
- Spidometr ko'rsatkichi
- Ma'lum bir ondagi tezlik

## Maxsus Holat

Agar yo'lning yarmi v₁ tezlikda, yarmi v₂ tezlikda bosib o'tilsa:

\`\`\`
v_o'rtacha = 2v₁v₂ / (v₁ + v₂)
\`\`\`

Bu **garmonik o'rtacha** deyiladi.`,
                        examples: [
                            {
                                title: 'Misol 1: O\'rtacha tezlik',
                                problem: 'Avtomobil birinchi 2 soatda 80 km, keyingi 3 soatda 150 km yo\'l bosdi. O\'rtacha tezligini toping.',
                                solution: `**Berilgan:**
- s₁ = 80 km, t₁ = 2 soat
- s₂ = 150 km, t₂ = 3 soat

**Yechim:**

Umumiy yo'l:
s = s₁ + s₂ = 80 + 150 = 230 km

Umumiy vaqt:
t = t₁ + t₂ = 2 + 3 = 5 soat

O'rtacha tezlik:
v_o'rtacha = s / t
v_o'rtacha = 230 / 5
v_o'rtacha = 46 km/soat

**Javob:** 46 km/soat`,
                                answer: '46 km/soat'
                            },
                            {
                                title: 'Misol 2: Teng yo\'l',
                                problem: 'Velosipedchi yo\'lning yarmini 12 km/soat, qolgan yarmini 18 km/soat tezlik bilan bosib o\'tdi. O\'rtacha tezligini toping.',
                                solution: `**Berilgan:**
- v₁ = 12 km/soat (birinchi yarim)
- v₂ = 18 km/soat (ikkinchi yarim)

**Yechim:**

Garmonik o'rtacha formula:
v_o'rtacha = 2v₁v₂ / (v₁ + v₂)
v_o'rtacha = 2 × 12 × 18 / (12 + 18)
v_o'rtacha = 432 / 30
v_o'rtacha = 14.4 km/soat

**Tekshirish:**
(12 + 18) / 2 = 15 km/soat ❌ (noto'g'ri)
Garmonik o'rtacha: 14.4 km/soat ✓ (to'g'ri)

**Javob:** 14.4 km/soat`,
                                answer: '14.4 km/soat'
                            },
                            {
                                title: 'Misol 3: Murakkab masala',
                                problem: 'Poyezd birinchi 100 km ni 50 km/soat, keyingi 150 km ni 75 km/soat tezlik bilan bosib o\'tdi. O\'rtacha tezligini toping.',
                                solution: `**Berilgan:**
- s₁ = 100 km, v₁ = 50 km/soat
- s₂ = 150 km, v₂ = 75 km/soat

**Yechim:**

Vaqtlarni topamiz:
t₁ = s₁ / v₁ = 100 / 50 = 2 soat
t₂ = s₂ / v₂ = 150 / 75 = 2 soat

Umumiy yo'l va vaqt:
s = 100 + 150 = 250 km
t = 2 + 2 = 4 soat

O'rtacha tezlik:
v_o'rtacha = 250 / 4 = 62.5 km/soat

**Javob:** 62.5 km/soat`,
                                answer: '62.5 km/soat'
                            }
                        ],
                        video: '',
                        formulas: [
                            { name: 'O\'rtacha tezlik', formula: 'v = s_umumiy / t_umumiy', description: 'Umumiy yo\'l va vaqt orqali' },
                            { name: 'Garmonik o\'rtacha', formula: 'v = 2v₁v₂ / (v₁ + v₂)', description: 'Teng yo\'llar uchun' }
                        ]
                    }
                },
                {
                    id: 'mech-5',
                    title: 'Tezlanish. Tekis Tezlanuvchan Harakat',
                    description: 'Tezlanish tushunchasi, tekis tezlanuvchan harakat qonunlari',
                    duration: '25 min',
                    xp: 50,
                    content: {
                        theory: `# Tezlanish

## Tezlanish Nima?

**Tezlanish (a)** - tezlikning vaqt birligi ichida o'zgarishi.

### Formula:
\`\`\`
a = (v - v₀) / t
\`\`\`

Bunda:
- **a** - tezlanish (m/s²)
- **v** - oxirgi tezlik (m/s)
- **v₀** - boshlang'ich tezlik (m/s)
- **t** - vaqt (s)

## Tekis Tezlanuvchan Harakat

**Tekis tezlanuvchan harakat** - tezlanish o'zgarmas bo'lgan harakat.

### Asosiy formulalar:

**1. Tezlik:**
\`\`\`
v = v₀ + at
\`\`\`

**2. Yo'l:**
\`\`\`
s = v₀t + (at²)/2
\`\`\`

**3. Tezlik va yo'l bog'liqli gi:**
\`\`\`
v² = v₀² + 2as
\`\`\`

## Tezlanish Turlari

**Musbat tezlanish (a > 0):**
- Tezlik ortadi
- Misol: Avtomobil tezlashmoqda

**Manfiy tezlanish (a < 0):**
- Tezlik kamayadi (sekinlanish)
- Misol: Avtomobil tormozlanmoqda

## Grafik Tasvir

**v(t) grafigi:**
- To'g'ri chiziq
- Qiyalik = tezlanish
- Grafik ostidagi yuza = yo'l`,
                        examples: [
                            {
                                title: 'Misol 1: Tezlanishni topish',
                                problem: 'Avtomobil 5 sekundda 0 dan 20 m/s gacha tezlashdi. Tezlanishni toping.',
                                solution: `**Berilgan:**
- v₀ = 0 m/s
- v = 20 m/s
- t = 5 s

**Topish kerak:** a = ?

**Yechim:**
a = (v - v₀) / t
a = (20 - 0) / 5
a = 4 m/s²

**Javob:** 4 m/s²`,
                                answer: '4 m/s²'
                            },
                            {
                                title: 'Misol 2: Yo\'lni topish',
                                problem: 'Jism 2 m/s² tezlanish bilan 10 sekund harakatlandi. Boshlang\'ich tezlik 5 m/s. Yo\'lni toping.',
                                solution: `**Berilgan:**
- v₀ = 5 m/s
- a = 2 m/s²
- t = 10 s

**Topish kerak:** s = ?

**Yechim:**
s = v₀t + (at²)/2
s = 5×10 + (2×10²)/2
s = 50 + 100
s = 150 m

**Javob:** 150 m`,
                                answer: '150 m'
                            },
                            {
                                title: 'Misol 3: Tormozlanish',
                                problem: 'Avtomobil 20 m/s tezlikdan 4 m/s² sekinlanish bilan to\'xtadi. Qancha vaqtda to\'xtadi?',
                                solution: `**Berilgan:**
- v₀ = 20 m/s
- v = 0 m/s (to'xtadi)
- a = -4 m/s² (sekinlanish)

**Topish kerak:** t = ?

**Yechim:**
v = v₀ + at
0 = 20 + (-4)t
4t = 20
t = 5 s

**Javob:** 5 sekund`,
                                answer: '5 s'
                            }
                        ],
                        video: '',
                        formulas: [
                            { name: 'Tezlanish', formula: 'a = (v - v₀) / t', description: 'Tezlanish formulasi' },
                            { name: 'Tezlik', formula: 'v = v₀ + at', description: 'Oxirgi tezlik' },
                            { name: 'Yo\'l', formula: 's = v₀t + (at²)/2', description: 'Bosib o\'tilgan yo\'l' },
                            { name: 'Tezlik-yo\'l', formula: 'v² = v₀² + 2as', description: 'Tezlik va yo\'l bog\'liqli gi' }
                        ]
                    }
                },
                {
                    id: 'mech-6',
                    title: 'Erkin Tushish. Og\'irlik Kuchi Tezlanishi',
                    description: 'Erkin tushish harakati, g tezlanishi',
                    duration: '20 min',
                    xp: 50,
                    content: {
                        theory: `# Erkin Tushish

## Erkin Tushish Nima?

**Erkin tushish** - jismning faqat og'irlik kuchi ta'sirida harakati.

**Xususiyatlari:**
- Havo qarshiligi hisobga olinmaydi
- Barcha jismlar bir xil tezlanish bilan tushadi
- Jism massasi ahamiyati yo'q

## Og'irlik Kuchi Tezlanishi (g)

**Yer yuzasida:**
\`\`\`
g ≈ 10 m/s²
\`\`\`

**Aniq qiymat:** g = 9.8 m/s²

**Masalalar yechishda:** g = 10 m/s² ishlatamiz

## Erkin Tushish formulalari

Erkin tushishda **a = g** bo'lgani uchun:

**1. Tezlik:**
\`\`\`
v = gt
\`\`\`

**2. Balandlik:**
\`\`\`
h = (gt²)/2
\`\`\`

**3. Tezlik va balandlik:**
\`\`\`
v² = 2gh
\`\`\`

## Yuqoriga Otilgan Jism

Boshlang'ich tezlik v₀ bilan yuqoriga otilgan jism:

**Maksimal balandlik:**
\`\`\`
h_max = v₀² / (2g)
\`\`\`

**Ko'tarilish vaqti:**
\`\`\`
t_ko'tarilish = v₀ / g
\`\`\``,
                        examples: [
                            {
                                title: 'Misol 1: Tushish vaqti',
                                problem: 'Jism 80 m balandlikdan erkin tushmoqda. Qancha vaqtda yerga tushadi? (g=10 m/s²)',
                                solution: `**Berilgan:**
- h = 80 m
- g = 10 m/s²
- v₀ = 0 (tinch holatdan)

**Topish kerak:** t = ?

**Yechim:**
h = (gt²)/2
80 = (10×t²)/2
80 = 5t²
t² = 16
t = 4 s

**Javob:** 4 sekund`,
                                answer: '4 s'
                            },
                            {
                                title: 'Misol 2: Oxirgi tezlik',
                                problem: 'Jism 45 m balandlikdan tushdi. Yerga tegish paytidagi tezligini toping. (g=10 m/s²)',
                                solution: `**Berilgan:**
- h = 45 m
- g = 10 m/s²

**Topish kerak:** v = ?

**Yechim:**
v² = 2gh
v² = 2×10×45
v² = 900
v = 30 m/s

**Javob:** 30 m/s`,
                                answer: '30 m/s'
                            },
                            {
                                title: 'Misol 3: Yuqoriga otilgan jism',
                                problem: 'Jism 20 m/s tezlik bilan yuqoriga otildi. Maksimal balandlikka ko\'tariladi? (g=10 m/s²)',
                                solution: `**Berilgan:**
- v₀ = 20 m/s
- g = 10 m/s²

**Topish kerak:** h_max = ?

**Yechim:**
Eng yuqori nuqtada v = 0
v² = v₀² - 2gh (yuqoriga harakat)
0 = 20² - 2×10×h
20h = 400
h = 20 m

**Javob:** 20 m`,
                                answer: '20 m'
                            }
                        ],
                        video: '',
                        formulas: [
                            { name: 'Tezlik', formula: 'v = gt', description: 'Erkin tushishdagi tezlik' },
                            { name: 'Balandlik', formula: 'h = (gt²)/2', description: 'Tushgan balandlik' },
                            { name: 'Tezlik-balandlik', formula: 'v² = 2gh', description: 'Tezlik va balandlik bog\'liqli gi' },
                            { name: 'Maksimal balandlik', formula: 'h = v₀²/(2g)', description: 'Yuqoriga otilgan jism' }
                        ]
                    }
                },
                {
                    id: 'mech-7',
                    title: 'Aylana Bo\'ylab Tekis Harakat',
                    description: 'Aylanma harakat, chiziqli va burchakli tezlik',
                    duration: '25 min',
                    xp: 50,
                    content: {
                        theory: `# Aylana Bo'ylab Tekis Harakat

## Aylanma Harakat

**Aylanma harakat** - jism aylana bo'ylab harakat qilishi.

**Misollar:**
- Soat millari
- Sayyoralar harakati
- G'ildirak aylanishi

## Asosiy Kattaliklar

### 1. Davr (T)

**Davr** - to'liq bir marta aylanish uchun ketgan vaqt.

**Birlik:** sekund (s)

### 2. Chastota (ν)

**Chastota** - vaqt birligi ichidagi aylanishlar soni.

**Formula:**
\`\`\`
ν = 1 / T
\`\`\`

**Birlik:** 1/s yoki Gerts (Gs)

### 3. Chiziqli Tezlik (v)

**Chiziqli tezlik** - aylana bo'ylab harakat tezligi.

**Formula:**
\`\`\`
v = 2πR / T = 2πRν
\`\`\`

Bunda R - aylana radiusi

### 4. Burchakli Tezlik (ω)

**Burchakli tezlik** - vaqt birligi ichida burilgan burchak.

**Formula:**
\`\`\`
ω = 2π / T = 2πν
\`\`\`

**Birlik:** rad/s

## Bog'liqlik

Chiziqli va burchakli tezlik bog'liqli gi:
\`\`\`
v = ωR
\`\`\`

## Markazga Intilma Tezlanish

Aylana bo'ylab tekis harakatda tezlik yo'nalishi o'zgaradi, shuning uchun tezlanish bor:

\`\`\`
a_m = v² / R = ω²R
\`\`\`

Bu tezlanish aylana markaziga yo'nalgan.`,
                        examples: [
                            {
                                title: 'Misol 1: Davr va chastota',
                                problem: 'Jism 5 sekundda 10 marta aylandi. Davr va chastotani toping.',
                                solution: `**Berilgan:**
- t = 5 s
- n = 10 (aylanishlar soni)

**Yechim:**

Davr:
T = t / n
T = 5 / 10
T = 0.5 s

Chastota:
ν = 1 / T
ν = 1 / 0.5
ν = 2 Gs

**Javob:** T = 0.5 s, ν = 2 Gs`,
                                answer: 'T = 0.5 s, ν = 2 Gs'
                            },
                            {
                                title: 'Misol 2: Chiziqli tezlik',
                                problem: 'Radiusi 2 m bo\'lgan aylana bo\'ylab jism 4 sekundda bir marta aylanadi. Chiziqli tezligini toping.',
                                solution: `**Berilgan:**
- R = 2 m
- T = 4 s

**Yechim:**

v = 2πR / T
v = 2 × 3.14 × 2 / 4
v = 12.56 / 4
v = 3.14 m/s

**Javob:** 3.14 m/s`,
                                answer: '3.14 m/s'
                            },
                            {
                                title: 'Misol 3: Markazga intilma tezlanish',
                                problem: 'Jism 10 m/s tezlik bilan radiusi 5 m bo\'lgan aylana bo\'ylab harakatlanmoqda. Markazga intilma tezlanishni toping.',
                                solution: `**Berilgan:**
- v = 10 m/s
- R = 5 m

**Yechim:**

a_m = v² / R
a_m = 10² / 5
a_m = 100 / 5
a_m = 20 m/s²

**Javob:** 20 m/s²`,
                                answer: '20 m/s²'
                            }
                        ],
                        video: '',
                        formulas: [
                            { name: 'Davr-chastota', formula: 'ν = 1/T', description: 'Chastota va davr bog\'liqli gi' },
                            { name: 'Chiziqli tezlik', formula: 'v = 2πR/T', description: 'Aylana bo\'ylab tezlik' },
                            { name: 'Burchakli tezlik', formula: 'ω = 2π/T', description: 'Burchakli tezlik' },
                            { name: 'Markazga intilma', formula: 'a = v²/R', description: 'Markazga intilma tezlanish' }
                        ]
                    }
                },
                {
                    id: 'mech-8',
                    title: 'Massa va Zichlik',
                    description: 'Massa, zichlik tushunchalari va formulalari',
                    duration: '20 min',
                    xp: 50,
                    content: {
                        theory: `# Massa va Zichlik

## Massa

**Massa (m)** - jismning inertlik o'lchovi.

**Xususiyatlari:**
- Skalyar kattalik
- Joydan joyga o'zgarmaydi
- Birlik: kilogramm (kg)

**Boshqa birliklar:**
- 1 tonna (t) = 1000 kg
- 1 gramm (g) = 0.001 kg
- 1 milligramm (mg) = 0.000001 kg

## Zichlik

**Zichlik (ρ)** - birlik hajmdagi massa.

### Formula:
\`\`\`
ρ = m / V
\`\`\`

Bunda:
- **ρ** - zichlik (kg/m³)
- **m** - massa (kg)
- **V** - hajm (m³)

### Boshqa formulalar:

**Massani topish:**
\`\`\`
m = ρV
\`\`\`

**Hajmni topish:**
\`\`\`
V = m / ρ
\`\`\`

## Ba'zi Moddalarning Zichligi

| Modda | Zichlik (kg/m³) |
|-------|-----------------|
| Alyuminiy | 2700 |
| Temir | 7800 |
| Mis | 8900 |
| Oltin | 19300 |
| Suv | 1000 |
| Yog' | 900 |
| Havo | 1.29 |

## Massa va Og'irlik Farqi

**Massa:**
- Jismning xossasi
- O'zgarmaydi
- Birlik: kg

**Og'irlik (P):**
- Kuch
- Joyga bog'liq
- Birlik: N (Nyuton)
- P = mg`,
                        examples: [
                            {
                                title: 'Misol 1: Zichlikni topish',
                                problem: 'Massasi 270 kg bo\'lgan alyuminiy bo\'lagining hajmi 0.1 m³. Zichligini toping.',
                                solution: `**Berilgan:**
- m = 270 kg
- V = 0.1 m³

**Topish kerak:** ρ = ?

**Yechim:**
ρ = m / V
ρ = 270 / 0.1
ρ = 2700 kg/m³

**Javob:** 2700 kg/m³ (Alyuminiy zichligi)`,
                                answer: '2700 kg/m³'
                            },
                            {
                                title: 'Misol 2: Massani topish',
                                problem: 'Hajmi 0.5 m³ bo\'lgan temir bo\'lagining massasini toping. (ρ_temir = 7800 kg/m³)',
                                solution: `**Berilgan:**
- V = 0.5 m³
- ρ = 7800 kg/m³

**Topish kerak:** m = ?

**Yechim:**
m = ρV
m = 7800 × 0.5
m = 3900 kg

**Javob:** 3900 kg yoki 3.9 tonna`,
                                answer: '3900 kg'
                            },
                            {
                                title: 'Misol 3: Hajmni topish',
                                problem: 'Massasi 8.9 kg bo\'lgan mis bo\'lagining hajmini toping. (ρ_mis = 8900 kg/m³)',
                                solution: `**Berilgan:**
- m = 8.9 kg
- ρ = 8900 kg/m³

**Topish kerak:** V = ?

**Yechim:**
V = m / ρ
V = 8.9 / 8900
V = 0.001 m³
V = 1000 sm³ = 1 litr

**Javob:** 0.001 m³ yoki 1 litr`,
                                answer: '0.001 m³'
                            }
                        ],
                        video: '',
                        formulas: [
                            { name: 'Zichlik', formula: 'ρ = m/V', description: 'Zichlik formulasi' },
                            { name: 'Massa', formula: 'm = ρV', description: 'Massa orqali zichlik' },
                            { name: 'Hajm', formula: 'V = m/ρ', description: 'Hajm orqali zichlik' }
                        ]
                    }
                }
            ]
        }
    ]
};

// Progress hisoblash funksiyasi
export function calculateChapterProgress(chapter, completedLessons) {
    if (!chapter || !chapter.lessons || chapter.lessons.length === 0) return 0;

    const completedCount = chapter.lessons.filter(lesson =>
        completedLessons.includes(lesson.id)
    ).length;

    return Math.round((completedCount / chapter.lessons.length) * 100);
}
