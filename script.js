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
            
            alert(`${user.username}님, 환영합니다!`);
            goToWelcomePage();
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
    goToLoginPage();
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
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
    const termsAgreed = document.getElementById('terms').checked;

    // 비밀번호 확인 검사
    if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
        return;
    }

    // 저장할 데이터 객체 생성
    const userData = {
        username: username,
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

        alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        
        // 회원가입 성공 후 로그인 페이지로 이동
        goToLoginPage();
        
    } catch (error) {
        console.error('LocalStorage 저장 중 오류 발생:', error);
        alert('데이터 저장 중 문제가 발생했습니다.');
    }
}
