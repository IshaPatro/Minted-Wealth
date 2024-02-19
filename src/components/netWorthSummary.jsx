import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";

export const NetWorthSummary = ({ assets, liabilities, netWorthData }) => {
  const formatNumber = (value) =>
    parseFloat(value).toLocaleString(undefined, { maximumFractionDigits: 2 });

  const calculateNetWorth = () => {
    const totalAssets = Math.round(
      assets.reduce((total, asset) => total + asset.currentValue, 0)
    );
    let totalLiabilities = Math.round(
      liabilities.reduce((total, liability) => total + liability.currentValue, 0)
    );
    return totalAssets - totalLiabilities;
  };

  const renderCard = (title, value, color) => (
    <Col sm={4}>
      <Card
        style={{
          background: `linear-gradient(to right, ${color})`,
          margin: "10px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Card.Title>{title}</Card.Title>
        <Card.Text>{value}</Card.Text>
      </Card>
    </Col>
  );

  const assetsLiabilitiesChartOptions = {
    chart: {
      id: "assets-liabilities-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: netWorthData[0].years.map(String),
    },
    colors: ['#00FF00', '#FF0000'],
    tooltip: {
      enabled: true,
      style: {
        background: '#000',
      },
    },
    theme: {
      mode: 'dark',
    },
    plotOptions: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      grid: {
        borderColor: ['#000']
      },
      dataLabels: {
        enabled: true,
      },
    },
  };

  const netWorthChartOptions = {
    chart: {
      id: "net-worth-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: netWorthData[0].years.map(String),
    },
    colors: ['#800080'],
    tooltip: {
      enabled: true,
    },
     theme: {
       mode: 'dark',
     },
    plotOptions: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      grid: {
        borderColor: 'black',
      },
      dataLabels: {
        enabled: true,
      },
    },
  };

  return (
    <Row>
      {renderCard(
        "Assets",
        formatNumber(
          assets.reduce((total, asset) => total + asset.currentValue, 0)
        ),
        "green, lightgreen"
      )}
      {renderCard(
        "Liabilities",
        formatNumber(
          liabilities.reduce(
            (total, liability) => total + liability.currentValue,
            0
          )
        ),
        "red, lightcoral"
      )}
      {renderCard(
        "Net Worth",
        formatNumber(calculateNetWorth()),
        "#800080, #6a0dad"
      )}
      <Col sm={6}>
        <ReactApexChart
          options={assetsLiabilitiesChartOptions}
          series={[
            {
              name: "Assets",
              data: netWorthData[0].totalAssets.map(Number),
            },
            {
              name: "Liabilities",
              data: netWorthData[0].totalLiabilities.map(Number),
            },
          ]}
          type="line"
          height={300}
        />
      </Col>
      <Col sm={6}>
        <ReactApexChart
          options={netWorthChartOptions}
          series={[
            {
              name: "Net Worth",
              data: netWorthData[0].totalNetWorth.map(Number),
            },
          ]}
          type="line"
          height={300}
        />
      </Col>
    </Row>
  );
};
