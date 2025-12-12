import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate} from 'react-router-dom';
import app from "../firebase";
import { getAuth, GoogleAuthProvider,onAuthStateChanged,signInWithPopup, signOut } from 'firebase/auth';
//onAuthStateChanged: 로그인 되어 있는지 안되어 있는지 체크 해주는거 

interface UserData {
  photoURL?: string;
  displayName?: string;
}

interface NavWrapperProps {
  show: boolean;
}

//모든 컴포넌트에서 nav.js를 사용하고 있음 
const Nav = () => {
  const initialUserDataString = localStorage.getItem("userData");
  let initialUserData = {};
  if (initialUserDataString) {
    try {
      initialUserData = JSON.parse(initialUserDataString);
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
    }
  }

  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [userData, setuserData] = useState<UserData>(initialUserData);

  
  useEffect(() => {

    //로그인 페이지에서만 해당될수 있게 조건 추가 : 안 추가하면 search등 다른 페이지를 넘어가려고 햇도  메인 페이지가 나옴 

    onAuthStateChanged(auth, (user) => {
        if(user){
            if(pathname === "/"){  //pathname이 로그인 페이지 일때만 
            navigate("/main");
            }
        }else {
            navigate("/");
        }
        })

  }, [auth,navigate,pathname])
  //"/" 로그인 페이지로 갈 수 있도록
  //"/main" 메인 페이지로 갈 수 있도록 
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll",handleScroll);
    };
  }, []);
  //[]안에 있으면 그게 변할 때 마다 실행되고 아니면 빈배열이면 컴포넌트가 딱 한번 실행

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
        setuserData({});
        navigate("/");
    })
    .catch((error) => { 
        console.log(error)})

  }
  
  

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  }
    
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const handleSearch = () => {
    if (searchValue) {
      navigate(`/search?q=${searchValue}`);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const handleAuth = () => {
    signInWithPopup(auth,provider)
    .then(result => {
        setuserData(result.user as UserData);
        localStorage.setItem("userData", JSON.stringify(result.user));
    })
    .catch(error => {
        console.log(error);
    })

}

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            value={searchValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className='nav__input'
            type="text"
            placeholder='검색해주세요.'
          />
          <SearchIcon onClick={handleSearch}>
            <img src="/images/search-icon.svg" alt="Search" />
          </SearchIcon>
          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleSignOut}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
}

export default Nav;

const Login = styled.a`
    background-color: rgba(0,0,0,0.5);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    transition: all 0.2s ease 0s;
    cursor: pointer;
    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }   
    `;

const Input = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0, 0, 0, 0.582);
    border-radius: 5px;
    color: white;
    padding: 10px 30px 10px 10px;
    border: none;
    width: 180px; /* 너비 명시 */
`;

const SearchIcon = styled.div`
  position: fixed;
  left: calc(50% + 70px); /* 입력창 내부 오른쪽에 위치 */
  transform: translate(-50%, 0);
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
  top: 24px;
  z-index: 1; /* 아이콘이 입력창 위에 표시되도록 */
`;

const DropDown = styled.div`
position: absolute;
top: 48px;
right: 0px;
background: rgb(19,19,19);
border: 1px solid rgba(151,151,151,0.34);
border-radius: 4px;
box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
padding: 10px;
font-size: 14px;
letter-spacing: 3px;
width: 100px;
opacity:0;
`;

const SignOut = styled.div`
position: relative;
height: 48px;
width:48px;
display:flex;
cursor:pointer;
align-items: center;
justify-content: center;

&:hover{
    ${DropDown}{
        opacity:1;
        transition-duration: 1s;
    }
}
`;

const UserImg = styled.img`
border-radius: 50%;
width:100%;
height: 100%;
`;





const NavWrapper = styled.nav<NavWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  diplay: inlineblock;

  img {
    display: block;
    width: 100%;
  }
`;