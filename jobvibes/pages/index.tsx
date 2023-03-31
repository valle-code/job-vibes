import { useState } from 'react';
import type { NextPage } from 'next';
import { Container, Navbar, Text, Button, Grid, Col } from '@nextui-org/react';
import OptionCard from '../components/Index/OptionsCard';
import Jumbotron from '../components/Index/Jumbotron';

const Home: NextPage = () => {
  const [activeLink, setActiveLink] = useState<number | null>(null);

  const handleLinkMouseEnter = (index: number) => {
    setActiveLink(index);
  };

  const handleLinkMouseLeave = () => {
    setActiveLink(null);
  };

  return (
    <Container css={{"height": "100vh"}}>
      {/* Navbar */}
      <Navbar isBordered variant="sticky" className="nav">
        <Navbar.Brand className="nav">
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content className="nav" enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link className="nav" href="#">Features</Navbar.Link>
          <Navbar.Link href="#">
            Customers
          </Navbar.Link>
          <Navbar.Link className="nav" href="#">Pricing</Navbar.Link>
          <Navbar.Link className="nav" href="#">Company</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content className="nav">
          <Navbar.Link className="nav" color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item className="nav">
            <Button auto flat href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      {/* Jumbotron */}
      <Jumbotron text1="Hey" text2="Ipsum" />
      {/* Cards */}
      <Grid.Container gap={2}>
        <Grid xs={12} sm={4}>
          <OptionCard
            label="Algo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://littlevisuals.co/images/red_dawn.jpg"
            studentCount="3,500"
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <OptionCard
            label="Algo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://littlevisuals.co/images/sunset.jpg"
            studentCount="1,000"
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <OptionCard
            label="Algo"
            title="Lorem ipsum dolor sit amet, consectetur"
            imageURL="https://littlevisuals.co/images/tail.jpg"
            studentCount="5,000"
          />
        </Grid>
      </Grid.Container>
    </Container>   
  )
}

export default Home