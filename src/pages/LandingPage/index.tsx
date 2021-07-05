import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

import {
  IoMdCart,
  IoMdBuild,
  IoIosSchool,
  IoIosShirt,
  IoIosHourglass,
  IoIosIceCream,
  IoIosHeadset,
  IoIosBulb,
} from 'react-icons/io';
import Banner from '../../components/Banner';
import SliderProducts from '../../components/SliderProducts';
import HeaderSlider from '../../components/HeaderSlider';
import CategoriesCard from '../../components/CategoriesCard';
import Footer from '../../components/Footer';

import { Title, Container, Sider, Imagem } from './styles';
import aboutUnijobs from '../../assets/about-unijobs.png';
import ScrollToTopOnMount from '../../utils/ScrollToTopOnMount';
import api from '../../services/api';
import { ITypes } from '../../services/types';

const LandingPage: React.FC = () => {
  const [servicesTypes, setServicesTypes] = useState<ITypes[]>([]);
  const [productsTypes, setProductsTypes] = useState<ITypes[]>([]);

  useEffect(() => {
    api.get('/tiposServicos').then(response => {
      console.log(response.data);
      setServicesTypes(response.data);
    });
    api.get('/tipos_produtos').then(response => {
      console.log(response.data);
      setProductsTypes(response.data);
    });
  }, []);

  return (
    <>
      <ScrollToTopOnMount />
      <Banner backIcon={false} />
      <HeaderSlider />
      <Container>
        <Title>
          Adicionados recentemente <Link to="/catalog/1">Ver tudo</Link>
        </Title>
        <SliderProducts />
        <Title>Navegar por tipo de item</Title>
        <Sider>
          <CategoriesCard
            icon={IoMdCart}
            title="Produtos"
            link="/categories/produtos/0"
          />
          <CategoriesCard
            icon={IoMdBuild}
            title="Serviços"
            link="/categories/servicos/0"
          />
        </Sider>

        <Title>Serviços</Title>
        <Carousel
          infinite
          slidesPerPage={4}
          arrowLeft={<FiChevronLeft size={60} color="#0E346A" />}
          arrowRight={<FiChevronRight size={60} color="#0E346A" />}
          addArrowClickHandler
          breakpoints={{
            640: {
              slidesPerPage: 1,
              arrows: false,
            },
            900: {
              slidesPerPage: 2,
              arrows: false,
            },
          }}
        >
          {servicesTypes.map(servicesType =>(
            <CategoriesCard
              icon={IoIosIceCream}
              title={servicesType.nome}
              link={"/categories/tiposServicos/"+ servicesType.id_tipo_servico +"/servicos"}
            />
          ))}
          
        </Carousel>
        <Title>Produtos</Title>
        <Carousel
          infinite
          slidesPerPage={4}
          arrowLeft={<FiChevronLeft size={60} color="#0E346A" />}
          arrowRight={<FiChevronRight size={60} color="#0E346A" />}
          addArrowClickHandler
          breakpoints={{
            640: {
              slidesPerPage: 1,
              arrows: false,
            },
            900: {
              slidesPerPage: 2,
              arrows: false,
            },
          }}
        >
          {productsTypes.map(productsType =>(
            <CategoriesCard
              icon={IoIosIceCream}
              title={productsType.nome}
              link={"/categories/tipos_produtos/"+ productsType.id_tipo_produto +"/produtos"}
            />
          ))

          }
          
        </Carousel>
        <Title>Sobre a UniJobs</Title>
        <Imagem src={aboutUnijobs} alt="Sobre a UniJobs" />
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
