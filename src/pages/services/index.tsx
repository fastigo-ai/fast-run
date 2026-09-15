import React from 'react';
import { GenericServicePage } from './GenericServicePage';
import { servicesDetailedData } from './serviceDetailsData';

export const CloudPage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['cloud']} />
);

export const CybersecurityPage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['cybersecurity']} />
);

export const DataAnalyticsPage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['data-analytics']} />
);

export const IoTDigitalEngineeringPage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['iot-and-digital-engineering']} />
);

export const EnterpriseSolutionsPage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['enterprise-solutions']} />
);

export const CognitiveBusinessPage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['cognitive-business-operations']} />
);

export const NetworkSolutionsPage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['network-solutions-and-services']} />
);

export const SustainabilityPage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['sustainability']} />
);

export const InteractivePage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['fastigo-interactive']} />
);

export const MobilityPage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['mobility']} />
);

export const TechPage: React.FC = () => (
  <GenericServicePage service={servicesDetailedData['tech']} />
);
