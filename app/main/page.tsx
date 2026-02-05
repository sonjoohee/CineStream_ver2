import React from 'react';
import Nav from '@/components/nav';
import Banner from '@/components/banner';
import Category from '@/components/category';
import Row from '@/components/row';
import requests from '@/lib/requests';

const MainPage = () => {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row 
        title="Trending Now"
        id="TN" 
        fetchUrl={requests.fetchTrending} 
      />
      <Row 
        title="Action Movies" 
        id="AM" 
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
    </Container>
  );
};

export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

// We need to import styled here since it's used in the Container component
import styled from 'styled-components';