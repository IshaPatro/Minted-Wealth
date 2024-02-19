import React, { useState, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie } from 'recharts';
import { stockData } from '../data/stockData';
import { Navigation } from "./navigationBar";
import CardContent from '@mui/material/CardContent';

const OverallProfit = () => {
  const [rowData, setRowData] = useState(null);
  const [inputRow, setInputRow] = useState({
    stockSymbol: '',
    quantity: 0,
    buyPrice: 0,
    sellPrice: 0,
  });
  const [totalProfit, setTotalProfit] = useState(0);
  const [percentage, setPercentage] = useState(0);
  let pnl = 0;
  let totalInvested = 0;

  const ColourCellRenderer = (props) => {
    if (props.value >= 0) {
      return <span style={{ color: '#008000' }}>{props.value}</span>;
    } else {
      return <span style={{ color: '#FF0000' }}>{props.value}</span>;
    }
  };

  const [chartData, setChartData] = useState([]);
  const [profitChartData, setProfitChartData] = useState([]);
  const [lossChartData, setLossChartData] = useState([]);
  const getColorForPnlPercentage = (pnlPercentage) => {
    const minValue = -10;
    const maxValue = 10;

    const normalizedValue = Math.max(Math.min((pnlPercentage - minValue) / (maxValue - minValue), 1), 0);
    const red = 255 - Math.round(normalizedValue * 255);
    const green = Math.round(normalizedValue * 255);

    return `rgb(${red}, ${green}, 0)`;
  };

  function isFirstFourFieldsCompleted(params) {
    if (params.rowPinned !== 'top') return false;

    const firstFourFields = ['stockSymbol', 'quantity', 'buyPrice', 'sellPrice'];
    return firstFourFields.every((field) => inputRow[field]);
  }

  const [columnDefs] = useState([
    { field: 'stockSymbol', editable: true },
    { field: 'quantity', editable: true },
    { field: 'buyPrice', editable: true },
    { field: 'sellPrice', editable: true },
    { field: 'investedAmount', valueGetter: calculateInvestedAmount },
    { field: 'PnL', cellRenderer: ColourCellRenderer, valueGetter: calculatePnL },
    {
      field: 'PnLPercentage',
      valueGetter: calculatePnlPercentage,
      headerName: 'PnL%',
      cellStyle: (params) => {
        const pnlPercentage = parseFloat(params.value);
        const color = getColorForPnlPercentage(pnlPercentage);
        return { backgroundColor: color };
      },
    },
  ]);

  const [defaultColDef] = useState({
    flex: 1,
    editable: false,
    valueFormatter: (params) =>
      isEmptyPinnedCell(params) ? createPinnedCellPlaceholder(params) : undefined,
  });

  const getRowStyle = useCallback(
    ({ node }) => (node.rowPinned ? { fontWeight: 'bold', fontStyle: 'italic' } : {}),
    []
  );

  const onCellEditingStopped = useCallback(
    (params) => {
      if (isFirstFourFieldsCompleted(params)) {
        setRowData([...rowData, inputRow]);
        setInputRow({
          stockSymbol: '',
          quantity: 0,
          buyPrice: 0,
          sellPrice: 0,
        });
      }
    },
    [rowData, inputRow]
  );

  const onGridReady = () => {
    setRowData(stockData.map(row => ({
      ...row,
      investedAmount: calculateInvestedAmount(row),
      PnL: calculatePnL(row),
      PnLPercentage: calculatePnlPercentage(row),
    })));
  };

  function calculateInvestedAmount(params) {
    const rowData = params.data || params;
    const buyPrice = rowData.buyPrice || 0;
    const quantity = rowData.quantity || 0;
    return buyPrice * quantity;
  }

  function calculatePnL(params) {
    const rowData = params.data || params;
    const buyPrice = rowData.buyPrice || 0;
    const quantity = rowData.quantity || 0;
    const sellPrice = rowData.sellPrice || 0;
    return sellPrice * quantity - buyPrice * quantity;
  }

  function calculatePnlPercentage(params) {
    const rowData = params.data || params;
    const buyPrice = rowData.buyPrice || 0;
    const quantity = rowData.quantity || 0;
    const sellPrice = rowData.sellPrice || 0;
    const investedAmount = buyPrice * quantity;
    if (investedAmount === 0) {
      return '0.00%';
    }
    const PnL = sellPrice * quantity - buyPrice * quantity;
    return ((PnL / investedAmount) * 100).toFixed(2) + '%';
  }

  function isEmptyPinnedCell(params) {
    return (
      (params.node.rowPinned === 'top' && params.value == null) ||
      (params.node.rowPinned === 'top' && params.value === '')
    );
  }

  function createPinnedCellPlaceholder({ colDef }) {
      const placeholderFields = ['stockSymbol', 'quantity', 'buyPrice', 'sellPrice'];
      if (placeholderFields.includes(colDef.field)) {
        return colDef.field === 'stockSymbol' ? 'Stock Name...' : colDef.field + '...';
      }
      return '';
  }

  const onCellValueChanged = useCallback(
    (params) => {
      var overallProfitData = [];
      params.api.forEachNodeAfterFilterAndSort((node, index) => {
        const rowData = node.data;
        const updatedRowData = {
          ...rowData,
          investedAmount: calculateInvestedAmount(rowData),
          PnL: calculatePnL(rowData),
          PnLPercentage: calculatePnlPercentage(rowData),
        };
        pnl = pnl + calculatePnL(rowData);
        totalInvested = totalInvested + calculateInvestedAmount(rowData);
        overallProfitData.push(updatedRowData);

        setTotalProfit(pnl);
        setPercentage((pnl/totalInvested*100).toFixed(2));
      });
    },
    []
  );

  useEffect(() => {
    if (rowData) {
      const chartData = rowData.map(row => ({
        stockSymbol: row.stockSymbol,
        investedAmount: calculateInvestedAmount(row),
      }));
	  console.log("Row Data: ", rowData);
      setChartData(chartData);

      const profitData = rowData.filter((row) => calculatePnL(row) > 0);
      const lossData = rowData.filter((row) => calculatePnL(row) < 0);

      const updatedProfitChartData = profitData.map((row) => ({
        title: row.stockSymbol,
        value: Math.abs(calculatePnL(row)),
        color: '#008000',
      }));

      const updatedLossChartData = lossData.map((row) => ({
        title: row.stockSymbol,
        value: Math.abs(calculatePnL(row)),
        color: '#FF0000',
      }));

      rowData.map((row) => {
        pnl = pnl + calculatePnL(row);
        totalInvested = totalInvested + calculateInvestedAmount(row);
      })

      setTotalProfit(pnl);
      setPercentage((pnl/totalInvested*100).toFixed(2));
      setProfitChartData(updatedProfitChartData);
      setLossChartData(updatedLossChartData);
    }
  }, [rowData]);

  return (
    <div>
      <Navigation/>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginTop: '7%', width:'95%' }}>
        <div style={{ width: '40%' }}>
          <h2 style={{ display: "flex", justifyContent:"center"}}>Invested Amount Chart</h2>
          <ResponsiveContainer width="100%" height={400} padding={0}>
            <BarChart data={chartData}>
              <XAxis dataKey="stockSymbol" />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: 'black', color: 'white' }} />
              <Bar dataKey="investedAmount" fill="#68686e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ width: '25%' }}>
          <h2 style={{ display: "flex", justifyContent:"center"}}>Profit Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={profitChartData}
                dataKey="value"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#008000"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <CardContent height={60} style={{ padding: "5px", background: totalProfit >= 0 ? "green" : "red" }}>
            <h3 style={{ display: "flex", justifyContent:"center"}}>Total PnL : {totalProfit}</h3>
          </CardContent>
        </div>
        <div style={{ width: '25%' }}>
          <h2 style={{ display: "flex", justifyContent:"center"}}>Loss Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={lossChartData}
                dataKey="value"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#FF0000"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <CardContent height={60} style={{ padding: "5px", background: totalProfit >= 0 ? "green" : "red" }}>
	          <h3 style={{ display: "flex", justifyContent:"center"}}>Total PnL : {percentage}%</h3>
	      </CardContent>
        </div>
      </div>
      <div style={{ height: '100%', width: '100%' }} className="ag-theme-alpine-dark">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          getRowStyle={getRowStyle}
          pinnedTopRowData={[inputRow]}
          onGridReady={onGridReady}
          onCellEditingStopped={onCellEditingStopped}
          enableCellChangeFlash={true}
          onCellValueChanged={onCellValueChanged}
        ></AgGridReact>
      </div>
    </div>
  );

};

export default OverallProfit;
