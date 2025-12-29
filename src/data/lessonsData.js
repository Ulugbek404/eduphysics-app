// 9-Sinf Fizika Dasturi - To'liq Darslar Ma'lumotlari

export const lessonsData = {
    chapters: [
        // ========================================
        // 1. MEXANIKA
        // ========================================
        {
            id: 'mechanics',
            title: 'Mexanika',
            description: 'Jismlarning harakati va kuchlar',
            icon: '🚀',
            color: 'blue',
            lessons: [
                {
                    id: 'mech-1',
                    title: 'Harakat va Tinchlik',
                    description: 'Mexanik harakat, sanoq sistemasi, traektoriya',
                    duration: '15 min',
                    xp: 50,
                    content: {
                        theory: `# Mexanik Harakat

## Asosiy Tushunchalar

**Mexanik harakat** - jismning boshqa jismlarga nisbatan o'rnini o'zgartirishi.

### 1. Sanoq Sistemasi
Harakatni kuzatish uchun tanlangan jism:
- **Yer** - ko'pchilik holatlarda
- **Poyezd** - yo'lovchilar uchun  
- **Quyosh** - sayyoralar uchun

### 2. Traektoriya
Jism harakat qilayotganda chizgan chiziq.

**Turlari:**
- To'g'ri chiziqli
- Egri chiziqli
- Aylanma

### 3. Yo'l (s)
Traektoriya bo'ylab o'tgan masofa.
**Birlik:** metr (m), kilometr (km)

## Nisbiylik Prinsipi

Bir jism turli sanoq sistemalarida turlicha harakat qilishi mumkin.

**Misol:** Poyezdda o'tirgan yo'lovchi:
- Poyezd ichida - tinch
- Yer uchun - harakatda`,
                        examples: [
                            {
                                title: 'Misol 1: Avtomobil harakati',
                                problem: 'Avtomobil 3 soatda 240 km yo\'l bosdi. Uning o\'rtacha tezligini toping.',
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
                                title: 'Misol 2: Poyezd harakati',
                                problem: 'Poyezd 60 km/soat tezlik bilan harakatlansa, 2 soatda qancha yo\'l bosadi?',
                                solution: `**Berilgan:**
- v = 60 km/soat
- t = 2 soat

**Topish kerak:** s = ?

**Yechim:**
s = v × t
s = 60 km/soat × 2 soat
s = 120 km

**Javob:** 120 km`,
                                answer: '120 km'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Yo\'l', formula: 's = v × t', description: 'Yo\'l = Tezlik × Vaqt' }
                        ]
                    }
                },
                {
                    id: 'mech-2',
                    title: 'Tezlik',
                    description: 'Tezlik tushunchasi, o\'rtacha va oniy tezlik',
                    duration: '20 min',
                    xp: 50,
                    content: {
                        theory: `# Tezlik

## Tezlik Nima?

**Tezlik** - jismning vaqt birligi ichida bosib o'tgan yo'li.

### Formula:
\`\`\`
v = s / t
\`\`\`

Bunda:
- **v** - tezlik (m/s yoki km/soat)
- **s** - yo'l (m yoki km)
- **t** - vaqt (s yoki soat)

## Tezlik Turlari

### 1. O'rtacha Tezlik
Butun yo'l davomidagi tezlik:
\`\`\`
v_o'rtacha = s_umumiy / t_umumiy
\`\`\`

### 2. Oniy Tezlik  
Ma'lum bir paytdagi tezlik (spidometr ko'rsatkichi)

## Birliklar

**SI sistemasida:** m/s (metr/sekund)
**Amaliyotda:** km/soat

**O'tkazish:**
- 1 m/s = 3.6 km/soat
- 1 km/soat = 0.28 m/s`,
                        examples: [
                            {
                                title: 'Misol 1: Tezlikni hisoblash',
                                problem: 'Velosipedchi 15 minutda 6 km yo\'l bosdi. Uning tezligini km/soat da toping.',
                                solution: `**Berilgan:**
- s = 6 km
- t = 15 min = 0.25 soat

**Yechim:**
v = s / t
v = 6 km / 0.25 soat
v = 24 km/soat

**Javob:** 24 km/soat`,
                                answer: '24 km/soat'
                            },
                            {
                                title: 'Misol 2: Birliklarni o\'tkazish',
                                problem: '72 km/soat tezlikni m/s ga o\'tkazing.',
                                solution: `**Yechim:**
v = 72 km/soat
v = 72 / 3.6 m/s
v = 20 m/s

**Javob:** 20 m/s`,
                                answer: '20 m/s'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Tezlik', formula: 'v = s / t', description: 'Tezlik = Yo\'l / Vaqt' },
                            { name: 'O\'tkazish', formula: '1 m/s = 3.6 km/soat', description: 'Birliklarni o\'tkazish' }
                        ]
                    }
                },
                {
                    id: 'mech-3',
                    title: 'Tezlanish',
                    description: 'Tezlanish tushunchasi, tekis tezlanuvchan harakat',
                    duration: '20 min',
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

Tezlanish o'zgarmas bo'lgan harakat.

### Asosiy Formulalar:

**1. Tezlik:**
\`\`\`
v = v₀ + at
\`\`\`

**2. Yo'l:**
\`\`\`
s = v₀t + (at²)/2
\`\`\`

**3. Tezlik va yo'l:**
\`\`\`
v² = v₀² + 2as
\`\`\`

## Tezlanish Turlari

- **Musbat (a > 0)** - tezlik ortadi
- **Manfiy (a < 0)** - tezlik kamayadi (sekinlanish)`,
                        examples: [
                            {
                                title: 'Misol 1: Tezlanishni topish',
                                problem: 'Avtomobil 5 sekundda 0 dan 20 m/s gacha tezlashdi. Tezlanishni toping.',
                                solution: `**Berilgan:**
- v₀ = 0 m/s
- v = 20 m/s
- t = 5 s

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

**Yechim:**
s = v₀t + (at²)/2
s = 5×10 + (2×10²)/2
s = 50 + 100
s = 150 m

**Javob:** 150 m`,
                                answer: '150 m'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Tezlanish', formula: 'a = (v - v₀) / t', description: 'Tezlanish formulasi' },
                            { name: 'Tezlik', formula: 'v = v₀ + at', description: 'Oxirgi tezlik' },
                            { name: 'Yo\'l', formula: 's = v₀t + (at²)/2', description: 'Bosib o\'tilgan yo\'l' }
                        ]
                    }
                },
                {
                    id: 'mech-4',
                    title: 'Erkin Tushish',
                    description: 'Erkin tushish harakati, tortishish tezlanishi',
                    duration: '15 min',
                    xp: 50,
                    content: {
                        theory: `# Erkin Tushish

## Erkin Tushish Nima?

**Erkin tushish** - jismning faqat og'irlik kuchi ta'sirida harakati.

### Tortishish Tezlanishi (g)

**g ≈ 10 m/s²** (Yer yuzasida)

Aniq qiymat: g = 9.8 m/s²

## Formulalar

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

## Muhim!

- Havo qarshiligi hisobga olinmaydi
- Barcha jismlar bir xil tezlanish bilan tushadi
- Jism massasi ahamiyati yo'q`,
                        examples: [
                            {
                                title: 'Misol 1: Tushish vaqti',
                                problem: 'Jism 80 m balandlikdan erkin tushmoqda. Qancha vaqtda yerga tushadi? (g=10 m/s²)',
                                solution: `**Berilgan:**
- h = 80 m
- g = 10 m/s²

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

**Yechim:**
v² = 2gh
v² = 2×10×45
v² = 900
v = 30 m/s

**Javob:** 30 m/s`,
                                answer: '30 m/s'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Tezlik', formula: 'v = gt', description: 'Erkin tushishdagi tezlik' },
                            { name: 'Balandlik', formula: 'h = (gt²)/2', description: 'Tushgan balandlik' },
                            { name: 'Tezlik-balandlik', formula: 'v² = 2gh', description: 'Tezlik va balandlik bog\'liqli gi' }
                        ]
                    }
                }
            ]
        },

        // ========================================
        // 2. ENERGIYA VA ISH
        // ========================================
        {
            id: 'energy',
            title: 'Energiya va Ish',
            description: 'Mexanik ish, quvvat, energiya turlari',
            icon: '⚡',
            color: 'yellow',
            lessons: [
                {
                    id: 'energy-1',
                    title: 'Mexanik Ish',
                    description: 'Ish tushunchasi, ish formulasi',
                    duration: '15 min',
                    xp: 50,
                    content: {
                        theory: `# Mexanik Ish

## Ish Nima?

**Mexanik ish** - kuch ta'sirida jismning ko'chishi.

### Formula:
\`\`\`
A = F × s × cos α
\`\`\`

Bunda:
- **A** - ish (J - joul)
- **F** - kuch (N - nyuton)
- **s** - ko'chish (m)
- **α** - kuch va ko'chish orasidagi burchak

## Maxsus Hollar

**1. Kuch va ko'chish bir yo'nalishda (α = 0°):**
\`\`\`
A = F × s
\`\`\`

**2. Kuch ko'chishga perpendikulyar (α = 90°):**
\`\`\`
A = 0
\`\`\`

**3. Kuch ko'chishga qarama-qarshi (α = 180°):**
\`\`\`
A = -F × s
\`\`\`

## Birlik

**SI sistemasida:** Joul (J)
1 J = 1 N × 1 m`,
                        examples: [
                            {
                                title: 'Misol 1: Gorizontal harakat',
                                problem: 'Jismni 50 N kuch bilan 10 m masofaga gorizontal siljitildi. Bajarilgan ishni toping.',
                                solution: `**Berilgan:**
- F = 50 N
- s = 10 m
- α = 0° (gorizontal)

**Yechim:**
A = F × s
A = 50 × 10
A = 500 J

**Javob:** 500 J`,
                                answer: '500 J'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Ish', formula: 'A = F × s × cos α', description: 'Mexanik ish formulasi' }
                        ]
                    }
                },
                {
                    id: 'energy-2',
                    title: 'Quvvat',
                    description: 'Quvvat tushunchasi, quvvat birliklari',
                    duration: '15 min',
                    xp: 50,
                    content: {
                        theory: `# Quvvat

## Quvvat Nima?

**Quvvat** - vaqt birligi ichida bajarilgan ish.

### Formula:
\`\`\`
P = A / t
\`\`\`

Bunda:
- **P** - quvvat (Vt - vatt)
- **A** - ish (J)
- **t** - vaqt (s)

## Birliklar

**SI sistemasida:** Vatt (Vt yoki W)
- 1 Vt = 1 J/s
- 1 kVt = 1000 Vt
- 1 MVt = 1 000 000 Vt

**Amaliyotda:** ot kuchi (hp)
- 1 hp ≈ 735 Vt

## Boshqa Formula

\`\`\`
P = F × v
\`\`\`

Bunda v - tezlik`,
                        examples: [
                            {
                                title: 'Misol: Quvvatni hisoblash',
                                problem: 'Dvigatel 10 sekundda 5000 J ish bajaradi. Uning quvvatini toping.',
                                solution: `**Berilgan:**
- A = 5000 J
- t = 10 s

**Yechim:**
P = A / t
P = 5000 / 10
P = 500 Vt

**Javob:** 500 Vt`,
                                answer: '500 Vt'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Quvvat', formula: 'P = A / t', description: 'Quvvat formulasi' },
                            { name: 'Quvvat-tezlik', formula: 'P = F × v', description: 'Quvvat va tezlik' }
                        ]
                    }
                }
            ]
        },

        // ========================================
        // 3. MOLEKULYAR FIZIKA
        // ========================================
        {
            id: 'molecular',
            title: 'Molekulyar Fizika',
            description: 'Moddaning tuzilishi va issiqlik hodisalari',
            icon: '🔬',
            color: 'purple',
            lessons: [
                {
                    id: 'mol-1',
                    title: 'Moddaning Molekulyar Tuzilishi',
                    description: 'Molekulalar, atomlar, modda holatlari',
                    duration: '15 min',
                    xp: 50,
                    content: {
                        theory: `# Moddaning Molekulyar-Kinetik Nazariyasi

## Asosiy Qoidalar

1. **Barcha moddalar molekulalardan iborat**
2. **Molekulalar doimo harakatda**
3. **Molekulalar o'zaro ta'sirlashadi**

## Modda Holatlari

### 1. Qattiq Jism
- Molekulalar qattiq bog'langan
- Shakli va hajmi o'zgarmas
- Molekulalar tebranma harakat qiladi

### 2. Suyuqlik
- Molekulalar erkin harakat qiladi
- Shakli o'zgaruvchan, hajmi doimiy
- Oqish xususiyati bor

### 3. Gaz
- Molekulalar juda erkin
- Shakli va hajmi o'zgaruvchan
- Idish hajmini to'ldiradi`,
                        examples: [
                            {
                                title: 'Misol: Modda holatlari',
                                problem: 'Suvning 3 ta holatini ayting va farqlarini tushuntiring.',
                                solution: `**Javob:**
1. **Muz (qattiq)** - molekulalar qattiq bog'langan, shakli doimiy
2. **Suv (suyuq)** - molekulalar harakatli, oqadi
3. **Bug' (gaz)** - molekulalar juda erkin, havoga tarqaladi`,
                                answer: 'Muz, Suv, Bug\''
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: []
                    }
                },
                {
                    id: 'mol-2',
                    title: 'Diffuziya',
                    description: 'Diffuziya hodisasi, molekulalarning aralashishi',
                    duration: '15 min',
                    xp: 50,
                    content: {
                        theory: `# Diffuziya

## Diffuziya Nima?

**Diffuziya** - moddalarning o'z-o'zidan aralashish hodisasi.

## Sababi

Molekulalarning issiqlik harakati tufayli yuz beradi.

## Tezlik

Diffuziya tezligi haroratga bog'liq:
- **Gazlarda** - eng tez
- **Suyuqliklarda** - o'rtacha
- **Qattiq jismlarda** - juda sekin

## Amaliy Ahamiyati

- Hid tarqalishi
- Eritma tayyorlash
- Biologik jarayonlar`,
                        examples: [
                            {
                                title: 'Misol: Diffuziya',
                                problem: 'Nima uchun issiq suvda shakar tezroq eriydi?',
                                solution: `**Javob:**
Issiq suvda molekulalar tezroq harakat qiladi, shuning uchun diffuziya tezroq bo'ladi va shakar tezroq eriydi.`,
                                answer: 'Molekulalar tezroq harakatlanadi'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: []
                    }
                }
            ]
        },

        // ========================================
        // 4. ELEKTR VA MAGNETIZM
        // ========================================
        {
            id: 'electricity',
            title: 'Elektr va Magnetizm',
            description: 'Elektr toki, zanjir, Om qonuni',
            icon: '⚡',
            color: 'cyan',
            lessons: [
                {
                    id: 'elec-1',
                    title: 'Elektr Toki',
                    description: 'Elektr toki tushunchasi, tok kuchi',
                    duration: '20 min',
                    xp: 50,
                    content: {
                        theory: `# Elektr Toki

## Elektr Toki Nima?

**Elektr toki** - zaryadlangan zarralarning tartibli harakati.

### Tok Kuchi (I)

**Formula:**
\`\`\`
I = q / t
\`\`\`

Bunda:
- **I** - tok kuchi (A - amper)
- **q** - zaryad (C - kulon)
- **t** - vaqt (s)

## Tok Yo'nalishi

**Shartli yo'nalish:** musbat zaryaddan manfiy zaryadga

**Haqiqiy yo'nalish:** elektronlar manfiydan musbatga harakat qiladi

## Birlik

**SI sistemasida:** Amper (A)
- 1 A = 1 C/s`,
                        examples: [
                            {
                                title: 'Misol: Tok kuchini hisoblash',
                                problem: 'O\'tkazgichdan 10 sekundda 20 C zaryad o\'tdi. Tok kuchini toping.',
                                solution: `**Berilgan:**
- q = 20 C
- t = 10 s

**Yechim:**
I = q / t
I = 20 / 10
I = 2 A

**Javob:** 2 A`,
                                answer: '2 A'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Tok kuchi', formula: 'I = q / t', description: 'Tok kuchi formulasi' }
                        ]
                    }
                },
                {
                    id: 'elec-2',
                    title: 'Om Qonuni',
                    description: 'Om qonuni, qarshilik, kuchlanish',
                    duration: '20 min',
                    xp: 50,
                    content: {
                        theory: `# Om Qonuni

## Om Qonuni

**Zanjir qismi uchun Om qonuni:**

\`\`\`
I = U / R
\`\`\`

Bunda:
- **I** - tok kuchi (A)
- **U** - kuchlanish (V - volt)
- **R** - qarshilik (Ω - om)

## Boshqa Formulalar

**Kuchlanish:**
\`\`\`
U = I × R
\`\`\`

**Qarshilik:**
\`\`\`
R = U / I
\`\`\`

## Birliklar

- **Kuchlanish:** Volt (V)
- **Qarshilik:** Om (Ω)
- **Tok kuchi:** Amper (A)`,
                        examples: [
                            {
                                title: 'Misol 1: Tok kuchini topish',
                                problem: 'Zanjirda kuchlanish 12 V, qarshilik 4 Ω. Tok kuchini toping.',
                                solution: `**Berilgan:**
- U = 12 V
- R = 4 Ω

**Yechim:**
I = U / R
I = 12 / 4
I = 3 A

**Javob:** 3 A`,
                                answer: '3 A'
                            },
                            {
                                title: 'Misol 2: Qarshilikni topish',
                                problem: 'Zanjirda tok kuchi 2 A, kuchlanish 10 V. Qarshilikni toping.',
                                solution: `**Berilgan:**
- I = 2 A
- U = 10 V

**Yechim:**
R = U / I
R = 10 / 2
R = 5 Ω

**Javob:** 5 Ω`,
                                answer: '5 Ω'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Om qonuni', formula: 'I = U / R', description: 'Zanjir qismi uchun Om qonuni' },
                            { name: 'Kuchlanish', formula: 'U = I × R', description: 'Kuchlanish formulasi' },
                            { name: 'Qarshilik', formula: 'R = U / I', description: 'Qarshilik formulasi' }
                        ]
                    }
                }
            ]
        },

        // ========================================
        // 5. OPTIKA
        // ========================================
        {
            id: 'optics',
            title: 'Optika',
            description: 'Yorug\'lik, qaytish, sinish, linzalar',
            icon: '🔆',
            color: 'amber',
            lessons: [
                {
                    id: 'opt-1',
                    title: 'Yorug\'likning Qaytishi',
                    description: 'Yorug\'lik qaytish qonunlari, ko\'zgu',
                    duration: '15 min',
                    xp: 50,
                    content: {
                        theory: `# Yorug'likning Qaytishi

## Qaytish Qonunlari

### 1-Qonun
Tushuvchi nur, qaytgan nur va perpendikular bir tekislikda yotadi.

### 2-Qonun
**Tushish burchagi = Qaytish burchagi**

\`\`\`
α = β
\`\`\`

## Ko'zgu Turlari

### 1. Tekis Ko'zgu
- Tasvir xayoliy
- Tasvir o'lchamlari jismga teng
- Tasvir ko'zguga nisbatan simmetrik

### 2. Sferik Ko'zgu
- **Botiq** - tasvirni kichiklashtiradi
- **Qavariq** - tasvirni kattalashtirad (ba'zan)`,
                        examples: [
                            {
                                title: 'Misol: Qaytish burchagi',
                                problem: 'Nur ko\'zguga 30° burchak ostida tushdi. Qaytish burchagini toping.',
                                solution: `**Berilgan:**
- α = 30°

**Qaytish qonuni:**
α = β

**Javob:** β = 30°`,
                                answer: '30°'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Qaytish qonuni', formula: 'α = β', description: 'Tushish va qaytish burchaklari teng' }
                        ]
                    }
                },
                {
                    id: 'opt-2',
                    title: 'Linzalar',
                    description: 'Linza turlari, fokus, tasvir',
                    duration: '20 min',
                    xp: 50,
                    content: {
                        theory: `# Linzalar

## Linza Turlari

### 1. Yig'uvchi Linza
- O'rtasi qalin
- Nurlarni yig'adi
- Haqiqiy tasvir beradi

### 2. Sochuvchi Linza
- O'rtasi yupqa
- Nurlarni sochadi
- Xayoliy tasvir beradi

## Asosiy Tushunchalar

**Fokus (F)** - nurlar yig'iladigan nuqta

**Fokus masofasi (f)** - linzadan fokusgacha masofa

**Optik kuch (D):**
\`\`\`
D = 1 / f
\`\`\`

Birlik: Dioptr (D)`,
                        examples: [
                            {
                                title: 'Misol: Optik kuch',
                                problem: 'Linzaning fokus masofasi 0.5 m. Optik kuchini toping.',
                                solution: `**Berilgan:**
- f = 0.5 m

**Yechim:**
D = 1 / f
D = 1 / 0.5
D = 2 D

**Javob:** 2 dioptr`,
                                answer: '2 D'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Optik kuch', formula: 'D = 1 / f', description: 'Linzaning optik kuchi' }
                        ]
                    }
                }
            ]
        },

        // ========================================
        // 6. ATOM FIZIKASI
        // ========================================
        {
            id: 'atomic',
            title: 'Atom Fizikasi',
            description: 'Atom tuzilishi, radioaktivlik',
            icon: '⚛️',
            color: 'green',
            lessons: [
                {
                    id: 'atom-1',
                    title: 'Atom Tuzilishi',
                    description: 'Atom modeli, yadro, elektronlar',
                    duration: '15 min',
                    xp: 50,
                    content: {
                        theory: `# Atom Tuzilishi

## Rezerford Modeli

Atom quyidagilardan iborat:

### 1. Yadro (Markazda)
- **Protonlar** - musbat zaryad (+)
- **Neytronlar** - zaryadsiz (0)
- Atom massasining 99.9% i

### 2. Elektronlar (Atrofida)
- Manfiy zaryad (-)
- Yadro atrofida aylanadi
- Juda yengil

## Atom Xossalari

**Tartib raqami (Z)** - protonlar soni

**Massa soni (A)** - protonlar + neytronlar

**Neytral atom:** protonlar = elektronlar`,
                        examples: [
                            {
                                title: 'Misol: Atom tuzilishi',
                                problem: 'Uglerod atomi 6 ta proton va 6 ta neytronga ega. Elektronlar sonini va massa sonini toping.',
                                solution: `**Berilgan:**
- Protonlar = 6
- Neytronlar = 6

**Yechim:**
- Elektronlar = Protonlar = 6 (neytral atom)
- Massa soni A = 6 + 6 = 12

**Javob:** 6 elektron, massa soni 12`,
                                answer: '6 elektron, A=12'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: [
                            { name: 'Massa soni', formula: 'A = Z + N', description: 'Protonlar + Neytronlar' }
                        ]
                    }
                },
                {
                    id: 'atom-2',
                    title: 'Radioaktivlik',
                    description: 'Radioaktiv nurlanish, alfa, beta, gamma',
                    duration: '15 min',
                    xp: 50,
                    content: {
                        theory: `# Radioaktivlik

## Radioaktivlik Nima?

**Radioaktivlik** - atom yadrolarining o'z-o'zidan parchalanishi va nurlanish chiqarishi.

## Nurlanish Turlari

### 1. Alfa (α) Nurlanish
- Geliy yadrolari
- Katta massa
- Kichik o'tish qobiliyati

### 2. Beta (β) Nurlanish
- Elektronlar
- O'rtacha o'tish qobiliyati

### 3. Gamma (γ) Nurlanish
- Elektromagnit to'lqinlar
- Katta o'tish qobiliyati
- Eng xavfli

## Qo'llanilishi

- Tibbiyot (rentgen, davolash)
- Energetika (AES)
- Ilmiy tadqiqotlar`,
                        examples: [
                            {
                                title: 'Misol: Nurlanish turlari',
                                problem: 'Qaysi nurlanish eng xavfli va nima uchun?',
                                solution: `**Javob:**
Gamma (γ) nurlanish eng xavfli, chunki:
- Eng katta o'tish qobiliyati
- Har qanday to'siqdan o'tadi
- Biologik to'qimalarga katta zarar yetkazadi`,
                                answer: 'Gamma nurlanish'
                            }
                        ],
                        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        formulas: []
                    }
                }
            ]
        }
    ]
};

// Helper funksiyalar
export function getChapterById(id) {
    return lessonsData.chapters.find(ch => ch.id === id);
}

export function getLessonById(lessonId) {
    for (const chapter of lessonsData.chapters) {
        const lesson = chapter.lessons.find(l => l.id === lessonId);
        if (lesson) return { lesson, chapter };
    }
    return null;
}

export function calculateChapterProgress(chapter, completedLessons = []) {
    const totalLessons = chapter.lessons.length;
    const completed = chapter.lessons.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completed / totalLessons) * 100);
}
