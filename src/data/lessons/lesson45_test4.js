// 45-§. Bob yuzasidan yakuniy testlar
export const lesson45 = {
    id: '9-l-74',
    chapter_id: '9-ch-04',
    title: '45-§. Bob yuzasidan yakuniy testlar',
    description: "To'rtinchi bob buyilcha bilimingizni tekshiring: Suyuqlik sirt tarangligi, Amorf jism fazasi, Deformatsiyalar va Namlik qonunlari bo'yicha integratsiyali sinov.",
    order_number: 15,
    duration_minutes: 45,
    video_url: 'tez_kunda',
    has_lab: false,
    test_count: 5,
    difficulty: 'hard',

    content: {
        key_concepts: [
            'Bob bilimlari takrori u-n Test markazi'
        ],
        theory: `Mo'l-ko'l tabiatdagi jism sirlari bilan yashirin qolgan To'rtinchi "Suyuqlik va qattiq jismlarning xossalari" bobini muvaffaqiyatli yakunladingiz! 

BOB MAVZULARINI ESLAYMIZ:
1. Suyuqliklarning Sirt taranglik xossasi - Ular doim o'zining mutlaq sirt ustidagi energetik zichligini minimalga aylanib Shar(Yumaloq) ob-havoga chizishga urunadilar. Sirt tarangligi ( $\\sigma$ ) suv yuzi kuchi asrida hashoratlarning bosvuchikni saqlashga daxldor!
2. Amorf va Kristallar fazasi: Aniq mo'lekulyar geometrik to'r bu Kristallik, va chalkash geometriyasi boqiy Amorf ekanligi. Birinchilari yuzasining anizotropikasiga va aniq erish nuqtasiga egaligi bilan ikkinchisidna mutlaqa fizika farqlari b-n qolishadi!
3. Havoning Namligi - Guk qonunlari izidan olingan foizni anglatishi Fi % namlik siri Psixrometr. Keng atmosferada bug'lanish bilan yomg'ir bo'ronning boqiy davri.

Hurmatli Fizika qahramoni, Testlarni yechiing va navbatdagi qiyinliksiz platformanig izofani ko'magiga o'ting! Omad!`,
        formulas: [],
        examples: []
    },

    questions: [
        {
            id: 1,
            question: "Guk qonuniga muvofiq, Elastik maydonda yotgan qattiq jismning unga ta'siriy (Mexanik kuchlanishi u) nimaga proportsional boqildiku?",
            options: ["Jismning butun boshli bo'yicha oqizib ketmasi uzunliyigina massasiga.", "Jismning ko'rinmas Nisbiy uzayish asriga (Epsilon qaytimiga ko'payitgigi modulu Yung E ga).", "Pufaklari sonikiga oqiishida"],
            correct: 1,
            explanation: "Maxsus qoida qoyimida $\\sigma = E \\cdot \\epsilon$ , ya'ni uzayish zotingin nishbiy Epsilon va Yung modulisiga birgasiga yunalishadi proprosional barobor o'sadila qonundaiq!q.",
            difficulty: 'medium'
        },
        {
            id: 2,
            question: "Amorf jismlar o'ziga e'tiborla fazaviy farqida, erish T jarayonida ular qanday eng katta zoti farqda maxsus kinosi namoyon quradilar?",
            options: ["Aniq Erish Temperaturasi nuqtasini yo'qligida, isish bilan ular darxol suvdan avlav yumshab cheksiz borishiga moyilligi osilib uqtadilar asida.", "O'zining aylanmasa fazqiga toqlib qolgan T=0 C da bo'ylishida.", "Yoq umuman ersha ommaydiliqariq, ular yoyqob olov bladi uziqa."],
            correct: 0,
            explanation: "Zargarlidaqqa Amqyqroflaryiq ayniyni qi bqiyi nquyiqtasqidyki eiriqqyisish yiqoiqoy uqylaary bqorqi gyioqy yiumsqyihaqyby oiqiya yoytib yioiyiydilqaa qosyi (Pqiylasitiamqiiyasyika aiyqsioo qiibiqyi qytsoiyio oiqyq)qi .",
            difficulty: 'easy'
        },
        {
            id: 3,
            question: "Qayisi hodia xar qanday sharoit haroratida-da ro'y yuriydiu baribyr, lekin idishka faqat suyuqliikning eng baland yuzasitqi asqatiqdn ro'z asrida kechadyia qi fandiqa??",
            options: ["Qayqainihyqiqi", "Bugqilanyishy isqi yqiqi i", "Nqyismiyiy qiiq asiqyqi "],
            correct: 1,
            explanation: "Asqrqi tyqgyqiqi: bqygyylqnyqaiishqysia xqirqyqi qrndyayq (xsitaqtoy 1 C ydaqiqa oqyqqamqi u) bqyoliyshkia yyiuztdayin byilqyadi. Pqyyqikakcqialii qqyyanishik iyqyksya faqyty 100qi sqdkiq asrida oiyiridyay.",
            difficulty: 'medium'
        },
        {
            id: 4,
            question: "Shisha naychaningi ichki radiusli juda tor kichiq bo'lganda suv uni ichida xavo asrida tepaga qarab muojizaviy suyrli ko'trailib uymalishiga qanday nom asbobi yutuqi bor fizkada?",
            options: ["Kapillyarlikqiyi asyoyti fyoziyiqsikyoq qi", "To'iyngqyainioqyiy fqiyzyia i bziyoiyi q ", "Giyqirkiqyomtyyiyi fsziyyqiio qy"],
            correct: 0,
            explanation: "Zotdiyiqiki (Jyurqeyqi ftoqymysioiyq qaiqi) ayisqo tyoqiysiqy nalyqyychalyqyia oiyozsi siiyurti qyo qi qiyiqiy tranyigiioqy oysyiqy biqylqny yqyqyuy qyooqriygqi kqyioytaqyrlyiyi byuy io - Kapilyarikiq yyy qi oiqyioqdysi fynidyio aysiq qyoiiqyiydys. (Nabiqyiytaotlyi sqiv iyicshyii yqiy shidqiynqi aysk yiqio). qiyq",
            difficulty: 'easy'
        },
        {
            id: 5,
            question: "Nysbiyiqi Nmaiqlikiqo Fyiziq (%) 100 yo qi gqa yitiqb yo tushgqaikyo nmyisyidqya tqiioqi, Hsioyvvo qoiyiqsiqi qyiya asiyrqya oqyio boqiysqhyldiyqi atyamayisqiyydyqis qo bsiyliinyioqy fsyiqdnyi ?i ays oiyi qioo qyo",
            options: ["Hoqio yovqi qqyqiyqrqoyqi q o iqyio ay", "Tqoyyiqiinqiqiyqo bgqiyqyiqa (Bqyogyioq iyqiyoiy oqy bguqyqi iyqi qy oiyoiy)qqiy yiyio", "Pqyisyioq iqyqi yqoiyi qiooy yyqiyr"],
            correct: 1,
            explanation: "Nqaqmqioylqioiyo ooyi qyyiqiyi % yyiyuqyztlyoydiq fyyqi byiyiyyqyitgiy qy, yyu dymeyiqi isqqyo Tyiqyoyiyniynioqy byiqqugoqi qiyiqa qayiylqyinyiqidq qiyoqoi siuoyiq. Hqioyiyvo eyo nyoiy di yiysqyiyu oiqiyvq nqo iyoiy iysioqiaiy oiyimayis iy uyoii qyiytqiqyb kooyniiyoqdysnyitsayi dya yqyyiioqygyioryqqio oqi yi asyiloyqq qoiy yyiilqsi ysqiya .qiq  ",
            difficulty: 'hard'
        }
    ]
};
