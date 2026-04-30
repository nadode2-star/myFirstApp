/* 
   HTML 태그의 onclick 속성에서 호출할 수 있도록 
   전역 함수(Global Function)로 정의합니다.
*/

function goToLoginPage() {
    window.location.href = 'login.html';
}

function goToSignupPage() {
    window.location.href = 'signup.html';
}

function goToWelcomePage() {
    window.location.href = 'welcome.html';
}

function goToIndexPage() {
    window.location.href = 'index.html';
}

/**
 * 로그인 처리 함수
 */
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // LocalStorage에서 유저 목록 가져오기
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // 이메일과 비밀번호가 일치하는 유저 찾기
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // 로그인 성공 시 세션 데이터 저장 (보통은 토큰을 저장하지만 교육용으로 객체 저장)
            localStorage.setItem('currentUser', JSON.stringify(user));

            triggerShootingStars();
            showModal('로그인 성공!', `${user.username}님, 환영합니다!`, () => {
                goToWelcomePage();
            });
        } else {
            alert('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
    } catch (error) {
        console.error('로그인 처리 중 오류 발생:', error);
        alert('로그인 중 문제가 발생했습니다.');
    }
}

/**
 * 로그아웃 처리 함수
 */
function handleLogout() {
    localStorage.removeItem('currentUser');
    alert('로그아웃 되었습니다.');
    goToIndexPage();
}

/**
 * 회원가입 폼 제출 처리 함수
 * 데이터를 LocalStorage에 저장합니다.
 */
function handleSignup(event) {
    // 폼의 기본 제출 동작(페이지 새로고침)을 방지합니다.
    event.preventDefault();

    // 각 입력 필드의 값을 가져옵니다.
    const username = document.getElementById('username').value;
    const birthdate = document.getElementById('birthdate').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

    // 비밀번호 확인 검사
    if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
        return;
    }

    // 저장할 데이터 객체 생성
    const userData = {
        username: username,
        birthdate: birthdate,
        email: email,
        password: password, // 실제 서비스에서는 보안상 이렇게 저장하면 안 되지만, 교육용이므로 진행합니다.
        signupDate: new Date().toISOString()
    };

    try {
        // LocalStorage에 'users'라는 키로 저장된 데이터를 가져오거나 없으면 빈 배열 생성
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // 중복 이메일 체크 (선택 사항)
        if (existingUsers.some(user => user.email === email)) {
            alert('이미 가입된 이메일입니다.');
            return;
        }

        // 새로운 사용자 데이터 추가
        existingUsers.push(userData);

        // 다시 LocalStorage에 문자열 형태로 저장
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // 별똥별 효과 실행
        triggerShootingStars();

        // 커스텀 모달 표시
        showModal('회원가입 완료!', '가입이 완료되었습니다! 확인을 누르면 로그인 페이지로 이동합니다.', () => {
            goToLoginPage();
        });

    } catch (error) {
        console.error('LocalStorage 저장 중 오류 발생:', error);
        alert('데이터 저장 중 문제가 발생했습니다.');
    }
}



/**
 * 별똥별 효과를 화면에 생성하는 함수
 */
function triggerShootingStars() {
    const starCount = 60; // 더 많은 별
    for (let i = 0; i < starCount; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'star';

            // 랜덤한 위치, 각도, 타이밍 설정
            const top = Math.random() * 100 + '%';
            const left = Math.random() * 100 + '%';
            const delay = Math.random() * 1 + 's';
            const duration = (Math.random() * 1.5 + 1.5) + 's'; // 더 빠르게 (1.5s ~ 3s)

            star.style.top = top;
            star.style.left = left;
            star.style.animationDelay = delay;
            star.style.animationDuration = duration;

            // 랜덤한 각도 추가
            const angle = Math.random() * 360;
            star.style.transform = `rotateZ(${angle}deg)`;

            document.body.appendChild(star);

            // 애니메이션이 끝나면 제거
            setTimeout(() => {
                star.remove();
            }, 4000);
        }, i * 150); // 간격을 조금 띄워 전체 효과 시간을 늘림 (약 9초)
    }
}

/**
 * 커스텀 프리미엄 모달 표시 함수
 */
function showModal(title, message, callback) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-title">${title}</div>
            <div class="modal-message">${message}</div>
            <button class="modal-btn">확인</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // 강제 리플로우 후 클래스 추가 (애니메이션 유도)
    overlay.offsetHeight;
    overlay.classList.add('active');

    const btn = overlay.querySelector('.modal-btn');
    btn.onclick = () => {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
            if (callback) callback();
        }, 300);
    };
}

/**
 * 배경에 반짝이는 별을 생성하는 함수
 */
function initBackgroundStars() {
    const starContainer = document.body;
    const starCount = 150; // 별의 개수 상향

    let createdStars = 0;
    while (createdStars < starCount) {
        const topVal = Math.random() * 100;
        const leftVal = Math.random() * 100;

        const isSignup = document.body.classList.contains('signup-bg');
        const isLogin = document.body.classList.contains('login-bg');
        const distFromCenter = Math.sqrt(Math.pow(leftVal - 50, 2) + Math.pow(topVal - 50, 2));

        // 회원가입 화면: 중앙 우주선 영역 제외
        if (isSignup && distFromCenter < 25) continue;

        // 로그인 화면: 중앙 창문 내부만 허용 (반경 약 30% 내외로 좁힘)
        if (isLogin && distFromCenter > 27) continue;

        const star = document.createElement('div');
        star.className = 'twinkle-star';

        // 랜덤 사이즈 (4px ~ 10px)
        const size = Math.random() * 6 + 4 + 'px';
        star.style.width = size;
        star.style.height = size;

        star.style.top = topVal + 'vh';
        star.style.left = leftVal + 'vw';

        // 랜덤 애니메이션 속성 (기존보다 1.5배 빠르게 수정)
        star.style.setProperty('--twinkle-duration', Math.random() * 2.7 + 1.3 + 's');
        star.style.setProperty('--twinkle-delay', Math.random() * 8 + 's');

        starContainer.appendChild(star);
        createdStars++;
    }
}

// 페이지 로드 시 우주 테마 배경이 있다면 별 초기화
document.addEventListener('DOMContentLoaded', () => {
    const spaceThemes = ['signup-bg', 'login-bg', 'welcome-bg', 'main-bg'];
    if (spaceThemes.some(cls => document.body.classList.contains(cls))) {
        initBackgroundStars();
    }
});




