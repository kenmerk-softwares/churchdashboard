
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Table, Image, Container } from '@themesberg/react-bootstrap';

import Documentation from "../../components/Documentation";

import USAFlag from "../../assets/img/flags/united-states-of-america.svg";
import CanadaFlag from "../../assets/img/flags/canada.svg";
import UKFlag from "../../assets/img/flags/united-kingdom.svg";
import FranceFlag from "../../assets/img/flags/france.svg";
import JapanFlag from "../../assets/img/flags/japan.svg";
import GermanyFlag from "../../assets/img/flags/germany.svg";
import { PageTrafficTable, PageVisitsTable, RankingTable } from "../../components/Tables";


export default () => {
  return (
    <article>
      <Container className="px-0">
         <PageVisitsTable />
    

      </Container>
    </article>
  );
};