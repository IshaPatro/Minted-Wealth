import React, { useEffect, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Navigation } from "./navigationBar";
import { ClipLoader } from 'react-spinners';

const filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    const dateAsString = cellValue;
    const dateParts = dateAsString.split('/');
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
};

const StockMarketNavigator = () => {
  const gridStyle = { height: '85%', width: '100%', marginTop: '7%' };
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ColourCellRenderer = props => {
    if (props.value >= 0) {
      return <span style={{ color: '#008000' }}>{props.value}</span>;
    } else {
      return <span style={{ color: '#FF0000' }}>{props.value}</span>;
    }
  }

  const ColourCellRendererPercentage = props => {
    if (props.value >= 0) {
        return <span style={{ color: '#008000' }}>{props.value}%</span>;
    } else {
        return <span style={{ color: '#FF0000' }}>{props.value}%</span>;
    }
  }

  const formatPercentage = (params) => {
    return params.value != null ? params.value+'%' : '';
  };

  const [columnDefs] = useState([
    { field: 'Symbol', minWidth: 150 },
    { field: 'Company Name', minWidth: 300, pinned: 'left' },
    { field: 'Price', minWidth: 100 },
    { field: 'Change', minWidth: 150, cellRenderer: ColourCellRenderer },
    { field: 'Change%', minWidth: 150, cellRenderer: ColourCellRendererPercentage },
    { field: 'Open', minWidth: 100 },
    { field: 'Prev Close', minWidth: 150 },
    { field: 'Day High', minWidth: 150 },
    { field: 'Day Low', minWidth: 150 },
    { field: '52 Week High', minWidth: 150 },
    { field: '52 Week Low', minWidth: 150 },
    { field: 'PE Ratio', minWidth: 150 },
    { field: 'EPS', minWidth: 150 },
    { field: 'Market Cap', minWidth: 150 },
    { field: 'Volume', minWidth: 150 },
    { field: 'T-7', minWidth: 150},
    { field: 'T-30', minWidth: 150},
    { field: 'T-1Year', minWidth: 150},
    { field: '1Day Return%', minWidth: 150, cellRenderer: ColourCellRendererPercentage},
    { field: '1Week Return%', minWidth: 180, cellRenderer: ColourCellRendererPercentage},
    { field: '1Month Return%', minWidth: 180, cellRenderer: ColourCellRendererPercentage},
    { field: '1Year Return%', minWidth: 180, cellRenderer: ColourCellRendererPercentage},
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sheetdb.io/api/v1/by0ej0n2jv4rf?ignore_cache=1');
        const data = await response.json();
        setRowData(data);
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);  // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  const defaultColDef = {
    editable: false,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  const onGridReady = useCallback((params) => {
    fetch('https://sheetdb.io/api/v1/by0ej0n2jv4rf?ignore_cache=1')
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
        setLoading(false);  // Set loading to false after data is fetched
      });
  }, []);

  return (
    <div>
      <Navigation />
      {loading ? (
        // Show loader while data is being fetched
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ClipLoader color="#00BFFF" loading={loading} size={80} />
        </div>
      ) : (
        // Show the grid once data is fetched
        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          />
        </div>
      )}
    </div>
  );
};

export default StockMarketNavigator;
