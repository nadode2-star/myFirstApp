/**
 * 생년월일을 기반으로 별자리를 가져오는 유틸리티 라이브러리
 */
function getZodiacSign(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const zodiacs = [
        { sign: "염소자리", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, desc: "책임감이 강하고 실용적이며 목표 지향적인 성격입니다.", bg: "capricorn.png" },
        { sign: "물병자리", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, desc: "독창적이고 독립적이며 진보적인 사고를 가진 분입니다.", bg: "aquarius.png" },
        { sign: "물고기자리", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, desc: "예술적 감각이 뛰어나고 공감 능력이 풍부한 낭만주의자입니다.", bg: "pisces.png" },
        { sign: "양자리", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, desc: "열정적이고 자신감이 넘치며 용기 있게 도전하는 리더 타입입니다.", bg: "aries.png" },
        { sign: "황소자리", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, desc: "끈기 있고 신뢰할 수 있으며 안정과 평화를 중요하게 생각합니다.", bg: "taurus.png" },
        { sign: "쌍둥이자리", startMonth: 5, startDay: 21, endMonth: 6, endDay: 21, desc: "호기심이 많고 적응력이 뛰어나며 소통하는 것을 좋아합니다.", bg: "gemini.png" },
        { sign: "게자리", startMonth: 6, startDay: 22, endMonth: 7, endDay: 22, desc: "직관력이 뛰어나고 다정하며 소중한 사람들을 잘 보살피는 성격입니다.", bg: "cancer.png" },
        { sign: "사자자리", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, desc: "창의적이고 열정적이며 어디서나 에너지가 넘치는 주인공 타입입니다.", bg: "leo.png" },
        { sign: "처녀자리", startMonth: 8, startDay: 23, endMonth: 9, endDay: 23, desc: "꼼꼼하고 분석적이며 실질적으로 문제를 해결하는 능력이 뛰어납니다.", bg: "virgo.png" },
        { sign: "천칭자리", startMonth: 9, startDay: 24, endMonth: 10, endDay: 22, desc: "조화와 균형을 중시하며 공정하고 사교적인 성격을 가졌습니다.", bg: "libra.png" },
        { sign: "전갈자리", startMonth: 10, startDay: 23, endMonth: 11, endDay: 22, desc: "통찰력이 뛰어나고 열정적이며 신비로운 매력을 지닌 분입니다.", bg: "scorpio.png" },
        { sign: "사수자리", startMonth: 11, startDay: 23, endMonth: 12, endDay: 21, desc: "자유를 사랑하고 낙천적이며 새로운 경험을 추구하는 탐험가입니다.", bg: "sagittarius.png" }
    ];

    for (const zodiac of zodiacs) {
        if ((month === zodiac.startMonth && day >= zodiac.startDay) || (month === zodiac.endMonth && day <= zodiac.endDay)) {
            return zodiac;
        }
    }
    return zodiacs[0];
}
