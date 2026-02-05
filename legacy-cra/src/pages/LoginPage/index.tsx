import React from 'react'
import styled from 'styled-components';

const LoginPage = () => {
    return (
        <Container>
            <Content>
                <Center>
                    <LogoOne src="/images/cta-logo-one.svg" alt="logo1"/>
                    {/* <SignUpLink>지금 가입</SignUpLink> */}
                    <Description>
                        내 마음대로 영화 볼 수 있는 플랫폼
                    </Description>
                    <LogoTwo src="images/cta-logo-two.png" alt="logo"/>
                </Center>
                <BgImage/>

            </Content>
        </Container>
    )
}

export default LoginPage;

const Container = styled.section`
overflow:hidden;
display:flex;
flex-direction: column;
text-align: center;
height: 100vh;
`;

const Content = styled.div`
margin-bottom: 10vw;
width:100%;
position: relative;
min-height: 100vh;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 80px 40px;
height: 100%
`;

const BgImage = styled.div`
height:100%;
background-position: top;
background-size:cover;
background-repeat: no-repeat;
background-image: url("images/login-background.jpg");
position: absolute;
top: 0;
right: 0;
left:0;
z-index:-1;
`;

const Center = styled.div`
max-width: 650px;
width: 100%;
display:flex;
flex-direction: column;
`;

const LogoOne = styled.img`
margin-bottom : 12px;
max-width: 600px;
min-height: 1px;
display: block;
width :100%;
`;

const SignUpLink = styled.a`
font-weigh: bold;
color: #f9f9f9;
background-color:  #0063e5;
margin-bottom:12px;
width:100%;
letter-spacing: 1.5px;
font-size:18px;
padding: 16.5px 0;
border: 1px solid transparent;
border-radius: 4px;

&:hover {
    background-color: #0483ee;
}

`;


const Description = styled.div`
color: hsla(0,0%,95.3%,1);
font-size: 11px;
margin: 0 0 24px;
line-height: 1.5;
letter-spacing: 1.5px;
`;

const LogoTwo = styled.img`
max-width: 600px;
margin-bottom: 20px;
display: inline-block;
vertical-align: bottom;
width:100%;
`;


// overflow: hidden ->  넘친 컨텐츠가 잘라지고 보여지지 않음
// ==============

// 뷰포트 : 해당 화면의 너비, 높이를 100vw, 100vh 라고 함
// -> 10vw는 즉 화면 너비의 10분의 1
// ==============

// display: flex; // 부모요소가 됨 
// justify-content: center; // 메인축을 기준으로 아이템 정렬 ( 여기선 수직)
// align-items: center; // 모든 아이템은 컨테이너의 croos axis 중앙에 정렬(여기선 수평)
// flex-direction: column; //메인축이 세로 (아이템들을 세로로 배치 가능)
// 즉 여기에서는 메인축이 세로이므로 justify-content: Center; 에 의해 아이템들이 세로측에서 가운데 정렬,
// 이후 algin-items:Center; 에 의해 아이템들이 세로축 가운데에서 수평(가로)로 정렬됨
// ==================
// min-width: 최소 이 크기보다는 커야된다
// max-width: 최대 이 크기보다는 작아야된다

// ======
// & : 방금 언급한 요소 

// ===
// z-index : 순서
// 숫자가 높을 수록 우선순위가 높아짐
// 여기선 -1이므로 다른 것보다 우선순위가 떨어져서 뒤에 보이는것
// ========
// vertical-align:bottom
// -> 부모 요소의 아래 부분에 정렬