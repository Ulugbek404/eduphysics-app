// ============================================================
//  NurFizika — Formula Tarjimalari (RU + EN)
//  src/data/formulasTranslations.js
//
//  Har bir formulaning ID si bo'yicha RU va EN tarjimalari.
//  Keyingi sessiyalarda yangi bo'limlar qo'shilganda bu faylga
//  davom ettiriladi.
// ============================================================

export const FORMULA_TRANSLATIONS = {

  // ══════════════════════════════════════════
  //  KINEMATIKA  kin_001 → kin_022
  // ══════════════════════════════════════════

  kin_001: {
    nameEn: "Average Velocity",
    descRu: "При равномерном движении средняя скорость находится делением пройденного пути на затраченное время.",
    descEn: "When an object moves uniformly, average velocity is found by dividing the distance traveled by the time taken.",
    exampleRu: "Автомобиль проехал 100 м за 10 с. Скорость: v = 100 / 10 = 10 м/с",
    exampleEn: "A car travels 100 m in 10 s. Speed: v = 100 / 10 = 10 m/s"
  },

  kin_002: {
    nameEn: "Acceleration",
    descRu: "Ускорение показывает, насколько изменяется скорость тела за единицу времени. Положительное значение — ускорение, отрицательное — замедление.",
    descEn: "Acceleration shows how much the velocity changes per unit time. Positive means speeding up, negative means slowing down.",
    exampleRu: "Машина разогналась от 0 до 20 м/с за 5 с. a = (20−0)/5 = 4 м/с²",
    exampleEn: "A car accelerates from 0 to 20 m/s in 5 s. a = (20−0)/5 = 4 m/s²"
  },

  kin_003: {
    nameEn: "Uniformly Accelerated Motion (velocity)",
    descRu: "При равноускоренном движении скорость находится сложением начальной скорости и произведения ускорения на время.",
    descEn: "In uniformly accelerated motion, final velocity equals initial velocity plus acceleration times time.",
    exampleRu: "Начальная скорость 0, ускорение 4 м/с², через 5 с: v = 0 + 4·5 = 20 м/с",
    exampleEn: "Initial velocity 0, acceleration 4 m/s², after 5 s: v = 0 + 4·5 = 20 m/s"
  },

  kin_004: {
    nameEn: "Uniformly Accelerated Motion (distance)",
    descRu: "Расстояние, пройденное при равноускоренном движении, вычисляется через начальную скорость и ускорение.",
    descEn: "The distance covered in uniformly accelerated motion is calculated from initial velocity and acceleration.",
    exampleRu: "Начальная скорость 0, ускорение 4 м/с², за 5 с: s = 0·5 + (4·25)/2 = 50 м",
    exampleEn: "Initial velocity 0, acceleration 4 m/s², in 5 s: s = 0·5 + (4·25)/2 = 50 m"
  },

  kin_005: {
    nameEn: "Velocity via Path (no time)",
    descRu: "Когда время не задано, конечную скорость можно найти через начальную скорость, ускорение и расстояние.",
    descEn: "When time is not given, final velocity can be found from initial velocity, acceleration, and distance.",
    exampleRu: "v₀=0, a=4 м/с², s=50 м: v² = 0 + 2·4·50 = 400 → v = 20 м/с",
    exampleEn: "v₀=0, a=4 m/s², s=50 m: v² = 0 + 2·4·50 = 400 → v = 20 m/s"
  },

  kin_006: {
    nameEn: "Average Velocity (accelerated motion)",
    descRu: "При равноускоренном движении средняя скорость равна среднему арифметическому начальной и конечной скоростей.",
    descEn: "For uniformly accelerated motion, average velocity is the arithmetic mean of initial and final velocities.",
    exampleRu: "Машина разогналась от 0 до 20 м/с. Средняя скорость: (0+20)/2 = 10 м/с",
    exampleEn: "Car accelerated from 0 to 20 m/s. Average velocity: (0+20)/2 = 10 m/s"
  },

  kin_007: {
    nameEn: "Free Fall (velocity)",
    descRu: "Скорость тела, падающего без начальной скорости, равна произведению ускорения свободного падения на время.",
    descEn: "The velocity of a freely falling body equals gravitational acceleration times time.",
    exampleRu: "Камень падал 3 с. Скорость: v = 9.8·3 = 29.4 м/с",
    exampleEn: "A stone falls for 3 s. Velocity: v = 9.8·3 = 29.4 m/s"
  },

  kin_008: {
    nameEn: "Free Fall (height)",
    descRu: "Высота, пройденная телом при свободном падении за время t, вычисляется по данной формуле.",
    descEn: "The height covered by a freely falling body in time t is calculated using this formula.",
    exampleRu: "Тело падало 3 с. Высота: h = (9.8·9)/2 = 44.1 м",
    exampleEn: "Body falls for 3 s. Height: h = (9.8·9)/2 = 44.1 m"
  },

  kin_009: {
    nameEn: "Free Fall (velocity and height)",
    descRu: "Когда время не задано, можно найти скорость тела через высоту падения.",
    descEn: "When time is not given, velocity of a falling body can be found from the height of fall.",
    exampleRu: "h = 45 м: v = √(2·9.8·45) = √882 ≈ 29.7 м/с",
    exampleEn: "h = 45 m: v = √(2·9.8·45) = √882 ≈ 29.7 m/s"
  },

  kin_010: {
    nameEn: "Projectile Upward (max height)",
    descRu: "Тело, брошенное вертикально вверх, достигает максимальной высоты, когда его скорость становится равной нулю.",
    descEn: "A body thrown vertically upward reaches maximum height when its velocity becomes zero.",
    exampleRu: "v₀=20 м/с: H = 400/(2·9.8) = 20.4 м",
    exampleEn: "v₀=20 m/s: H = 400/(2·9.8) = 20.4 m"
  },

  kin_011: {
    nameEn: "Projectile Upward (flight time)",
    descRu: "Время подъёма равно времени падения, поэтому полное время полёта удваивается.",
    descEn: "Rise time equals fall time, so total flight time is doubled.",
    exampleRu: "v₀=20 м/с: t = 2·20/9.8 ≈ 4.08 с",
    exampleEn: "v₀=20 m/s: t = 2·20/9.8 ≈ 4.08 s"
  },

  kin_012: {
    nameEn: "Horizontal Projectile (horizontal distance)",
    descRu: "При горизонтальном броске тело движется горизонтально с постоянной скоростью — x = v₀·t.",
    descEn: "In horizontal projectile motion, the body moves horizontally at constant velocity — x = v₀·t.",
    exampleRu: "v₀=15 м/с, t=3 с: x = 15·3 = 45 м",
    exampleEn: "v₀=15 m/s, t=3 s: x = 15·3 = 45 m"
  },

  kin_013: {
    nameEn: "Horizontal Projectile (vertical distance)",
    descRu: "Вертикальное движение при горизонтальном броске аналогично свободному падению и не зависит от горизонтальной скорости.",
    descEn: "Vertical motion in horizontal projectile is identical to free fall and independent of horizontal velocity.",
    exampleRu: "t=3 с: y = (9.8·9)/2 = 44.1 м вниз",
    exampleEn: "t=3 s: y = (9.8·9)/2 = 44.1 m downward"
  },

  kin_014: {
    nameEn: "Angled Projectile (max height)",
    descRu: "Максимальная высота тела, брошенного под углом, зависит от начальной скорости и угла броска.",
    descEn: "The maximum height of an angled projectile depends on initial velocity and launch angle.",
    exampleRu: "v₀=20 м/с, α=45°: H = (400·0.5)/(2·9.8) ≈ 10.2 м",
    exampleEn: "v₀=20 m/s, α=45°: H = (400·0.5)/(2·9.8) ≈ 10.2 m"
  },

  kin_015: {
    nameEn: "Angled Projectile (range)",
    descRu: "Дальность полёта максимальна при угле 45°. При большем или меньшем угле дальность уменьшается.",
    descEn: "Range is maximum at 45°. At larger or smaller angles the range decreases.",
    exampleRu: "v₀=20 м/с, α=45°: L = 400·sin90°/9.8 ≈ 40.8 м",
    exampleEn: "v₀=20 m/s, α=45°: L = 400·sin90°/9.8 ≈ 40.8 m"
  },

  kin_016: {
    nameEn: "Angled Projectile (flight time)",
    descRu: "Время полёта тела, брошенного под углом, определяется вертикальной составляющей начальной скорости.",
    descEn: "The flight time of an angled projectile is determined by the vertical component of initial velocity.",
    exampleRu: "v₀=20 м/с, α=45°: t = 2·20·sin45°/9.8 ≈ 2.88 с",
    exampleEn: "v₀=20 m/s, α=45°: t = 2·20·sin45°/9.8 ≈ 2.88 s"
  },

  kin_017: {
    nameEn: "Circular Motion Speed",
    descRu: "При равномерном движении по окружности тело проходит полную длину окружности за один период T.",
    descEn: "In uniform circular motion, the body travels the full circumference in one period T.",
    exampleRu: "R=5 м, T=2 с: v = 2π·5/2 = 5π ≈ 15.7 м/с",
    exampleEn: "R=5 m, T=2 s: v = 2π·5/2 = 5π ≈ 15.7 m/s"
  },

  kin_018: {
    nameEn: "Centripetal Acceleration",
    descRu: "При движении по окружности тело всегда имеет ускорение, направленное к центру — центростремительное ускорение.",
    descEn: "In circular motion, the body always has acceleration directed toward the center — centripetal acceleration.",
    exampleRu: "v=10 м/с, R=5 м: a = 100/5 = 20 м/с²",
    exampleEn: "v=10 m/s, R=5 m: a = 100/5 = 20 m/s²"
  },

  kin_019: {
    nameEn: "Angular Velocity",
    descRu: "Угловая скорость показывает, сколько радиан поворачивается тело за секунду. Связана с периодом и частотой.",
    descEn: "Angular velocity shows how many radians the body rotates per second. Related to period and frequency.",
    exampleRu: "T=2 с: ω = 2π/2 = π ≈ 3.14 рад/с",
    exampleEn: "T=2 s: ω = 2π/2 = π ≈ 3.14 rad/s"
  },

  kin_020: {
    nameEn: "Linear and Angular Velocity Relation",
    descRu: "Линейная скорость равна произведению угловой скорости на радиус. Чем больше радиус, тем больше линейная скорость.",
    descEn: "Linear velocity equals angular velocity times radius. The larger the radius, the greater the linear speed.",
    exampleRu: "ω=π рад/с, R=5 м: v = π·5 ≈ 15.7 м/с",
    exampleEn: "ω=π rad/s, R=5 m: v = π·5 ≈ 15.7 m/s"
  },

  kin_021: {
    nameEn: "Period and Frequency Relation",
    descRu: "Период и частота обратно пропорциональны: при увеличении частоты период уменьшается.",
    descEn: "Period and frequency are inversely proportional: as frequency increases, period decreases.",
    exampleRu: "Мотор вращается 120 раз в минуту: f=2 Гц, T=1/2=0.5 с",
    exampleEn: "Motor rotates 120 times per minute: f=2 Hz, T=1/2=0.5 s"
  },

  kin_022: {
    nameEn: "Centripetal Force",
    descRu: "Для обеспечения кругового движения на тело должна постоянно действовать сила, направленная к центру.",
    descEn: "To maintain circular motion, a force directed toward the center must constantly act on the body.",
    exampleRu: "m=2 кг, v=10 м/с, R=5 м: F = 2·100/5 = 40 Н",
    exampleEn: "m=2 kg, v=10 m/s, R=5 m: F = 2·100/5 = 40 N"
  },

  // ══════════════════════════════════════════
  //  DINAMIKA  din_001 → din_018
  // ══════════════════════════════════════════

  din_001: {
    nameEn: "Newton's 1st Law (Inertia)",
    descRu: "Если сумма сил, действующих на тело, равна нулю, тело остаётся в покое или движется равномерно прямолинейно. Это свойство называется инерцией.",
    descEn: "If the sum of forces acting on a body is zero, the body remains at rest or moves in a straight line at constant velocity. This property is called inertia.",
    exampleRu: "Ракета в космосе продолжает лететь прямо с постоянной скоростью после выключения двигателя — сил нет.",
    exampleEn: "A rocket in space continues flying straight at constant speed after the engine is off — no forces act on it."
  },

  din_002: {
    nameEn: "Newton's 2nd Law",
    descRu: "Ускорение тела прямо пропорционально приложенной силе и обратно пропорционально его массе. Основной закон физики.",
    descEn: "The acceleration of a body is directly proportional to the applied force and inversely proportional to its mass. The fundamental law of physics.",
    exampleRu: "Тело массой 5 кг должно получить ускорение 4 м/с²: F = 5·4 = 20 Н",
    exampleEn: "A body of mass 5 kg needs acceleration of 4 m/s²: F = 5·4 = 20 N"
  },

  din_003: {
    nameEn: "Newton's 3rd Law",
    descRu: "На каждое действие существует равное и противоположно направленное противодействие. Силы всегда парные, действуют на разные тела.",
    descEn: "For every action there is an equal and opposite reaction. Forces always come in pairs, acting on different bodies.",
    exampleRu: "Ракета выбрасывает газ (действие), газ толкает ракету вперёд (противодействие). Оба равны, но противоположны.",
    exampleEn: "A rocket expels gas (action), the gas pushes the rocket forward (reaction). Both are equal but opposite."
  },

  din_004: {
    nameEn: "Gravitational Force (Weight)",
    descRu: "Земля притягивает все тела. Эта сила пропорциональна массе тела и ускорению свободного падения.",
    descEn: "The Earth attracts all bodies. This force is proportional to the mass of the body and gravitational acceleration.",
    exampleRu: "Тело массой 10 кг: F = 10·9.8 = 98 Н",
    exampleEn: "Body of mass 10 kg: F = 10·9.8 = 98 N"
  },

  din_005: {
    nameEn: "Elastic Force (Hooke's Law)",
    descRu: "По закону Гука сила упругости прямо пропорциональна деформации. Действует только в пределах упругости.",
    descEn: "According to Hooke's Law, elastic force is directly proportional to deformation. Valid only within the elastic limit.",
    exampleRu: "Пружина k=200 Н/м растянута на 5 см: F = 200·0.05 = 10 Н",
    exampleEn: "Spring k=200 N/m stretched 5 cm: F = 200·0.05 = 10 N"
  },

  din_006: {
    nameEn: "Kinetic Friction Force",
    descRu: "Сила кинетического трения — это сила, действующая на движущееся тело со стороны поверхности в противоположном направлении.",
    descEn: "Kinetic friction force acts on a moving body from the surface in the opposite direction of motion.",
    exampleRu: "μ=0.3, N=98 Н (m=10 кг на горизонтали): F = 0.3·98 = 29.4 Н",
    exampleEn: "μ=0.3, N=98 N (m=10 kg horizontal): F = 0.3·98 = 29.4 N"
  },

  din_007: {
    nameEn: "Static Friction Force",
    descRu: "Чтобы сдвинуть тело с места, приложенная сила должна превысить μ₀·N. Статический коэффициент больше кинетического.",
    descEn: "To move a body from rest, the applied force must exceed μ₀·N. Static coefficient is greater than kinetic.",
    exampleRu: "μ₀=0.4, N=98 Н: чтобы сдвинуть, нужно F > 0.4·98 = 39.2 Н",
    exampleEn: "μ₀=0.4, N=98 N: to move the body, F > 0.4·98 = 39.2 N is needed"
  },

  din_008: {
    nameEn: "Normal Force (horizontal surface)",
    descRu: "На горизонтальной поверхности нормальная реакция опоры направлена вверх и равна силе тяжести тела.",
    descEn: "On a horizontal surface, the normal force is directed upward and equals the weight of the body.",
    exampleRu: "Тело массой 10 кг на горизонтали: N = 10·9.8 = 98 Н",
    exampleEn: "Body of mass 10 kg on horizontal surface: N = 10·9.8 = 98 N"
  },

  din_009: {
    nameEn: "Normal Force (inclined plane)",
    descRu: "На наклонной плоскости нормальная реакция направлена перпендикулярно поверхности и уменьшается с ростом угла.",
    descEn: "On an inclined plane, the normal force is perpendicular to the surface and decreases as the angle increases.",
    exampleRu: "m=10 кг, α=30°: N = 10·9.8·cos30° = 84.9 Н",
    exampleEn: "m=10 kg, α=30°: N = 10·9.8·cos30° = 84.9 N"
  },

  din_010: {
    nameEn: "Inclined Plane Acceleration (frictionless)",
    descRu: "Ускорение тела на гладкой наклонной плоскости зависит только от угла и g, но не от массы.",
    descEn: "Acceleration on a smooth inclined plane depends only on the angle and g, not on mass.",
    exampleRu: "α=30° (без трения): a = 9.8·sin30° = 4.9 м/с²",
    exampleEn: "α=30° (frictionless): a = 9.8·sin30° = 4.9 m/s²"
  },

  din_011: {
    nameEn: "Inclined Plane Acceleration (with friction)",
    descRu: "На наклонной плоскости с трением ускорение находится вычитанием составляющей трения из составляющей тяжести.",
    descEn: "On an inclined plane with friction, acceleration is found by subtracting the friction component from the gravity component.",
    exampleRu: "α=30°, μ=0.2: a = 9.8·(0.5−0.2·0.866) = 3.2 м/с²",
    exampleEn: "α=30°, μ=0.2: a = 9.8·(0.5−0.2·0.866) = 3.2 m/s²"
  },

  din_012: {
    nameEn: "Atwood Machine Acceleration",
    descRu: "В машине Атвуда два тела соединены нитью через блок. Ускорение зависит от разности и суммы их масс.",
    descEn: "In an Atwood machine, two bodies are connected by a string over a pulley. Acceleration depends on the difference and sum of their masses.",
    exampleRu: "m₁=6 кг, m₂=4 кг: a = 9.8·(6−4)/(6+4) = 1.96 м/с²",
    exampleEn: "m₁=6 kg, m₂=4 kg: a = 9.8·(6−4)/(6+4) = 1.96 m/s²"
  },

  din_013: {
    nameEn: "Newton's Law of Universal Gravitation",
    descRu: "Любые два тела притягиваются с силой, прямо пропорциональной произведению их масс и обратно пропорциональной квадрату расстояния между ними.",
    descEn: "Any two bodies attract each other with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them.",
    exampleRu: "Земля (5.97×10²⁴ кг) притягивает человека 80 кг: F = G·M·m/R² ≈ 784 Н",
    exampleEn: "Earth (5.97×10²⁴ kg) attracts a person of 80 kg: F = G·M·m/R² ≈ 784 N"
  },

  din_014: {
    nameEn: "Gravitational Acceleration on a Planet",
    descRu: "Ускорение свободного падения разное на разных планетах. На Земле ≈9.8, на Луне ≈1.62, на Марсе ≈3.72 м/с².",
    descEn: "Gravitational acceleration differs on different planets. On Earth ≈9.8, on Moon ≈1.62, on Mars ≈3.72 m/s².",
    exampleRu: "Земля: M=5.97×10²⁴ кг, R=6.371×10⁶ м → g ≈ 9.8 м/с²",
    exampleEn: "Earth: M=5.97×10²⁴ kg, R=6.371×10⁶ m → g ≈ 9.8 m/s²"
  },

  din_015: {
    nameEn: "First Cosmic Velocity",
    descRu: "Первая космическая скорость — минимальная скорость для орбитального полёта вблизи поверхности планеты. Для Земли ≈7.9 км/с.",
    descEn: "The first cosmic velocity is the minimum speed for orbital flight near a planet's surface. For Earth ≈7.9 km/s.",
    exampleRu: "Земля R=6.371×10⁶ м: v₁ = √(9.8·6.371×10⁶) ≈ 7900 м/с",
    exampleEn: "Earth R=6.371×10⁶ m: v₁ = √(9.8·6.371×10⁶) ≈ 7900 m/s"
  },

  din_016: {
    nameEn: "Satellite Orbital Period",
    descRu: "Период обращения спутника основан на третьем законе Кеплера. Чем больше орбитальный радиус, тем длиннее период.",
    descEn: "Satellite orbital period is based on Kepler's third law. The larger the orbital radius, the longer the period.",
    exampleRu: "R=6.371×10⁶ м, M=5.97×10²⁴ кг: T ≈ 5060 с ≈ 84 мин",
    exampleEn: "R=6.371×10⁶ m, M=5.97×10²⁴ kg: T ≈ 5060 s ≈ 84 min"
  },

  din_017: {
    nameEn: "Weightlessness",
    descRu: "Невесомость наступает, когда тело получает ускорение, равное g. В этом случае реакция опоры N=0.",
    descEn: "Weightlessness occurs when a body gains acceleration equal to g. In this case, the normal force N=0.",
    exampleRu: "Лифт в свободном падении (a=g=9.8 м/с²): N = m(g−a) = 0 — невесомость!",
    exampleEn: "Elevator in free fall (a=g=9.8 m/s²): N = m(g−a) = 0 — weightlessness!"
  },

  din_018: {
    nameEn: "Apparent Weight (Elevator Effect)",
    descRu: "В лифте, движущемся вверх с ускорением, вес увеличивается. При движении вниз — уменьшается. При a=g наступает невесомость.",
    descEn: "In an elevator accelerating upward, apparent weight increases. Moving downward, it decreases. At a=g, weightlessness occurs.",
    exampleRu: "m=70 кг, лифт поднимается с a=2 м/с²: N = 70·(9.8+2) = 826 Н (вместо 686 Н)",
    exampleEn: "m=70 kg, elevator rises at a=2 m/s²: N = 70·(9.8+2) = 826 N (instead of 686 N)"
  },
  // ══════════════════════════════════════════
  //  ISH, QUVVAT, ENERGIYA  ish_001 → ish_016
  // ══════════════════════════════════════════

  ish_001: {
    nameEn: "Mechanical Work",
    descRu: "Механическая работа равна произведению силы на перемещение и косинус угла между ними. Если угол 90°, работа равна нулю.",
    descEn: "Mechanical work is the product of force, displacement, and the cosine of the angle between them. If the angle is 90°, work is zero.",
    exampleRu: "Сила 50 Н переместила тело на 10 м (α=0°). A = 50·10·cos0° = 500 Дж",
    exampleEn: "Force of 50 N moved a body 10 m (α=0°). A = 50·10·cos0° = 500 J"
  },

  ish_002: {
    nameEn: "Work against Gravity",
    descRu: "При равномерном поднятии тела вертикально вверх работа равна изменению его потенциальной энергии.",
    descEn: "When lifting a body vertically at constant speed, work equals the change in its potential energy.",
    exampleRu: "Поднятие 10 кг на 5 м: A = 10·9.8·5 = 490 Дж",
    exampleEn: "Lifting 10 kg by 5 m: A = 10·9.8·5 = 490 J"
  },

  ish_003: {
    nameEn: "Power",
    descRu: "Мощность — это скорость выполнения работы. Показывает, какая работа выполняется за единицу времени.",
    descEn: "Power is the rate at which work is done. It shows how much work is performed per unit of time.",
    exampleRu: "Двигатель выполнил 1000 Дж за 10 с. P = 1000 / 10 = 100 Вт",
    exampleEn: "Engine did 1000 J of work in 10 s. P = 1000 / 10 = 100 W"
  },

  ish_004: {
    nameEn: "Power via Velocity",
    descRu: "Мощность механизма равна произведению силы тяги на скорость. При постоянной мощности повышение скорости уменьшает силу тяги.",
    descEn: "The power of a mechanism equals the product of traction force and velocity. At constant power, higher speed means less pulling force.",
    exampleRu: "Авто едет 25 м/с, преодолевая 200 Н сопротивления: P = 200·25 = 5000 Вт = 5 кВт",
    exampleEn: "Car drives 25 m/s overcoming 200 N drag: P = 200·25 = 5000 W = 5 kW"
  },

  ish_005: {
    nameEn: "Kinetic Energy",
    descRu: "Кинетическая энергия характеризует способность движущегося тела совершить работу. При увеличении скорости в 2 раза энергия растет в 4 раза.",
    descEn: "Kinetic energy indicates a moving body's ability to do work. If speed doubles, kinetic energy quadruples.",
    exampleRu: "Автомобиль массой 1000 кг едет при 20 м/с: Ek = 1000·400 / 2 = 200000 Дж = 200 кДж",
    exampleEn: "Car of 1000 kg driving at 20 m/s: Ek = 1000·400 / 2 = 200000 J = 200 kJ"
  },

  ish_006: {
    nameEn: "Potential Energy (Gravity)",
    descRu: "Тело, поднятое на высоту в гравитационном поле, обладает потенциальной энергией.",
    descEn: "A body raised to a height in a gravitational field possesses potential energy.",
    exampleRu: "Камень 50 кг на высоте 10 м: Ep = 50·9.8·10 = 4900 Дж",
    exampleEn: "50 kg stone at 10 m height: Ep = 50·9.8·10 = 4900 J"
  },

  ish_007: {
    nameEn: "Elastic Potential Energy",
    descRu: "Способность растянутой или сжатой пружины совершить работу за счёт силы упругости.",
    descEn: "The ability of a stretched or compressed spring to do work due to elastic force.",
    exampleRu: "Пружина k=200 Н/м растянута на 10 см: Ep = 200·0.01 / 2 = 1 Дж",
    exampleEn: "Spring k=200 N/m stretched 10 cm: Ep = 200·0.01 / 2 = 1 J"
  },

  ish_008: {
    nameEn: "Conservation of Mechanical Energy",
    descRu: "В замкнутой системе без трения сумма кинетической и потенциальной энергии остаётся постоянной. Они переходят друг в друга.",
    descEn: "In a closed frictionless system, the sum of kinetic and potential energy remains constant. They transform into each other.",
    exampleRu: "В начале Ep=500 Дж, Ek=0. В середине падения Ep=200 Дж, значит Ek=300 Дж.",
    exampleEn: "Initially Ep=500 J, Ek=0. Mid-fall Ep=200 J, so kinetic must be Ek=300 J."
  },

  ish_009: {
    nameEn: "Work-Energy Theorem",
    descRu: "Работа равнодействующей всех сил, приложенных к телу, равна изменению его кинетической энергии.",
    descEn: "The net work done by all forces acting on a body equals the change in its kinetic energy.",
    exampleRu: "Энергия выросла с 500 до 1200 Дж. Выполненная работа A = 1200 - 500 = 700 Дж",
    exampleEn: "Energy grew from 500 to 1200 J. Work done A = 1200 - 500 = 700 J"
  },

  ish_010: {
    nameEn: "Work of Friction Force",
    descRu: "Сила трения направлена против движения, поэтому её работа всегда отрицательна. Она превращает механическую энергию в тепло.",
    descEn: "Friction opposes motion, so its work is always negative. It converts mechanical energy into heat.",
    exampleRu: "Сила трения 30 Н на пути 10 м: A = -30·10 = -300 Дж",
    exampleEn: "Friction of 30 N over 10 m path: A = -30·10 = -300 J"
  },

  ish_011: {
    nameEn: "Efficiency (Mechanical)",
    descRu: "КПД показывает, какая часть затраченной энергии пошла на полезную работу. Всегда меньше 100%.",
    descEn: "Efficiency shows what part of expended energy went into useful work. Always less than 100%.",
    exampleRu: "Затрачено 1000 Дж, полезная работа 800 Дж. η = 800/1000 = 80%",
    exampleEn: "Expended 1000 J, useful work 800 J. η = 800/1000 = 80%"
  },

  ish_012: {
    nameEn: "Efficiency of Inclined Plane",
    descRu: "При поднятии груза по наклонной плоскости полезной работой является mgh, а затраченной — работа тяги F·l.",
    descEn: "When lifting a load on an inclined plane, mgh is useful work, and pulling work F·l is expended work.",
    exampleRu: "Груз 10 кг поднят на 2 м по плоскости 4 м силой 60 Н: η = (98·2)/(60·4) ≈ 81.6%",
    exampleEn: "10 kg load lifted 2 m along a 4 m plane with 60 N force: η = (98·2)/(60·4) ≈ 81.6%"
  },

  ish_013: {
    nameEn: "Efficiency of Pulley System",
    descRu: "Используя простые механизмы, мы выигрываем в силе, проигрывая в расстоянии (золотое правило механизмов).",
    descEn: "Using simple machines, we gain in force but lose in distance (golden rule of mechanics).",
    exampleRu: "Груз 1000 Н поднят на 1 м. Веревка вытянута на 2 м силой 550 Н. η = 1000/1100 ≈ 90.9%",
    exampleEn: "1000 N load lifted 1 m. Rope pulled 2 m with 550 N force. η = 1000/1100 ≈ 90.9%"
  },

  ish_014: {
    nameEn: "Energy Transformation with Friction",
    descRu: "Если в системе есть трение, полная механическая энергия уменьшается — её часть переходит во внутреннюю энергию (тепло).",
    descEn: "If there is friction in a system, total mechanical energy decreases — a part of it transfers to internal energy (heat).",
    exampleRu: "Было 1000 Дж, стало 800 Дж. Значит, 200 Дж потерялось на сопротивление среды.",
    exampleEn: "Started with 1000 J, ended with 800 J. Thus, 200 J was lost to resistance."
  },

  ish_015: {
    nameEn: "Work of Gravity",
    descRu: "Работа силы тяжести не зависит от формы траектории, а зависит лишь от начальной и конечной высоты. Равна убыли потенциальной энергии.",
    descEn: "Work done by gravity depends only on initial and final height, not on the path's shape. It equals the loss of potential energy.",
    exampleRu: "Камень 5 кг упал с 10 м до 2 м: A = 5·9.8·(10-2) = 392 Дж",
    exampleEn: "5 kg stone fell from 10 m to 2 m: A = 5·9.8·(10-2) = 392 J"
  },

  ish_016: {
    nameEn: "Total Mechanical Energy",
    descRu: "Полная механическая энергия тела есть сумма его кинетической и потенциальной энергий в данный момент времени.",
    descEn: "Total mechanical energy of a body is the sum of its kinetic and potential energies at a given moment.",
    exampleRu: "У самолёта кинетическая энергия 120 МДж, потенциальная 300 МДж. Полная E = 420 МДж.",
    exampleEn: "Airplane has 120 MJ kinetic, 300 MJ potential energy. Total E = 420 MJ."
  },

  // ══════════════════════════════════════════
  //  IMPULS VA STATIKA  imp_001 → imp_012
  // ══════════════════════════════════════════

  imp_001: {
    nameEn: "Momentum",
    descRu: "Импульс тела — это векторная физическая величина, равная произведению массы тела на его скорость. Направление совпадает со скоростью.",
    descEn: "Momentum is a vector physical quantity equal to the product of a body's mass and its velocity. Its direction coincides with velocity.",
    exampleRu: "Камень массой 10 кг летит со скоростью 5 м/с. Импульс p = 10 · 5 = 50 кг·м/с",
    exampleEn: "A 10 kg stone flies at 5 m/s. Momentum p = 10 · 5 = 50 kg·m/s"
  },

  imp_002: {
    nameEn: "Impulse",
    descRu: "Импульс силы равен произведению силы на время её действия. Он равен изменению импульса тела (Второй закон Ньютона в импульсной форме).",
    descEn: "The impulse of a force is the product of the force and its action time. It equals the change in the body's momentum (Newton's 2nd Law in impulse form).",
    exampleRu: "Сила 100 Н действовала 0.5 с. Изменение импульса Δp = 100 · 0.5 = 50 кг·м/с.",
    exampleEn: "A 100 N force acted for 0.5 s. Change in momentum Δp = 100 · 0.5 = 50 kg·m/s"
  },

  imp_003: {
    nameEn: "Law of Conservation of Momentum",
    descRu: "В замкнутой системе геометрическая сумма импульсов всех тел остаётся постоянной при любых их взаимодействиях.",
    descEn: "In a closed system, the geometric sum of the momenta of all bodies remains constant during any of their interactions.",
    exampleRu: "До столкновения двух тел общий импульс был 200, после столкновения он также равен 200.",
    exampleEn: "Before collision, total momentum was 200, after collision it continues to be 200."
  },

  imp_004: {
    nameEn: "Perfectly Elastic Collision",
    descRu: "При абсолютно упругом ударе сохраняется и импульс, и кинетическая энергия системы.",
    descEn: "In a perfectly elastic collision, both momentum and kinetic energy of the system are conserved.",
    exampleRu: "Шар 2 кг со 10 м/с бьет в покоящийся шар 3 кг. Скорость: v₁' = (2-3)/(2+3) · 10 = -2 м/s (отскакивает).",
    exampleEn: "A 2 kg ball at 10 m/s hits a resting 3 kg ball. Velocity: v₁' = (2-3)/(2+3) · 10 = -2 m/s (bounces back)."
  },

  imp_005: {
    nameEn: "Perfectly Inelastic Collision",
    descRu: "При неупругом ударе тела соединяются (слипаются) и движутся дальше вместе. Часть кинетической энергии переходит в тепло.",
    descEn: "In an inelastic collision, the bodies stick together and move as one. A part of kinetic energy converts into heat.",
    exampleRu: "Камень 5 кг на 4 м/с упал в тележку 3 кг (покой): v' = (5·4 + 0) / 8 = 2.5 м/с",
    exampleEn: "A 5 kg stone at 4 m/s hits a resting 3 kg cart: v' = (5·4 + 0) / 8 = 2.5 m/s"
  },

  imp_006: {
    nameEn: "Rocket Equation (Tsiolkovsky)",
    descRu: "Скорость ракеты зависит от скорости истечения газов и натурального логарифма отношения начальной массы к конечной.",
    descEn: "Rocket speed depends on the exhaust gas velocity and the natural logarithm of the initial to final mass ratio.",
    exampleRu: "Скорость газа 3000 м/с, масса уменьшилась в 5 раз: v = 3000 · ln(5) ≈ 4828 м/с",
    exampleEn: "Gas speed 3000 m/s, mass decreased 5 times: v = 3000 · ln(5) ≈ 4828 m/s"
  },

  imp_007: {
    nameEn: "Reactive Motion",
    descRu: "Реактивное движение возникает, когда от тела отделяется и движется его часть с некоторой скоростью. Осьновано на сохранении импульса.",
    descEn: "Reactive motion occurs when a part of a body separates and moves away at some speed. Based on momentum conservation.",
    exampleRu: "От 100 кг ракеты отделилось 10 кг газа со скоростью 500 м/с. Скорость ракеты: v = (10·500)/100 = 50 м/с.",
    exampleEn: "10 kg gas left a 100 kg rocket at 500 m/s. Rocket speed: v = (10·500)/100 = 50 m/s"
  },

  imp_008: {
    nameEn: "First Condition of Equilibrium",
    descRu: "Для того чтобы тело находилось в покое или двигалось равномерно, векторная сумма всех действующих на него сил должна быть равна нулю.",
    descEn: "For a body to be at rest or move uniformly, the vector sum of all forces acting on it must be zero.",
    exampleRu: "Вверх действует 50 Н и вниз 50 Н — сумма ноль, тело в покое.",
    exampleEn: "Upward force 50 N and downward 50 N — sum is zero, body is at rest."
  },

  imp_009: {
    nameEn: "Rule of Moments (2nd Condition)",
    descRu: "Чтобы тело, имеющее ось вращения, находилось в равновесии, сумма моментов сил, вращающих его по часовой стрелке, должна равняться сумме моментов сил против часовой.",
    descEn: "For a body with an axis of rotation to be in equilibrium, the sum of clockwise torques must equal the sum of counterclockwise torques.",
    exampleRu: "Слева момент 100 Н·м и справа 100 Н·м — вращения нет.",
    exampleEn: "Left torque is 100 N·m and right is 100 N·m — no rotation."
  },

  imp_010: {
    nameEn: "Moment of Force (Torque)",
    descRu: "Момент силы характеризует вращающее действие силы и равен произведению силы на плечо (кратчайшее расстояние от оси до линии действия).",
    descEn: "Torque characterizes the rotational effect of a force and equals the product of force and the lever arm (shortest distance from the axis to the line of action).",
    exampleRu: "Тянем за ручку двери (20 Н) на расстоянии 0.5 м от петель. Момент: M = 20 · 0.5 = 10 Н·м",
    exampleEn: "Pulling a door handle (20 N) at 0.5 m from hinges. Torque: M = 20 · 0.5 = 10 N·m"
  },

  imp_011: {
    nameEn: "Law of the Lever",
    descRu: "Рычаг находится в равновесии, если действующие на него силы обратно пропорциональны их плечам.",
    descEn: "A lever is in equilibrium if the applied forces are inversely proportional to their lever arms.",
    exampleRu: "Камень требует 100 Н на плече 2 м. С плечом 0.5 м нужно применить силу 400 Н.",
    exampleEn: "A stone needs 100 N on a 2 m arm. With a 0.5 m arm, 400 N force must be applied."
  },

  imp_012: {
    nameEn: "Center of Mass / Gravity",
    descRu: "Центр тяжести системы — это точка, координаты которой рассчитываются как средневзвешенное значение координат всех частей системы.",
    descEn: "The center of mass of a system is a point whose coordinates are calculated as the weighted average of the coordinates of all system parts.",
    exampleRu: "Камень 2 кг на x=0 и 8 кг на x=10 м. Центр масс: x_c = (2·0 + 8·10)/10 = 8 м.",
    exampleEn: "2 kg stone at x=0 and 8 kg at x=10 m. Center of mass: x_c = (2·0 + 8·10)/10 = 8 m."
  },

  // ══════════════════════════════════════════
  //  TEBRANISHLAR VA TO'LQINLAR (teb_001 → teb_015)
  // ══════════════════════════════════════════

  teb_001: {
    nameEn: "Harmonic Oscillation Equation",
    descRu: "Гармоническими называются колебания, при которых физическая величина изменяется с течением времени по закону синуса или косинуса.",
    descEn: "Harmonic oscillations are those in which a physical quantity changes over time according to a sine or cosine law.",
    exampleRu: "Амплитуда 2 м, ω=3.14, t=1 с, φ₀=0. x = 2·cos(3.14) = -2 м.",
    exampleEn: "Amplitude 2 m, ω=3.14, t=1 s, φ₀=0. x = 2·cos(3.14) = -2 m."
  },

  teb_002: {
    nameEn: "Period of Oscillation",
    descRu: "Период колебаний — это время, за которое совершается одно полное колебание. Величина, обратная частоте.",
    descEn: "The period of oscillation is the time taken for one complete cycle. It is the reciprocal of frequency.",
    exampleRu: "Частота 50 Гц. Период T = 1 / 50 = 0.02 с.",
    exampleEn: "Frequency 50 Hz. Period T = 1 / 50 = 0.02 s."
  },

  teb_003: {
    nameEn: "Angular (Cyclic) Frequency",
    descRu: "Циклическая частота показывает число колебаний, совершаемых за 2π секунд.",
    descEn: "Angular frequency indicates the number of oscillations performed in 2π seconds.",
    exampleRu: "Частота 5 Гц. Циклическая частота ω = 2·3.14·5 ≈ 31.4 рад/с.",
    exampleEn: "Frequency 5 Hz. Angular frequency ω = 2·3.14·5 ≈ 31.4 rad/s."
  },

  teb_004: {
    nameEn: "Period of a Simple Pendulum",
    descRu: "Период математического маятника зависит только от длины нити и ускорения свободного падения.",
    descEn: "The period of a simple pendulum depends only on the string's length and gravitational acceleration.",
    exampleRu: "Маятник длиной 1 м: T = 2π·√(1/9.8) ≈ 2.0 с.",
    exampleEn: "Pendulum 1 m long: T = 2π·√(1/9.8) ≈ 2.0 s."
  },

  teb_005: {
    nameEn: "Period of a Spring Pendulum",
    descRu: "Период пружинного маятника зависит от массы груза и жесткости пружины.",
    descEn: "The period of a spring pendulum depends on the mass of the load and the stiffness of the spring.",
    exampleRu: "Масса 2 кг, жесткость 50 Н/м: T = 2π·√(2/50) ≈ 1.25 с.",
    exampleEn: "Mass 2 kg, stiffness 50 N/m: T = 2π·√(2/50) ≈ 1.25 s."
  },

  teb_006: {
    nameEn: "Maximum Velocity in Oscillation",
    descRu: "Максимальная скорость достигается телом при прохождении положения равновесия.",
    descEn: "Maximum velocity is reached when the oscillating body passes through the equilibrium position.",
    exampleRu: "Амплитуда 0.5 м, ω=6.28 рад/с: v_max = 0.5 · 6.28 = 3.14 м/с.",
    exampleEn: "Amplitude 0.5 m, ω=6.28 rad/s: v_max = 0.5 · 6.28 = 3.14 m/s."
  },

  teb_007: {
    nameEn: "Maximum Acceleration in Oscillation",
    descRu: "Ускорение при гармонических колебаниях достигает максимума в крайних точках амплитуды.",
    descEn: "Acceleration in harmonic oscillations reaches its maximum at the extreme points of the amplitude.",
    exampleRu: "Амплитуда 0.5 м, ω=3.14 рад/с: a_max = 0.5 · (3.14)² ≈ 4.93 м/с².",
    exampleEn: "Amplitude 0.5 m, ω=3.14 rad/s: a_max = 0.5 · (3.14)² ≈ 4.93 m/s²."
  },

  teb_008: {
    nameEn: "Energy of Oscillation",
    descRu: "Полная механическая энергия гармонических колебаний пропорциональна квадрату амплитуды.",
    descEn: "Total mechanical energy of harmonic oscillations is proportional to the square of the amplitude.",
    exampleRu: "Жесткость 200 Н/м, амплитуда 0.1 м. E = 200 · 0.01 / 2 = 1 Дж.",
    exampleEn: "Stiffness 200 N/m, amplitude 0.1 m. E = 200 · 0.01 / 2 = 1 J."
  },

  teb_009: {
    nameEn: "Condition for Resonance",
    descRu: "Явление резкого возрастания амплитуды при совпадении частоты внешней силы с собственной частотой системы.",
    descEn: "Resonance is the sharp increase in amplitude when the external force frequency matches the system's natural frequency.",
    exampleRu: "Собственная частота 2 Гц, внешняя сила действует с частотой 2 Гц — резонанс.",
    exampleEn: "Natural frequency 2 Hz, external force acts at 2 Hz — resonance."
  },

  teb_010: {
    nameEn: "Amplitude of Forced Oscillations",
    descRu: "Амплитуда вынужденных колебаний зависит от амплитуды внешней силы и разности квадратов частот.",
    descEn: "The amplitude of forced oscillations depends on the external force amplitude and the difference between squared frequencies.",
    exampleRu: "Приближение частот к совпадению делает знаменатель минимальным, а амплитуду — максимальной.",
    exampleEn: "As frequencies match, the denominator is localized minimzed, making amplitude maximum."
  },

  teb_011: {
    nameEn: "Wave Propagation Speed",
    descRu: "Скорость волны равна произведению длины волны на её частоту.",
    descEn: "Wave speed is equal to the product of its wavelength and its frequency.",
    exampleRu: "Длина волны 2 м, частота 50 Гц. Скорость v = 2 · 50 = 100 м/с.",
    exampleEn: "Wavelength 2 m, frequency 50 Hz. Speed v = 2 · 50 = 100 m/s."
  },

  teb_012: {
    nameEn: "Wavelength",
    descRu: "Длина волны — это расстояние, на которое распространяется волна за один период колебаний.",
    descEn: "Wavelength is the distance over which the wave travels during one period of oscillation.",
    exampleRu: "Скорость звука 340 м/с, период 0.01 с. λ = 340 · 0.01 = 3.4 м.",
    exampleEn: "Speed of sound 340 m/s, period 0.01 s. λ = 340 · 0.01 = 3.4 m."
  },

  teb_013: {
    nameEn: "Traveling Wave Equation",
    descRu: "Уравнение бегущей волны описывает смещение любой частицы среды в зависимости от её координаты и времени.",
    descEn: "The traveling wave equation describes the displacement of any particle in the medium as a function of space and time.",
    exampleRu: "x=2, t=1. Подставляем в синус и вычисляем фазу в радианах.",
    exampleEn: "x=2, t=1. Substitute into the sine to calculate the phase in radians."
  },

  teb_014: {
    nameEn: "Wave Number",
    descRu: "Волновое число обозначает пространственную частоту — сколько волн укладывается на отрезке 2π метров.",
    descEn: "Wave number indicates spatial frequency — how many waves fit into a 2π meter interval.",
    exampleRu: "Если длина волны 3.14 м, то k = 6.28 / 3.14 ≈ 2 рад/м.",
    exampleEn: "If wavelength is 3.14 m, then k = 6.28 / 3.14 ≈ 2 rad/m."
  },

  teb_015: {
    nameEn: "Sound Intensity",
    descRu: "Интенсивность звука — это энергия, переносимая звуковой волной за единицу времени через единичную площадку.",
    descEn: "Sound intensity is the energy carried by a sound wave per unit area per unit time.",
    exampleRu: "Мощность 100 Вт падает на площадь 10 м². I = 100 / 10 = 10 Вт/м².",
    exampleEn: "Power 100 W falls on an area of 10 m². I = 100 / 10 = 10 W/m²."
  },

  // ══════════════════════════════════════════
  //  MOLEKULYAR FIZIKA (mol_001 → mol_018)
  // ══════════════════════════════════════════

  mol_001: {
    nameEn: "Molar Mass",
    descRu: "Молярная масса — это масса одного моля данного вещества. Численно равна относительной молекулярной массе.",
    descEn: "Molar mass is the mass of one mole of a given substance. It is numerically equal to the relative molecular mass.",
    exampleRu: "Масса воды m=0.036 кг, количество ν=2 моль. M = 0.036 / 2 = 0.018 кг/моль.",
    exampleEn: "Mass of water m=0.036 kg, amount ν=2 mol. M = 0.036 / 2 = 0.018 kg/mol."
  },

  mol_002: {
    nameEn: "Amount of Substance (Moles)",
    descRu: "Количество вещества определяется отношением числа частиц к числу Авогадро (или массы к молярной массе).",
    descEn: "The amount of substance is defined as the ratio of the number of particles to Avogadro's number (or mass to molar mass).",
    exampleRu: "Если N = 12.04×10²³, то ν = (12.04·10²³) / (6.02·10²³) = 2 моль.",
    exampleEn: "If N = 12.04×10²³, then ν = (12.04·10²³) / (6.02·10²³) = 2 mol."
  },

  mol_003: {
    nameEn: "Number of Particles",
    descRu: "Общее число молекул или атомов в веществе можно найти, умножив количество вещества на число Авогадро.",
    descEn: "The total number of molecules or atoms in a substance can be found by multiplying the amount in moles by Avogadro's number.",
    exampleRu: "В 3 молях кислорода: N = 3 · 6.02·10²³ ≈ 18.06·10²³ частиц.",
    exampleEn: "In 3 moles of oxygen: N = 3 · 6.02·10²³ ≈ 18.06·10²³ particles."
  },

  mol_004: {
    nameEn: "Basic Equation of Kinetic Theory",
    descRu: "Давление идеального газа обусловлено ударами молекул о стенки и зависит от концентрации и кинетической энергии.",
    descEn: "The pressure of an ideal gas is caused by molecules hitting the walls and depends on concentration and kinetic energy.",
    exampleRu: "При n = 10²⁵ м⁻³ и энергии E = 5·10⁻²¹ Дж, давление P = (2/3)·10²⁵·5·10⁻²¹ ≈ 33333 Па.",
    exampleEn: "With n = 10²⁵ m⁻³ and E = 5·10⁻²¹ J, pressure P = (2/3)·10²⁵·5·10⁻²¹ ≈ 33333 Pa."
  },

  mol_005: {
    nameEn: "Ideal Gas Law (Mendeleev-Clapeyron)",
    descRu: "Основное уравнение состояния идеального газа, связывающее макроскопические параметры: давление, объем, температуру.",
    descEn: "The fundamental equation of state for an ideal gas relating macroscopic parameters: pressure, volume, and temperature.",
    exampleRu: "ν=2 моль, T=300 К, V=0.1 м³. P = (2·8.31·300) / 0.1 = 49860 Па.",
    exampleEn: "ν=2 mol, T=300 K, V=0.1 m³. P = (2·8.31·300) / 0.1 = 49860 Pa."
  },

  mol_006: {
    nameEn: "Pressure via Concentration",
    descRu: "Давление газа прямо пропорционально его концентрации и абсолютной температуре.",
    descEn: "The pressure of a gas is directly proportional to its concentration and absolute temperature.",
    exampleRu: "При нормальных условиях T=273 К и n≈2.68·10²⁵ м⁻³, P ≈ 101325 Па.",
    exampleEn: "At standard conditions T=273 K and n≈2.68·10²⁵ m⁻³, P ≈ 101325 Pa."
  },

  mol_007: {
    nameEn: "Concentration",
    descRu: "Концентрация молекул — это число частиц, содержащихся в единице объема газа.",
    descEn: "The number density (concentration) is the number of particles contained in a unit volume of gas.",
    exampleRu: "В объеме 0.5 м³ находится 10⁷ молекул, концентрация n = 2·10⁷ м⁻³.",
    exampleEn: "In a 0.5 m³ volume there are 10⁷ molecules, concentration n = 2·10⁷ m⁻³."
  },

  mol_008: {
    nameEn: "Boyle-Mariotte Law (Isothermal)",
    descRu: "При изотермическом процессе (постоянная температура) произведение давления на объем остается неизменным.",
    descEn: "In an isothermal process (constant temperature), the product of pressure and volume remains strictly constant.",
    exampleRu: "Если объем уменьшить вдвое при постоянной температуре, давление возрастет в два раза.",
    exampleEn: "If the volume is halved at constant temperature, the pressure doubles."
  },

  mol_009: {
    nameEn: "Charles's Law (Isochoric)",
    descRu: "При изохорном процессе (объем постоянный) давление идеального газа прямо пропорционально его температуре.",
    descEn: "In an isochoric process (constant volume), the pressure of an ideal gas is directly proportional to its temperature.",
    exampleRu: "Нагрев газа с 300 К до 600 К удвоит его давление в закрытом баллоне.",
    exampleEn: "Heating a gas from 300 K to 600 K will double its pressure in a sealed tank."
  },

  mol_010: {
    nameEn: "Gay-Lussac's Law (Isobaric)",
    descRu: "При изобарном процессе (постоянное давление) объем идеального газа прямо пропорционален абсолютной температуре.",
    descEn: "In an isobaric process (constant pressure), the volume of an ideal gas is directly proportional to absolute temperature.",
    exampleRu: "Нагрев под свободно движущимся поршнем увеличивает объем пропорционально температуре.",
    exampleEn: "Heating under a freely moving piston increases the volume proportionally to the temperature."
  },

  mol_011: {
    nameEn: "Combined Gas Law",
    descRu: "Для данной массы газа отношение произведения давления и объема к температуре остается постоянным.",
    descEn: "For a given mass of gas, the ratio of the product of pressure and volume to temperature remains constant.",
    exampleRu: "Используется для расчетов, когда меняются все три термодинамических параметра.",
    exampleEn: "Used for calculations when all three thermodynamic parameters change."
  },

  mol_012: {
    nameEn: "Average Kinetic Energy",
    descRu: "Средняя кинетическая энергия поступательного движения молекул газа зависит только от абсолютной температуры.",
    descEn: "The average translational kinetic energy of gas molecules depends only on absolute temperature.",
    exampleRu: "При T=300К энергия одной молекулы E ≈ 1.5 · 1.38·10⁻²³ · 300 ≈ 6.21·10⁻²¹ Дж.",
    exampleEn: "At T=300K, energy of one molecule is E ≈ 1.5 · 1.38·10⁻²³ · 300 ≈ 6.21·10⁻²¹ J."
  },

  mol_013: {
    nameEn: "Root-Mean-Square Speed",
    descRu: "Среднеквадратичная скорость учитывает энергию всех молекул; она пропорциональна корню из температуры.",
    descEn: "The root-mean-square speed accounts for the energy of all molecules; it is proportional to the square root of temperature.",
    exampleRu: "Для азота (M=0.028) при 300 К скорость равна v ≈ 516 м/с.",
    exampleEn: "For nitrogen (M=0.028) at 300 K, the speed is v ≈ 516 m/s."
  },

  mol_014: {
    nameEn: "Most Probable Speed",
    descRu: "Наиболее вероятная скорость — это скорость, которой обладает наибольшее число молекул газа в равновесии.",
    descEn: "The most probable speed is the speed possessed by the largest number of gas molecules in equilibrium.",
    exampleRu: "Наиболее вероятная скорость всегда чуть меньше среднеквадратичной.",
    exampleEn: "The most probable speed is always slightly less than the root-mean-square speed."
  },

  mol_015: {
    nameEn: "Average Arithmetic Speed",
    descRu: "Средняя арифметическая скорость — среднее значение модулей скоростей всех молекул.",
    descEn: "The average arithmetic speed is the mean value of the speed magnitudes of all molecules.",
    exampleRu: "По значению она находится между наиболее вероятной и среднеквадратичной скоростями.",
    exampleEn: "In value, it lies between the most probable and the root-mean-square speeds."
  },

  mol_016: {
    nameEn: "Saturated Vapor Pressure",
    descRu: "Давление насыщенного пара зависит только от температуры (и вещества) и не зависит от объема пара.",
    descEn: "Saturated vapor pressure depends only on temperature (and substance type) and does not depend on vapor volume.",
    exampleRu: "Вода закипает при 100°C, так как давление ее пара достигает атмосферного (101 кПа).",
    exampleEn: "Water boils at 100°C, as its vapor pressure reaches atmospheric levels (101 kPa)."
  },

  mol_017: {
    nameEn: "Relative Humidity",
    descRu: "Относительная влажность — это отношение парциального давления пара в воздухе к давлению насыщенного пара при той же температуре.",
    descEn: "Relative humidity is the ratio of partial vapor pressure in the air to the saturated vapor pressure at the same temperature.",
    exampleRu: "Если парциальное давление 1000 Па из возможных 2330 Па, то влажность ≈ 43%.",
    exampleEn: "If partial pressure is 1000 Pa out of a possible 2330 Pa, humidity is ≈ 43%."
  },

  mol_018: {
    nameEn: "Surface Tension Force",
    descRu: "Сила поверхностного натяжения направлена по касательной к поверхности жидкости и стремится сократить её площадь.",
    descEn: "Surface tension force is directed tangentially to the liquid surface and tends to minimize its area.",
    exampleRu: "Для воды (σ=0.073 Н/м) граница l=0.1 м создает силу F = 0.0073 Н.",
    exampleEn: "For water (σ=0.073 N/m), a boundary of l=0.1 m creates force F = 0.0073 N."
  },

  // ══════════════════════════════════════════
  //  TERMODINAMIKA (termo_001 → termo_014)
  // ══════════════════════════════════════════

  termo_001: {
    nameEn: "Quantity of Heat (Heating/Cooling)",
    descRu: "Вычисляет энергию, необходимую (или выделяющуюся) для изменения температуры тела.",
    descEn: "Calculates the energy needed (or released) to change the temperature of a body.",
    exampleRu: "Для нагрева 2 кг воды на 50°C нужно 420 кДж теплоты.",
    exampleEn: "To heat 2 kg of water by 50°C, 420 kJ of heat is required."
  },

  termo_002: {
    nameEn: "Specific Heat Capacity",
    descRu: "Количество энергии, необходимое для изменения температуры 1 кг вещества на 1 Кельвин.",
    descEn: "The amount of energy required to change the temperature of 1 kg of a substance by 1 Kelvin.",
    exampleRu: "Если Q=8400 Дж для m=1 кг на ΔT=2, c = 4200 Дж/(кг·К) (вода).",
    exampleEn: "If Q=8400 J for m=1 kg by ΔT=2, c = 4200 J/(kg·K) (water)."
  },
  
  termo_003: {
    nameEn: "Heat of Fusion",
    descRu: "Энергия, необходимая для полного перевода вещества из твердого состояния в жидкое (при температуре плавления).",
    descEn: "Energy required to completely change a substance from solid to liquid state (at melting point).",
    exampleRu: "Плавление 2 кг льда: Q = 330000 · 2 = 660,000 Дж.",
    exampleEn: "Melting 2 kg of ice: Q = 330000 · 2 = 660,000 J."
  },

  termo_004: {
    nameEn: "Heat of Vaporization",
    descRu: "Количество теплоты, затрачиваемое на превращение жидкости в пар при температуре кипения.",
    descEn: "The amount of heat expended to turn liquid into vapor at the boiling point.",
    exampleRu: "1.5 кг воды: Q = 2.26×10⁶ · 1.5 = 3.39 МДж.",
    exampleEn: "1.5 kg of water: Q = 2.26×10⁶ · 1.5 = 3.39 MJ."
  },

  termo_005: {
    nameEn: "Heat of Combustion",
    descRu: "Показывает, сколько тепловой энергии выделяется при полном сгорании топлива заданной массы.",
    descEn: "Indicates how much thermal energy is released from the complete combustion of a given mass of fuel.",
    exampleRu: "При сгорании 3 кг бензина выделится 132 МДж теплоты.",
    exampleEn: "The combustion of 3 kg of gasoline releases 132 MJ of heat."
  },

  termo_006: {
    nameEn: "First Law of Thermodynamics",
    descRu: "Теплота, переданная системе, расходуется на изменение её внутренней энергии и совершение ею работы над внешними телами (Закон сохранения энергии).",
    descEn: "The heat transferred to a system is used to change its internal energy and to perform work on external bodies (Conservation of energy).",
    exampleRu: "Газ накопил 500 Дж и совершил 200 Дж работы. Системе было передано 700 Дж.",
    exampleEn: "The gas accumulated 500 J and performed 200 J of work. 700 J was given to the system."
  },

  termo_007: {
    nameEn: "Change in Internal Energy",
    descRu: "Если газ получает теплоту и над ним совершают работу (сжимают), внутренняя энергия значительно возрастает.",
    descEn: "If a gas receives heat and work is done on it (compression), its internal energy increases significantly.",
    exampleRu: "Система получила 800 Дж и была сжата (A = -100 Дж). ΔU = 800 - (-100) = 900 Дж.",
    exampleEn: "System received 800 J and was compressed (A = -100 J). ΔU = 800 - (-100) = 900 J."
  },

  termo_008: {
    nameEn: "Internal Energy of an Ideal Gas",
    descRu: "В идеальном газе потенциальная энергия взаимодействия равна нулю. Внутренняя энергия зависит только от температуры и числа молекул.",
    descEn: "In an ideal gas, potential energy of interaction is zero. Internal energy depends only on temperature and number of molecules.",
    exampleRu: "2 моль гелия при 300К: U ≈ 7479 Дж.",
    exampleEn: "2 moles of Helium at 300K: U ≈ 7479 J."
  },

  termo_009: {
    nameEn: "Work Done by a Gas (Isobaric)",
    descRu: "Термодинамическая работа, совершаемая газом при изменении его объема в условиях постоянного давления.",
    descEn: "Thermodynamic work done by a gas changing its volume under constant pressure.",
    exampleRu: "При давлении 100,000 Па газ расширился на 0.2 м³. Работа A = 20 кДж.",
    exampleEn: "At 100,000 Pa pressure, the gas expanded by 0.2 m³. Work A = 20 kJ."
  },

  termo_010: {
    nameEn: "Ideal Engine Efficiency (Carnot)",
    descRu: "Предельный коэффициент полезного действия идеального теплового двигателя (работающего по циклу Карно).",
    descEn: "The maximum possible efficiency of an ideal heat engine (operating on the Carnot cycle).",
    exampleRu: "T₁ = 600 К, T₂ = 300 К. η = 1 - 300/600 = 0.5 (или 50%).",
    exampleEn: "T₁ = 600 K, T₂ = 300 K. η = 1 - 300/600 = 0.5 (or 50%)."
  },

  termo_011: {
    nameEn: "Real Heat Engine Efficiency",
    descRu: "Показывает, какая часть теплоты, полученной от нагревателя, была превращена в полезную механическую работу в реальных двигателях.",
    descEn: "Shows what fraction of the heat obtained from the heater was converted into useful mechanical work in real engines.",
    exampleRu: "Получено от нагревателя 1000 Дж, отдано холодильнику 600 Дж. Полезная работа A=400 Дж. КПД = 0.40.",
    exampleEn: "1000 J obtained from heater, 600 J given to cooler. Useful work A=400 J. Efficiency = 0.40."
  },

  termo_012: {
    nameEn: "Maximum Efficiency in %",
    descRu: "Максимальный (идеальный) КПД теплового двигателя показывает, что никакая тепловая машина не может иметь стопроцентный КПД.",
    descEn: "The maximum (ideal) efficiency of a heat engine demonstrates that no heat engine can ever be 100% efficient.",
    exampleRu: "Если T1=1000 К, а T2=300 К: ( 700 / 1000 ) × 100% = 70% максимум.",
    exampleEn: "If T1=1000 K and T2=300 K: ( 700 / 1000 ) × 100% = 70% at maximum."
  },

  termo_013: {
    nameEn: "Heat Pump Coefficient of Performance (COP)",
    descRu: "Показывает, во сколько раз больше тепловой энергии поступает в помещение, чем затрачивается механической/электрической энергии для работы.",
    descEn: "Shows how many times more thermal energy is delivered to a room than the mechanical/electrical energy expended.",
    exampleRu: "Затрачено 1000 Дж энергии от электросети, в помещение попало 4000 Дж тепла, COP = 4.0.",
    exampleEn: "1000 J electrical energy used, 4000 J of heat delivered to the room, COP = 4.0."
  },

  termo_014: {
    nameEn: "Change in Entropy",
    descRu: "Энтропия - мера необратимого рассеивания энергии. Ее увеличение характеризует термодинамическую стрелу времени в замкнутой системе.",
    descEn: "Entropy is a measure of irreversible energy dissipation. Its increase characterizes the thermodynamic arrow of time in a closed system.",
    exampleRu: "Системе при T=300К передано Q=600 Дж. Изменение энтропии ΔS = 2 Дж/К.",
    exampleEn: "Q=600 J given to a system at T=300K. Entropy change ΔS = 2 J/K."
  },

  // ══════════════════════════════════════════
  //  ELEKTROSTATIKA (elek_001 → elek_016)
  // ══════════════════════════════════════════

  elek_001: {
    nameEn: "Coulomb's Law",
    descRu: "Сила взаимодействия между двумя неподвижными точечными зарядами пропорциональна их модулям и обратно пропорциональна квадрату расстояния.",
    descEn: "The force of interaction between two stationary point charges is proportional to their magnitudes and inversely proportional to the square of the distance.",
    exampleRu: "q₁=1 мкКл, q₂=2 мкКл, r=0.1 м: F = 1.8 Н.",
    exampleEn: "q₁=1 μC, q₂=2 μC, r=0.1 m: F = 1.8 N."
  },

  elek_002: {
    nameEn: "Electric Field Strength",
    descRu: "Напряженность электрического поля показывает силу, с которой поле действует на единичный положительный заряд.",
    descEn: "Electric field strength indicates the force with which the field acts on a unit positive charge.",
    exampleRu: "F = 0.05 Н, q = 1 мкКл. E = 50,000 В/м.",
    exampleEn: "F = 0.05 N, q = 1 μC. E = 50,000 V/m."
  },

  elek_003: {
    nameEn: "Field of a Point Charge",
    descRu: "Напряженность поля точечного заряда убывает пропорционально квадрату расстояния от него.",
    descEn: "The field strength of a point charge decreases in proportion to the square of the distance from it.",
    exampleRu: "q = 2 мкКл, r = 0.5 м. E = 72,000 В/м.",
    exampleEn: "q = 2 μC, r = 0.5 m. E = 72,000 V/m."
  },

  elek_004: {
    nameEn: "Field of an Infinite Uniformly Charged Plane",
    descRu: "Поле, создаваемое равномерно заряженной бесконечной плоскостью, является однородным и не зависит от расстояния.",
    descEn: "The field created by a uniformly charged infinite plane is uniform and independent of distance.",
    exampleRu: "σ = 1 мкКл/м². E ≈ 56,500 В/м.",
    exampleEn: "σ = 1 μC/m². E ≈ 56,500 V/m."
  },

  elek_005: {
    nameEn: "Electric Potential",
    descRu: "Энергетическая характеристика поля — потенциальная энергия единичного положительного заряда в данной точке.",
    descEn: "Energetic characteristic of the field — the potential energy of a unit positive charge at a given point.",
    exampleRu: "q = 1 мкКл, r = 0.1 м. φ = 90,000 В.",
    exampleEn: "q = 1 μC, r = 0.1 m. φ = 90,000 V."
  },

  elek_006: {
    nameEn: "Potential Difference (Voltage)",
    descRu: "Напряжение — это работа, совершаемая полем по перемещению единичного заряда между двумя точками.",
    descEn: "Voltage is the work done by the field to move a unit charge between two points.",
    exampleRu: "Для перемещения 1 мкКл совершена работа 0.05 Дж. U = 50,000 В.",
    exampleEn: "Moving 1 μC required 0.05 J of work. U = 50,000 V."
  },

  elek_007: {
    nameEn: "Field and Potential Difference Relation",
    descRu: "В однородном поле напряженность равна разности потенциалов, деленной на расстояние между точками.",
    descEn: "In a uniform field, the strength is equal to the potential difference divided by the distance between points.",
    exampleRu: "U = 220 В, d = 0.01 м. E = 22,000 В/м.",
    exampleEn: "U = 220 V, d = 0.01 m. E = 22,000 V/m."
  },

  elek_008: {
    nameEn: "Work of Electric Field",
    descRu: "Работа, совершаемая силами электрического поля при перемещении заряда, равна произведению заряда на разность потенциалов.",
    descEn: "The work done by electric field forces in moving a charge is the product of the charge and the potential difference.",
    exampleRu: "Электрон на 100 В получает 1.6×10⁻¹⁷ Дж.",
    exampleEn: "An electron across 100 V gains 1.6×10⁻¹⁷ J."
  },

  elek_009: {
    nameEn: "Capacitance",
    descRu: "Электроемкость показывает, какой заряд способен накопить конденсатор при напряжении в 1 В.",
    descEn: "Capacitance shows how much charge a capacitor can store at a voltage of 1 V.",
    exampleRu: "Заряд 1 мкКл при 50 В. C = 0.02 мкФ.",
    exampleEn: "Charge of 1 μC at 50 V. C = 0.02 μF."
  },

  elek_010: {
    nameEn: "Capacitance of Parallel-Plate Capacitor",
    descRu: "Емкость плоского конденсатора зависит от площади пластин, расстояния между ними и типа диэлектрика.",
    descEn: "The capacitance of a parallel-plate capacitor depends on plate area, distance between them, and dielectric type.",
    exampleRu: "ε=2, S=0.01 м², d=1 мм. C = 177 пФ.",
    exampleEn: "ε=2, S=0.01 m², d=1 mm. C = 177 pF."
  },

  elek_011: {
    nameEn: "Energy of a Charged Capacitor",
    descRu: "Заряженный конденсатор обладает энергией, сосредоточенной в его электрическом поле.",
    descEn: "A charged capacitor has energy concentrated within its electric field.",
    exampleRu: "C = 1 мкФ, U = 220 В. W = 0.0242 Дж.",
    exampleEn: "C = 1 μF, U = 220 V. W = 0.0242 J."
  },

  elek_012: {
    nameEn: "Series Connection (Capacitors)",
    descRu: "При последовательном соединении конденсаторов заряды одинаковы, а общая емкость меньше наименьшей из соединенных.",
    descEn: "In series connection, charges are equal, and total capacitance is less than the smallest individual one.",
    exampleRu: "C₁=6, C₂=3. Общая = 2 мкФ.",
    exampleEn: "C₁=6, C₂=3. Total = 2 μF."
  },

  elek_013: {
    nameEn: "Parallel Connection (Capacitors)",
    descRu: "При параллельном соединении конденсаторов напряжения одинаковы, а их емкости складываются.",
    descEn: "In parallel connection, voltages are equal, and their capacitances add up.",
    exampleRu: "C₁=4, C₂=5. Общая = 9 мкФ.",
    exampleEn: "C₁=4, C₂=5. Total = 9 μF."
  },

  elek_014: {
    nameEn: "Electric Dipole Moment",
    descRu: "Дипольный момент характеризует систему двух равных по модулю и противоположных по знаку зарядов.",
    descEn: "The dipole moment characterizes a system of two charges equal in magnitude and opposite in sign.",
    exampleRu: "Момент направлен от отрицательного заряда к положительному. p = q·l.",
    exampleEn: "The moment points from the negative to the positive charge. p = q·l."
  },

  elek_015: {
    nameEn: "Dielectric Permittivity",
    descRu: "Относительная диэлектрическая проницаемость показывает, во сколько раз электрическое поле ослабляется внутри диэлектрика.",
    descEn: "Relative dielectric permittivity shows how many times the electric field is weakened inside the dielectric.",
    exampleRu: "Если в вакууме E=200, а в стекле E=100, то ε = 2.",
    exampleEn: "If E=200 in vacuum and E=100 in glass, then ε = 2."
  },

  elek_016: {
    nameEn: "Energy Density of Electric Field",
    descRu: "Плотность энергии — это энергия электрического поля, приходящаяся на единицу объема.",
    descEn: "Energy density is the electric field energy per unit volume.",
    exampleRu: "Для воздуха при E=1000 В/м энергия на кубометр w ≈ 4.4 мкДж/м³.",
    exampleEn: "In air at E=1000 V/m, the energy per cubic meter is w ≈ 4.4 μJ/m³."
  },

  // ══════════════════════════════════════════
  //  DOIMIY ELEKTR TOKI (tok_001 → tok_022)
  // ══════════════════════════════════════════

  tok_001: {
    nameEn: "Electric Current",
    descRu: "Сила тока показывает, какой электрический заряд проходит через поперечное сечение проводника за единицу времени.",
    descEn: "Electric current indicates how much electric charge passes through the cross-section of a conductor per unit of time.",
    exampleRu: "Если за 2 с прошло 10 Кл, ток I = 5 А.",
    exampleEn: "If 10 C passes in 2 s, the current is I = 5 A."
  },

  tok_002: {
    nameEn: "Ohm's Law (for a circuit section)",
    descRu: "Сила тока на участке цепи прямо пропорциональна напряжению на его концах и обратно пропорциональна его сопротивлению.",
    descEn: "The current in a section of a circuit is directly proportional to the voltage across it and inversely proportional to its resistance.",
    exampleRu: "При U = 220 В и R = 44 Ом ток I = 5 А.",
    exampleEn: "With U = 220 V and R = 44 Ω, current I = 5 A."
  },

  tok_003: {
    nameEn: "Resistance of a Conductor",
    descRu: "Сопротивление зависит от материала (удельного сопротивления), длины проводника и площади его сечения.",
    descEn: "Resistance depends on the material (resistivity), length of the conductor, and its cross-sectional area.",
    exampleRu: "Для медного провода: R = 0.017·100 / 2 = 0.85 Ом.",
    exampleEn: "For copper wire: R = 0.017·100 / 2 = 0.85 Ω."
  },

  tok_004: {
    nameEn: "Temperature Dependence of Resistance",
    descRu: "Сопротивление металлических проводников увеличивается пропорционально росту температуры.",
    descEn: "The resistance of metallic conductors increases proportionally with rising temperature.",
    exampleRu: "При нагреве на 50°C для α=0.004 сопротивление 10 Ом возрастет до 12 Ом.",
    exampleEn: "Heating by 50°C for α=0.004 increases a 10 Ω resistance to 12 Ω."
  },

  tok_005: {
    nameEn: "Series Combination of Resistors",
    descRu: "При последовательном соединении общее сопротивление равно сумме сопротивлений отдельных участков.",
    descEn: "In a series circuit, total resistance is the sum of the individual resistances.",
    exampleRu: "R = 5 + 15 + 10 = 30 Ом.",
    exampleEn: "R = 5 + 15 + 10 = 30 Ω."
  },

  tok_006: {
    nameEn: "Parallel Combination of Resistors",
    descRu: "При параллельном соединении проводимости складываются, общее сопротивление всегда меньше наименьшего из входящих в цепь.",
    descEn: "In a parallel circuit, conductances add up, making the total resistance less than the smallest individual resistance.",
    exampleRu: "Для 1/6 и 1/3 общее сопротивление 2 Ом.",
    exampleEn: "For 1/6 and 1/3, equivalent resistance is 2 Ω."
  },

  tok_007: {
    nameEn: "Two Resistors in Parallel (Shortcut)",
    descRu: "Удобная формула для быстрого расчета эквивалентного сопротивления двух параллельно соединенных резисторов.",
    descEn: "A convenient formula for quickly calculating the equivalent resistance of two parallel-connected resistors.",
    exampleRu: "10 и 10 Ом дают R = 100/20 = 5 Ом.",
    exampleEn: "10 and 10 Ω give R = 100/20 = 5 Ω."
  },

  tok_008: {
    nameEn: "Electric Power",
    descRu: "Электрическая мощность показывает скорость, с которой электроэнергия преобразуется в другие виды энергии (тепло, свет, механическую работу).",
    descEn: "Electric power indicates the rate at which electrical energy is converted into other forms (heat, light, mechanical work).",
    exampleRu: "При U=220В и I=5А мощность P=1100 Вт.",
    exampleEn: "At U=220V and I=5A, power is P=1100 W."
  },

  tok_009: {
    nameEn: "Electric Energy (Work)",
    descRu: "Работа электрического тока равна произведению мощности на время (обычно измеряется также в киловатт-часах).",
    descEn: "Work of electric current is the product of power and time (usually also measured in kilowatt-hours).",
    exampleRu: "1 кВт прибор за 1 час (3600 с) расходует 3.6 МДж.",
    exampleEn: "A 1 kW appliance working for 1 hour (3600 s) consumes 3.6 MJ."
  },

  tok_010: {
    nameEn: "Ohm's Law for Complete Circuit",
    descRu: "Ток в полной цепи равен отношению ЭДС источника к полному сопротивлению цепи (внешнему и внутреннему).",
    descEn: "The current in a complete circuit equals the EMF divided by the total resistance (external plus internal).",
    exampleRu: "ЭДС=12В, внутреннее r=1, внешнее R=5: I=2А.",
    exampleEn: "EMF=12V, inner r=1, outer R=5: I=2A."
  },

  tok_011: {
    nameEn: "Terminal Voltage",
    descRu: "Напряжение на клеммах реального источника всегда меньше его ЭДС из-за падения напряжения на внутреннем сопротивлении.",
    descEn: "The terminal voltage of a real source is always less than its EMF due to voltage drop across the internal resistance.",
    exampleRu: "При протекании тока 2А напряжение станет 12 - 2·1 = 10 В.",
    exampleEn: "Drawing 2A current drops voltage to 12 - 2·1 = 10 V."
  },

  tok_012: {
    nameEn: "Short Circuit Current",
    descRu: "Максимальный ток, который может выдать источник, если сопротивление внешней цепи равно нулю. Ограничивается лишь внутренним сопротивлением.",
    descEn: "The maximum current a source can deliver if external resistance is zero. Limited only by internal resistance.",
    exampleRu: "При ЭДС 12В и внутреннем r=0.05 короткое замыкание даст 240 А.",
    exampleEn: "At 12V EMF and inner r=0.05, short circuit yields 240 A."
  },

  tok_013: {
    nameEn: "Kirchhoff's First Law (Junction Rule)",
    descRu: "Алгебраическая сумма токов, сходящихся в узле, равна нулю. Заряд не может накапливаться в точке разветвления проводов.",
    descEn: "The algebraic sum of currents meeting at a node is zero. Charge cannot accumulate at a junction of wires.",
    exampleRu: "Входят 3А и 2А, выходит 4А, значит по другой ветви вытекает еще 1А.",
    exampleEn: "Entering are 3A and 2A, 4A leaves, so another branch carries out 1A."
  },

  tok_014: {
    nameEn: "Kirchhoff's Second Law (Loop Rule)",
    descRu: "Сумма падений напряжения на элементах любого замкнутого контура равна алгебраической сумме ЭДС в этом контуре.",
    descEn: "The sum of voltage drops across elements of any closed loop equals the algebraic sum of EMFs in that loop.",
    exampleRu: "Для контура с двумя резисторами напряжения суммируются к ЭДС источника.",
    exampleEn: "For a loop with two resistors, voltages add up to the source EMF."
  },

  tok_015: {
    nameEn: "Cells in Series",
    descRu: "При последовательном соединении источников тока их ЭДС и внутренние сопротивления суммируются.",
    descEn: "When identical cells are connected in series, their EMFs and internal resistances add up.",
    exampleRu: "Четыре батарейки по 1.5 В дадут 6 В.",
    exampleEn: "Four 1.5 V cells will provide 6 V."
  },

  tok_016: {
    nameEn: "Cells in Parallel",
    descRu: "При параллельном соединении одинаковых источников ЭДС остается прежней, но общее внутреннее сопротивление уменьшается.",
    descEn: "When identical cells are connected in parallel, EMF remains the same, but internal resistance decreases.",
    exampleRu: "Две по 12В не дадут 24В, но ток могут выдать вдвое больше.",
    exampleEn: "Two 12V cells will not yield 24V, but can deliver twice the current."
  },

  tok_017: {
    nameEn: "Joule's Law of Heating",
    descRu: "Количество теплоты, выделяющееся в проводнике, пропорционально квадрату силы тока, сопротивлению проводника и времени.",
    descEn: "The heat produced in a conductor is proportional to the square of the current, its resistance, and time.",
    exampleRu: "При 2А через 10 Ом за 60 секунд выделяется 2400 Дж.",
    exampleEn: "At 2A through 10 Ω for 60 sec, 2400 J of heat is released."
  },

  tok_018: {
    nameEn: "Electrical Conductance",
    descRu: "Величина, обратная электрическому сопротивлению. Измеряется в Сименсах (См).",
    descEn: "The reciprocal of electrical resistance. Measured in Siemens (S).",
    exampleRu: "Если R = 0.5 Ом, проводимость G = 2 См.",
    exampleEn: "If R = 0.5 Ω, the conductance is G = 2 S."
  },

  tok_019: {
    nameEn: "Current Density",
    descRu: "Отношение силы тока к площади поперечного сечения проводника. Описывает распределение тока внутри материала.",
    descEn: "The ratio of current to the cross-sectional area of a conductor. Describes current distribution inside the material.",
    exampleRu: "Для площади 0.0001 м² при токе 10 А, плотность j = 100 кА/м².",
    exampleEn: "For an area of 0.0001 m² at 10 A, density j = 100 kA/m²."
  },

  tok_020: {
    nameEn: "Drift Velocity",
    descRu: "Средняя скорость направленного движения электронов под действием электрического поля (обычно доли миллиметра в секунду).",
    descEn: "The average directional velocity of electrons under an electric field (usually fractions of a millimeter per second).",
    exampleRu: "Для меди (n≈8·10²⁸) при обычных токах скорость равна около 0.15 мм/с.",
    exampleEn: "For copper (n≈8·10²⁸) at normal currents, the velocity is about 0.15 mm/s."
  },

  tok_021: {
    nameEn: "Potential Difference",
    descRu: "Разность потенциалов между двумя точками определяет напряжение и обуславливает наличие тока в цепи.",
    descEn: "The potential difference between two points determines the voltage and drives the current flow.",
    exampleRu: "Если потенциал на одной стороне 100В, а на другой 40В, напряжение 60В.",
    exampleEn: "If potential on one side is 100V and 40V on another, voltage is 60V."
  },

  tok_022: {
    nameEn: "Efficiency of Power Source",
    descRu: "КПД источника показывает долю энергии, выделяющейся во внешней (полезной) цепи, относительно всей затраченной энергии.",
    descEn: "Source efficiency reflects the fraction of energy released in the external (useful) circuit relative to the total energy expended.",
    exampleRu: "Если R внешнее равно 4, а внутреннее 1, то КПД 80%.",
    exampleEn: "If external R is 4 and internal is 1, efficiency is 80%."
  },

  // ══════════════════════════════════════════
  //  MAGNIT MAYDONI (mag_001 → mag_014)
  // ══════════════════════════════════════════

  mag_001: {
    nameEn: "Ampere's Force",
    descRu: "Сила, с которой магнитное поле действует на помещенный в него проводник с током.",
    descEn: "The force exerted by a magnetic field on a current-carrying conductor placed within it.",
    exampleRu: "При B=0.5 Тл, I=2 А, L=0.2 м под 90° сила составляет 0.2 Н.",
    exampleEn: "At B=0.5 T, I=2 A, L=0.2 m under 90°, the force is 0.2 N."
  },

  mag_002: {
    nameEn: "Magnetic Field of a Straight Wire",
    descRu: "Индукция магнитного поля, создаваемого бесконечно длинным прямым проводником с током на расстоянии r от него.",
    descEn: "The magnetic field induction created by an infinitely long straight current-carrying wire at a distance r from it.",
    exampleRu: "Для 10 А на расстоянии 0.1 м поле равно 20 мкТл.",
    exampleEn: "For 10 A at a distance of 0.1 m, the field is 20 μT."
  },

  mag_003: {
    nameEn: "Magnetic Field Inside a Solenoid",
    descRu: "Индукция однородного магнитного поля внутри длинной катушки (соленоида) с током.",
    descEn: "The induction of the uniform magnetic field inside a long current-carrying coil (solenoid).",
    exampleRu: "При плотности 1000 витков/м и токе 2 А поле равно ≈ 2.51 мТл.",
    exampleEn: "With 1000 turns/m and 2 A current, the field is ≈ 2.51 mT."
  },

  mag_004: {
    nameEn: "Lorentz Force",
    descRu: "Сила, с которой магнитное поле действует на движущуюся в нем электрически заряженную частицу.",
    descEn: "The force exerted by a magnetic field on a moving electrically charged particle.",
    exampleRu: "На электрон при скорости 10⁶ м/с в поле 0.1 Тл действует сила 1.6×10⁻¹⁴ Н.",
    exampleEn: "An electron moving at 10⁶ m/s in a 0.1 T field experiences a force of 1.6×10⁻¹⁴ N."
  },

  mag_005: {
    nameEn: "Cyclotron Radius",
    descRu: "Радиус круговой траектории, по которой движется заряженная частица в однородном магнитном поле.",
    descEn: "The radius of the circular trajectory of a charged particle moving in a uniform magnetic field.",
    exampleRu: "Для электрона при v=10⁶ м/с и B=0.1 Тл радиус около 0.057 мм.",
    exampleEn: "For an electron at v=10⁶ m/s and B=0.1 T, the radius is about 0.057 mm."
  },

  mag_006: {
    nameEn: "Period of Revolution (Charge)",
    descRu: "Время, за которое заряженная частица совершает один полный оборот в магнитном поле. (Не зависит от скорости!).",
    descEn: "The time taken for a charged particle to complete one full revolution in a magnetic field. (Independent of velocity!).",
    exampleRu: "Протон в поле 1 Тл делает один оборот за ≈ 6.5×10⁻⁸ с.",
    exampleEn: "A proton in a 1 T field completes one revolution in ≈ 6.5×10⁻⁸ s."
  },

  mag_007: {
    nameEn: "Cyclotron Frequency",
    descRu: "Частота обращения заряженной частицы по круговой орбите в постоянном магнитном поле.",
    descEn: "The frequency of revolution of a charged particle in a circular orbit within a constant magnetic field.",
    exampleRu: "Для протона в поле 1 Тл частота составляет ≈ 15 МГц.",
    exampleEn: "For a proton in a 1 T field, the frequency is ≈ 15 MHz."
  },

  mag_008: {
    nameEn: "Magnetic Flux",
    descRu: "Физическая величина, характеризующая количество линий магнитной индукции, пронизывающих некоторую поверхность.",
    descEn: "A physical quantity characterizing the number of magnetic induction lines piercing a certain surface.",
    exampleRu: "Площадь 0.5 м², поле 0.2 Тл (перпендикулярно), поток = 0.1 Вб.",
    exampleEn: "Area 0.5 m², field 0.2 T (perpendicular), flux = 0.1 Wb."
  },

  mag_009: {
    nameEn: "Mutual Inductance",
    descRu: "Характеризует способность одного контура наводить магнитный поток (и ЭДС) в соседнем контуре при изменении тока.",
    descEn: "Characterizes the ability of one circuit to induce magnetic flux (and EMF) in a neighboring circuit when current changes.",
    exampleRu: "Ток 2А наводит поток 0.05 Вб, взаимная индуктивность M = 0.025 Гн.",
    exampleEn: "A 2A current induces 0.05 Wb flux, mutual inductance M = 0.025 H."
  },

  mag_010: {
    nameEn: "Inductance",
    descRu: "Свойство электрической цепи противодействовать изменению проходящего через нее тока (электромагнитная инерция).",
    descEn: "The property of an electrical circuit to oppose changes in the current flowing through it (electromagnetic inertia).",
    exampleRu: "Поток 0.02 Вб при токе 5 А дает индуктивность 4 мГн.",
    exampleEn: "A flux of 0.02 Wb at 5 A gives an inductance of 4 mH."
  },

  mag_011: {
    nameEn: "Energy of Magnetic Field",
    descRu: "Энергия, запасенная в магнитном поле катушки с индуктивностью L при протекании через нее тока I.",
    descEn: "The energy stored in the magnetic field of a coil with inductance L when current I flows through it.",
    exampleRu: "Катушка 0.1 Гн с током 4 А запасает 0.8 Дж энергии.",
    exampleEn: "A 0.1 H coil with 4 A current stores 0.8 J of energy."
  },

  mag_012: {
    nameEn: "Transformer Ratio",
    descRu: "Отношение числа витков (или напряжений) первичной и вторичной обмоток трансформатора.",
    descEn: "The ratio of the number of turns (or voltages) of the primary and secondary windings of a transformer.",
    exampleRu: "1000 к 100 виткам означает коэффициент трансформации 10 (понижающий).",
    exampleEn: "1000 to 100 turns means a transformation ratio of 10 (step-down)."
  },

  mag_013: {
    nameEn: "Ideal Transformer Powers",
    descRu: "В идеальном трансформаторе поступающая в первичную обмотку мощность полностью передается во вторичную.",
    descEn: "In an ideal transformer, the power entering the primary winding is completely transferred to the secondary.",
    exampleRu: "220В и 1А на входе могут дать 22В и 10А на выходе.",
    exampleEn: "220V and 1A at input can yield 22V and 10A at output."
  },

  mag_014: {
    nameEn: "Magnetic Field Intensity (H)",
    descRu: "Напряженность поля определяет только внешний ток и не зависит от магнитных свойств окружающей среды.",
    descEn: "Field intensity (H) is determined solely by external current and does not depend on the magnetic properties of the environment.",
    exampleRu: "При B = 1.256 мТл в воздухе напряженность H ≈ 1000 А/м.",
    exampleEn: "At B = 1.256 mT in air, intensity H ≈ 1000 A/m."
  },

  // ══════════════════════════════════════════
  //  ELEKTROMAGNIT TEBRANISHLAR (em_001 → em_010)
  // ══════════════════════════════════════════

  em_001: {
    nameEn: "Natural Angular Frequency of LC Circuit",
    descRu: "Собственная циклическая частота идеального колебательного контура, определяющая скорость перекачки энергии.",
    descEn: "Natural angular frequency of an ideal oscillatory circuit, determining the rate of energy transfer.",
    exampleRu: "При L = 0.01 Гн и C = 1 мкФ частота ω₀ = 10,000 рад/с.",
    exampleEn: "For L = 0.01 H and C = 1 μF, the frequency is ω₀ = 10,000 rad/s."
  },

  em_002: {
    nameEn: "Thomson's Formula (Period of LC Circuit)",
    descRu: "Определяет период (время одного полного колебания) свободных электромагнитных колебаний в идеальном LC-контуре.",
    descEn: "Determines the period (time for one full oscillation) of free electromagnetic oscillations in an ideal LC circuit.",
    exampleRu: "Для L = 0.01 Гн и C = 1 мкФ период T ≈ 0.628 мс.",
    exampleEn: "For L = 0.01 H and C = 1 μF, the period is T ≈ 0.628 ms."
  },

  em_003: {
    nameEn: "Frequency of LC Circuit Oscillations",
    descRu: "Частота колебаний в LC-контуре (в Герцах), показывает количество полных колебаний за 1 секунду.",
    descEn: "The frequency of oscillations in an LC circuit (in Hertz), showing the number of full cycles per second.",
    exampleRu: "При периоде 0.628 мс частота f ≈ 1590 Гц.",
    exampleEn: "For a period of 0.628 ms, the frequency is f ≈ 1590 Hz."
  },

  em_004: {
    nameEn: "Charge Oscillation Equation",
    descRu: "Уравнение гармонических колебаний заряда на обкладках конденсатора в идеальном контуре.",
    descEn: "The equation for the harmonic oscillations of the charge on the capacitor plates in an ideal circuit.",
    exampleRu: "Если максимальный заряд 5 мКл, к половине периода заряд достигнет -5 мКл.",
    exampleEn: "If max charge is 5 mC, half a period later the charge will be -5 mC."
  },

  em_005: {
    nameEn: "Current Oscillation Equation",
    descRu: "Уравнение колебаний тока в катушке. Ток максимален, когда заряд конденсатора равен нулю.",
    descEn: "The equation for current oscillations in the coil. Current is max when capacitor charge is zero.",
    exampleRu: "Когда косинус заряда равен нулю, ток достигает своей пиковой амплитуды по синусу.",
    exampleEn: "When the cosine of charge is zero, current reaches its peak amplitude via sine."
  },

  em_006: {
    nameEn: "Speed of Electromagnetic Wave",
    descRu: "Скорость распространения электромагнитных волн в вакууме совпадает со скоростью света.",
    descEn: "The speed of electromagnetic waves in a vacuum equals the speed of light.",
    exampleRu: "В вакууме электромагнитные волны движутся со скоростью 3×10⁸ м/с.",
    exampleEn: "In a vacuum, electromagnetic waves travel at exactly 3×10⁸ m/s."
  },

  em_007: {
    nameEn: "Electromagnetic Wavelength",
    descRu: "Длина волны показывает расстояние, на которое распространяется волна за один период колебаний.",
    descEn: "Wavelength indicates the distance a wave travels during one full period of oscillation.",
    exampleRu: "Радиостанция FM на 100 МГц имеет длину волны около 3 метров.",
    exampleEn: "An FM radio station at 100 MHz has a wavelength of about 3 meters."
  },

  em_008: {
    nameEn: "Alternating Current EMF",
    descRu: "Мгновенное значение электродвижущей силы, генерируемой вращающейся рамкой в магнитном поле.",
    descEn: "The instantaneous value of the electromotive force generated by a rotating coil in a magnetic field.",
    exampleRu: "При амплитуде 311В в бытовой сети напряжение колеблется по закону синуса от +311 до -311 В.",
    exampleEn: "With an amplitude of 311V in household mains, voltage fluctuates sinusoidally from +311 to -311 V."
  },

  em_009: {
    nameEn: "Effective (RMS) Value",
    descRu: "Действующее значение переменного тока/напряжения. Физически эквивалентно такому постоянному току, который выделяет ту же тепловую мощность.",
    descEn: "Effective (RMS) value of alternating current/voltage. Equivalent to a direct current producing the same heating power.",
    exampleRu: "Амплитудное напряжение 311 В дает действующее (эффективное) напряжение 220 В.",
    exampleEn: "An amplitude voltage of 311 V yields an effective (RMS) voltage of 220 V."
  },

  em_010: {
    nameEn: "Active AC Power",
    descRu: "Мощность, реально расходуемая нагрузкой, зависящая от сдвига фаз (коэффициента мощности) между током и напряжением.",
    descEn: "Real power consumed by the load, depending on the phase shift (power factor) between current and voltage.",
    exampleRu: "При 220В и 5А, если cosφ = 0.8, эффективная мощность составит 880 Вт.",
    exampleEn: "At 220V and 5A, if cosφ = 0.8, the effective power is 880 W."
  },

  // ══════════════════════════════════════════
  //  OPTIKA (opt_001 → opt_020)
  // ══════════════════════════════════════════

  opt_001: {
    nameEn: "Speed of Light and Wavelength",
    descRu: "Связь между скоростью света в вакууме, длиной электромагнитной волны и ее частотой.",
    descEn: "Relationship between the speed of light in a vacuum, electromagnetic wavelength, and frequency.",
    exampleRu: "Для желтого цвета с частотой 5·10¹⁴ Гц длина волны равна 600 нм.",
    exampleEn: "For yellow light with frequency 5·10¹⁴ Hz, the wavelength is 600 nm."
  },

  opt_002: {
    nameEn: "Absolute Refractive Index",
    descRu: "Показывает во сколько раз скорость света в данной среде меньше, чем в вакууме.",
    descEn: "Indicates how many times slower the speed of light is in a medium compared to a vacuum.",
    exampleRu: "Для стекла n = 1.5, значит свет замедляется до 200 000 км/с.",
    exampleEn: "For glass n = 1.5, meaning light slows down to 200,000 km/s."
  },

  opt_003: {
    nameEn: "Snell's Law of Refraction",
    descRu: "Закон устанавливающий связь углов падения и преломления при переходе света через границу двух сред.",
    descEn: "Law establishing the relationship between angles of incidence and refraction when light crosses the boundary of two media.",
    exampleRu: "Свет из воздуха падает под 45° на воду, угол преломления будет ≈ 32°.",
    exampleEn: "Light from air hits water at 45°, refraction angle will be ≈ 32°."
  },

  opt_004: {
    nameEn: "Total Internal Reflection",
    descRu: "Явление полного отражения света (без выхода наружу) при падении из более плотной среды под углом выше критического.",
    descEn: "Phenomenon of total reflection of light (without exiting) when incident from a denser medium at an angle above the critical limit.",
    exampleRu: "Для стекла в воздух критический угол равен около 42°.",
    exampleEn: "For glass to air, the critical angle is about 42°."
  },

  opt_005: {
    nameEn: "Plane Mirror",
    descRu: "В плоском зеркале изображение мнимое, прямое и в натуральную величину на том же расстоянии за зеркалом.",
    descEn: "In a plane mirror, the image is virtual, erect, and actual size at the same distance behind the mirror.",
    exampleRu: "Вы на 2 м от зеркала — ваше изображение на 2 м за ним.",
    exampleEn: "You are 2 m from the mirror — your image is 2 m behind it."
  },

  opt_006: {
    nameEn: "Spherical Mirror Formula",
    descRu: "Связывает фокусное расстояние сферического зеркала с расстояниями до предмета и изображения.",
    descEn: "Relates the focal length of a spherical mirror to the object and image distances.",
    exampleRu: "При фокусе 0.5 м предмет на 2 м дает изображение на 0.67 м.",
    exampleEn: "With focal length 0.5 m, an object at 2 m yields an image at 0.67 m."
  },

  opt_007: {
    nameEn: "Linear Magnification",
    descRu: "Отношение высоты изображения к высоте предмета, определяемое через соотношение их расстояний.",
    descEn: "The ratio of image height to object height, determined by the ratio of their distances.",
    exampleRu: "Если расст. до изобр. 0.67м, а до предм. 2м — увеличение равно 0.33.",
    exampleEn: "If image dist is 0.67m, and object dist 2m — magnification is 0.33."
  },

  opt_008: {
    nameEn: "Thin Lens Formula",
    descRu: "Уравнение, описывающее расположение изображения, создаваемого собирающей или рассеивающей тонкой линзой.",
    descEn: "Equation describing the position of an image created by a converging or diverging thin lens.",
    exampleRu: "У лупы (F=0.15м) при расстоянии предмета 0.1м изображение мнимое (-0.3м).",
    exampleEn: "For a magnifier (F=0.15m) with object distance 0.1m, image is virtual (-0.3m)."
  },

  opt_009: {
    nameEn: "Optical Power of a Lens (D)",
    descRu: "Величина, обратная фокусному расстоянию линзы. Измеряется в диоптриях (дптр).",
    descEn: "The reciprocal of the focal length of a lens. Measured in diopters (D).",
    exampleRu: "Очки с силой +2 дптр имеют фокусное расстояние 0.5 м.",
    exampleEn: "Glasses with a power of +2 D have a focal length of 0.5 m."
  },

  opt_010: {
    nameEn: "Lens Magnification",
    descRu: "Показывает во сколько раз изображение отличается от размеров реального объекта (напр. в проекторе).",
    descEn: "Indicates how many times the image differs from the real object dimensions (e.g., in a projector).",
    exampleRu: "Проектор увеличивает кадр размером 0.05м в 200 раз до 10 метров на экране.",
    exampleEn: "A projector magnifies a 0.05m frame by 200 times to 10 meters on the screen."
  },

  opt_011: {
    nameEn: "Optical System Power",
    descRu: "Оптическая сила системы сложенных вплотную тонких линз равна сумме их оптических сил.",
    descEn: "The optical power of a system of thin lenses placed close together is the sum of their individual powers.",
    exampleRu: "+3 Дптр и -1.5 Дптр в сумме дают систему силой +1.5 Дптр.",
    exampleEn: "+3 D and -1.5 D in combination give a system with power +1.5 D."
  },

  opt_012: {
    nameEn: "Shadow and Geometric Light Rectilinearity",
    descRu: "Принцип расчета высоты недоступных предметов по длине их тени (теорема Фалеса о подобии).",
    descEn: "The principle of calculating the height of inaccessible objects by their shadow length (Thales' theorem of similarity).",
    exampleRu: "Кол 2м дает тень 3м, тогда здание с тенью 15м имеет высоту 10м.",
    exampleEn: "A 2m stick gives a 3m shadow, so a building with a 15m shadow is 10m high."
  },

  opt_013: {
    nameEn: "Interference Maximum Condition",
    descRu: "Условие, при котором наложение когерентных световых волн приводит к максимальному усилению (светлое пятно).",
    descEn: "Condition where the superposition of coherent light waves results in maximum constructive interference (bright spot).",
    exampleRu: "Разность хода волн равна целому числу длин волн (k = 0, 1, 2...).",
    exampleEn: "Path difference equals a whole number of wavelengths (k = 0, 1, 2...)."
  },

  opt_014: {
    nameEn: "Interference Minimum Condition",
    descRu: "Условие, при котором волны полностью гасят друг друга (темное пятно).",
    descEn: "Condition under which waves completely cancel each other out (dark spot).",
    exampleRu: "Разность хода волн равна нечетному числу полуволн.",
    exampleEn: "The path difference equals an odd number of half-wavelengths."
  },

  opt_015: {
    nameEn: "Diffraction Grating Formula",
    descRu: "Основная формула дифракционной решетки, связывающая период, длину волны и угол дифракции максимума.",
    descEn: "The fundamental diffraction grating formula connecting grating period, wavelength, and maximum diffraction angle.",
    exampleRu: "С зеленым светом (500 нм) и решеткой 0.01 мм первый максимум под 0.5°.",
    exampleEn: "With green light (500 nm) and a 0.01 mm grating, the first max is at 0.5°."
  },

  opt_016: {
    nameEn: "Light Dispersion",
    descRu: "Зависимость показателя преломления вещества от длины волны падающего света (разложение в спектр).",
    descEn: "The dependence of a substance's refractive index on the wavelength of incident light (spectrum splitting).",
    exampleRu: "Фиолетовый цвет преломляется в стекле сильнее красного.",
    exampleEn: "Violet light is refracted more strongly in glass than red light."
  },

  opt_017: {
    nameEn: "Optical System of the Healthy Eye",
    descRu: "Расстояние наилучшего зрения для нормального глаза составляет около 25 см (0.25 м).",
    descEn: "The distance of distinct vision for a normal eye is about 25 cm (0.25 m).",
    exampleRu: "Фокусное расстояние ближней точки 0.25м соответствует силе +4 Дптр.",
    exampleEn: "A near point focal length of 0.25m corresponds to a power of +4 D."
  },

  opt_018: {
    nameEn: "Microscope Magnification",
    descRu: "Общее увеличение равно произведению увеличений объектива и окуляра.",
    descEn: "Total magnification equals the product of the objective and eyepiece magnifications.",
    exampleRu: "Объектив 40x и окуляр 10x дают общее увеличение в 400 раз.",
    exampleEn: "A 40x objective and a 10x eyepiece give a total magnification of 400 times."
  },

  opt_019: {
    nameEn: "Telescope Magnification",
    descRu: "Увеличение телескопа равно отношению фокусного расстояния объектива к фокусу окуляра.",
    descEn: "Telescope magnification equals the ratio of the objective's focal length to the eyepiece's focal length.",
    exampleRu: "Объектив с фокусом 1м и окуляр 5см дают увеличение в 20 раз.",
    exampleEn: "An objective with a 1m focus and a 5cm eyepiece give 20x magnification."
  },

  opt_020: {
    nameEn: "Illuminance (Photometry)",
    descRu: "Освещенность поверхности определяется как световой поток, приходящийся на единицу площади.",
    descEn: "Surface illuminance is defined as the luminous flux incident per unit area.",
    exampleRu: "Поток 800 люмен на стол площадью 2 м² создает освещенность 400 люкс.",
    exampleEn: "A flux of 800 lumens on a 2 m² table creates an illuminance of 400 lux."
  },

  // ══════════════════════════════════════════
  //  ATOM VA YADRO FIZIKASI (aty_001 → aty_016)
  // ══════════════════════════════════════════

  aty_001: {
    nameEn: "Einstein's Equation for Photoelectric Effect",
    descRu: "Энергия падающего фотона расходуется на работу выхода электрона из металла и на сообщение ему кинетической энергии.",
    descEn: "The incident photon energy is spent on the work function to eject the electron and on its resulting kinetic energy.",
    exampleRu: "Фотон 5е-19 Дж тратит 3е-19 Дж на выход, кинетическая энергия 2е-19 Дж.",
    exampleEn: "A 5e-19 J photon spends 3e-19 J on ejection, leaving 2e-19 J of kinetic energy."
  },

  aty_002: {
    nameEn: "Photon Energy (Planck)",
    descRu: "Свет излучается и поглощается неделимыми порциями (квантами, фотонами), энергия которых пропорциональна частоте.",
    descEn: "Light is emitted and absorbed in indivisible packets (quanta, photons) whose energy is proportional to frequency.",
    exampleRu: "Для частоты 10¹⁵ Гц энергия фотона равна 6.6×10⁻¹⁹ Дж.",
    exampleEn: "For a frequency of 10¹⁵ Hz, photon energy is 6.6×10⁻¹⁹ J."
  },

  aty_003: {
    nameEn: "Photon Momentum",
    descRu: "Хотя фотоны не имеют массы покоя, в движении они обладают импульсом и способны оказывать давление на преграду.",
    descEn: "Although photons have no rest mass, in motion they possess momentum and can exert pressure on obstacles.",
    exampleRu: "Свет длиной 500 нм обладает импульсом фотона около 1.3×10⁻²⁷ кг·м/с.",
    exampleEn: "Light with a 500 nm wavelength has a photon momentum of about 1.3×10⁻²⁷ kg·m/s."
  },

  aty_004: {
    nameEn: "de Broglie Wavelength",
    descRu: "Любая движущаяся микрочастица (и макротело тоже) обладает волновыми свойствами.",
    descEn: "Any moving microparticle (and macrobody too) exhibits wave properties.",
    exampleRu: "Для медленного электрона дебройлевская длина волны сопоставима с размерами атомов (~10⁻¹⁰ м).",
    exampleEn: "For a slow electron, the de Broglie wavelength is comparable to atomic dimensions (~10⁻¹⁰ m)."
  },

  aty_005: {
    nameEn: "Bohr's First Postulate (Stationary Orbits)",
    descRu: "Электрон может двигаться вокруг ядра только по определенным «разрешенным» стационарным орбитам, не излучая энергию.",
    descEn: "An electron can only move around the nucleus in specific 'allowed' stationary orbits without emitting energy.",
    exampleRu: "Радиус первой орбиты водорода (n=1) является основой атома.",
    exampleEn: "The radius of the first hydrogen orbit (n=1) is the ground state of the atom."
  },

  aty_006: {
    nameEn: "Bohr's Second Postulate (Emission)",
    descRu: "Излучение или поглощение фотона происходит только при скачкообразном переходе электрона с одной орбиты на другую.",
    descEn: "Photon emission or absorption occurs only during the quantum jump of an electron from one orbit to another.",
    exampleRu: "При падении с E2 (-3.4 эВ) на E1 (-13.6 эВ) излучается фотон с энергией 10.2 эВ.",
    exampleEn: "Dropping from E2 (-3.4 eV) to E1 (-13.6 eV) emits a 10.2 eV photon."
  },

  aty_007: {
    nameEn: "Hydrogen Energy Levels",
    descRu: "Формула энергии стационарных состояний электрона в атоме водорода.",
    descEn: "Formula for the energy of stationary states of an electron in a hydrogen atom.",
    exampleRu: "Энергия второго уровня (n=2) равна -13.6 / 4 = -3.4 эВ.",
    exampleEn: "Energy of the second level (n=2) is -13.6 / 4 = -3.4 eV."
  },

  aty_008: {
    nameEn: "Red Edge of Photoelectric Effect",
    descRu: "Минимальная частота (или максимальная длина волны) света, при которой еще возможен фотоэффект.",
    descEn: "The minimum frequency (or maximum wavelength) of light at which the photoelectric effect is still possible.",
    exampleRu: "Если работа выхода 3е-19 Дж, свет с частотой ниже 4.5×10¹⁴ Гц электроны не выбьет.",
    exampleEn: "If work function is 3e-19 J, light below 4.5×10¹⁴ Hz will not eject electrons."
  },

  aty_009: {
    nameEn: "Mass Defect",
    descRu: "Разность между суммой масс отдельных нуклонов (протонов и нейтронов) и массой образованного ими ядра.",
    descEn: "The difference between the sum of the masses of individual nucleons and the mass of the nucleus they form.",
    exampleRu: "Ядро всегда легче, чем протоны и нейтроны по отдельности.",
    exampleEn: "A nucleus is always lighter than its individual protons and neutrons combined."
  },

  aty_010: {
    nameEn: "Nuclear Binding Energy",
    descRu: "Энергия, которая выделяется при образовании ядра из нуклонов (или необходима для его полного расщепления).",
    descEn: "Energy released when a nucleus forms from nucleons (or needed to completely tear it apart).",
    exampleRu: "Дефект массы Δm высвобождает гигантскую энергию связи по формуле E=mc².",
    exampleEn: "The mass defect Δm releases immense binding energy via E=mc²."
  },

  aty_011: {
    nameEn: "Specific Binding Energy",
    descRu: "Энергия связи, приходящаяся на один нуклон. Характеризует прочность и устойчивость атомного ядра.",
    descEn: "Binding energy per nucleon. Characterizes the strength and stability of an atomic nucleus.",
    exampleRu: "Для гелия удельная энергия составляет около 7 МэВ на каждый нуклон.",
    exampleEn: "For helium, the specific energy is about 7 MeV per nucleon."
  },

  aty_012: {
    nameEn: "Mass-Energy Equivalence",
    descRu: "Фундаментальный закон Эйнштейна: масса тела есть мера содержащейся в нем энергии покоя.",
    descEn: "Einstein's fundamental law: the mass of a body is a measure of its rest energy.",
    exampleRu: "Даже 1 грамм вещества таит в себе фантастические 90 Тераджоулей энергии.",
    exampleEn: "Even 1 gram of matter hides a fantastic 90 Terajoules of energy."
  },

  aty_013: {
    nameEn: "Law of Radioactive Decay",
    descRu: "Описывает экспоненциальное уменьшение числа нераспавшихся нестабильных ядер со временем.",
    descEn: "Describes the exponential decrease over time of the number of undecayed unstable nuclei.",
    exampleRu: "Количество активных ядер со временем убывает по плавной экспоненциальной кривой.",
    exampleEn: "The number of active nuclei decreases over time along a smooth exponential curve."
  },

  aty_014: {
    nameEn: "Half-Life (Period)",
    descRu: "Время, за которое распадается ровно половина изначально имевшихся радиоактивных ядер.",
    descEn: "The time required for exactly half of the initially present radioactive nuclei to decay.",
    exampleRu: "Углерод-14 имеет период полураспада около 5730 лет.",
    exampleEn: "Carbon-14 has a half-life of about 5730 years."
  },

  aty_015: {
    nameEn: "Decay Constant",
    descRu: "Вероятность распада отдельного атомного ядра за 1 секунду. Обратно пропорциональна периоду полураспада.",
    descEn: "The probability of an individual atomic nucleus decaying in 1 second. Inversely proportional to half-life.",
    exampleRu: "Чем меньше период, тем выше лямбда (постоянная распада) — образец активнее.",
    exampleEn: "The shorter the period, the higher the lambda (decay constant) — the sample is more active."
  },

  aty_016: {
    nameEn: "Radioactivity (Activity)",
    descRu: "Число распадов ядер источника за одну секунду. Измеряется в Беккерелях (Бк).",
    descEn: "The number of nucleus decays of a source per second. Measured in Becquerels (Bq).",
    exampleRu: "Активность 100 Бк означает, что происходит 100 распадов в каждую секунду.",
    exampleEn: "An activity of 100 Bq means 100 decays occur every single second."
  }
};


/**
 * Formulaga tarjimalarni birlashtiruvchi funksiya
 * @param {Object} formula - formulas.js dan kelgan formula ob'ekti
 * @returns {Object} - tarjimalar bilan boyitilgan formula
 */
export function enrichFormula(formula) {
  const tr = FORMULA_TRANSLATIONS[formula.id] || {};
  return { ...formula, ...tr };
}

/**
 * Barcha formulalarni tarjimalar bilan boyitish
 * @param {Array} formulas
 * @returns {Array}
 */
export function enrichAllFormulas(formulas) {
  return formulas.map(enrichFormula);
}
