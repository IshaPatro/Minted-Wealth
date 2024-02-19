import React, { useState, useEffect } from "react";
import { Navigation } from "./navigationBar";
import { NetWorthSummary } from "./netWorthSummary";
import { assetsData, liabilitiesData } from '../data/stockData';

const NetWorth = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  const [assets, setAssets] = useState([...assetsData]);
  const [liabilities, setLiabilities] = useState([...liabilitiesData]);
  const len = 10;
  const years = Array.from({ length: len }, (_, i) => new Date().getFullYear() + i);
  const [netWorthData, setNetWorthData] = useState([{years: years, totalAssets: new Array(len).fill(0), totalLiabilities: new Array(len).fill(0), totalNetWorth: new Array(len).fill(0)}]);

  const assetTypes = [
    "Real Estate",
    "Equities (Stocks)",
    "Fixed Deposits (FDs)",
    "Mutual Funds",
    "Gold and Precious Metals",
    "Provident Fund (PF)",
    "Public Provident Fund (PPF)",
    "National Pension System (NPS)",
    "Bonds and Debentures",
    "Savings Accounts"
  ];

  const liabilityTypes = [
    "Home Mortgage",
    "Auto Loan",
    "Student Loan",
    "Credit Card Debt",
    "Personal Loan",
    "Medical Debt",
    "Other Loans"
  ];

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    background: "black",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  };

  const inputStyle = {
    background: "black",
    color: "grey",
    border: "1px solid grey",
    borderRadius: "5px",
    padding: "5px",
    margin: "0 10px",
  };

  const selectStyle = {
    width: "180px",
  };

  const labelStyle = {
    color: "grey",
  };

  const calculateCurrentValue = (index, isAsset) => {
    if (isAsset) {
      const updatedAssets = [...assets];
      const asset = updatedAssets[index];
      asset.currentValue = calculateAssetsCurrentValue(asset.amount, asset.cagr, asset.year, getCurrentYear())
      asset.currentValue = parseInt(asset.currentValue);
      setAssets(updatedAssets);
    } else {
      const updatedLiabilities = [...liabilities];
      const liability = updatedLiabilities[index];
      liability.currentValue = parseInt(calculateLiabilitiesCurrentValue(liability.amount, liability.interestRate, liability.monthlyInstallement, liability.year, liability.tenure, getCurrentYear()));
      setLiabilities(updatedLiabilities);
    }
  };

  const calculateAssetsCurrentValue = (principal, interestRate, year, calculatedYear) => {
    return (principal * Math.pow(1 + interestRate / 100, calculatedYear - year)).toFixed(2);
  };

  const calculateLiabilitiesCurrentValue = (principal, interestRate, monthlyPayment, year, tenure, calculatedYear) => {
    if(year - calculatedYear > tenure){
        return 0;
    } else if ( year > calculatedYear){
        return principal;
    } else {
        const totalAmountToBePaid = principal * ( 1 + (interestRate / 100)* tenure);
        const amountAlreadyPaid = (calculatedYear - year) * 12 * monthlyPayment;
        const balAmt = totalAmountToBePaid - amountAlreadyPaid;
        if( Math.abs(amountAlreadyPaid) < totalAmountToBePaid)
            return balAmt.toFixed(2);
        else
            return 0;
    }
  };

  useEffect(()=>{calculateProjectedNetWorth(assets,liabilities)},[assets,liabilities]);

  const calculateProjectedNetWorth = (assets, liabilities) => {
    const totalNetWorth = [];
    const totalAssets = [];
    const totalLiabilities = [];
    years.forEach((year) => {
      const calculatedYear = new Date().getFullYear();
      const totalAsset = assets.reduce((total, asset) => total + parseFloat(calculateAssetsCurrentValue(asset.amount, asset.cagr, asset.year, year)), 0);
      const totalLiability = liabilities.reduce((total, liability) => total + parseFloat(calculateLiabilitiesCurrentValue(liability.amount, liability.interestRate, liability.monthlyInstallement, liability.year, liability.tenure, year)), 0);
      totalAssets.push(totalAsset.toFixed(2));
      totalLiabilities.push(totalLiability.toFixed(2));
      totalNetWorth.push((totalAsset - totalLiability).toFixed(2));
    });
    setNetWorthData([{years: years, totalAssets: totalAssets, totalLiabilities: totalLiabilities, totalNetWorth: totalNetWorth}]);
    return netWorthData;
  };

  const handleAddAsset = () => {
    setAssets([...assets, { type: "", amount: 0, cagr: 0, year: getCurrentYear(), currentValue: 0 }]);
  };

  const handleAddLiability = () => {
    setLiabilities([...liabilities, { type: "", amount: 0, interestRate: 0, tenure:0, monthlyInstallement : 0, year: getCurrentYear(), currentValue: 0 }]);
  };

  const handleRemoveAsset = (index) => {
    const updatedAssets = [...assets];
    updatedAssets.splice(index, 1);
    setAssets(updatedAssets);
  };

  const handleRemoveLiability = (index) => {
    const updatedLiabilities = [...liabilities];
    updatedLiabilities.splice(index, 1);
    setLiabilities(updatedLiabilities);
  };

  const handleAssetTypeChange = (index, selectedType) => {
    const updatedAssets = [...assets];
    updatedAssets[index].type = selectedType;
    calculateCurrentValue(index, true);
    setAssets(updatedAssets);
  };

  const handleLiabilityTypeChange = (index, selectedType) => {
    const updatedLiabilities = [...liabilities];
    updatedLiabilities[index].type = selectedType;
    calculateCurrentValue(index, false);
    setLiabilities(updatedLiabilities);
  };

  useEffect(() => {
    assets.forEach((asset, index) => calculateCurrentValue(index, true));
    liabilities.forEach((liability, index) => calculateCurrentValue(index, false));
    calculateProjectedNetWorth(assets, liabilities);
  }, []);

  const handleInputChange = (index, key, value, isAsset) => {
    if (isAsset) {
      const updatedAssets = [...assets];
      updatedAssets[index][key] = value;
      calculateCurrentValue(index, true);
      setAssets(updatedAssets);
    } else {
      const updatedLiabilities = [...liabilities];
      updatedLiabilities[index][key] = value;
      calculateCurrentValue(index, false);
      setLiabilities(updatedLiabilities);
    }
  };

  return (
    <div>
      <Navigation />

      <div>
        <br /><br /><br /><br /><br /><br />
        <NetWorthSummary assets={assets} liabilities={liabilities} netWorthData={netWorthData}/>
        <br /><br />
        <button onClick={handleAddAsset} style={inputStyle}>Add Asset</button>
        <button onClick={handleAddLiability} style={inputStyle}>Add Liability</button>

        {assets.map((asset, index) => (
          <div key={index} style={containerStyle}>
            <div>
              <label style={labelStyle}>Type of Asset:</label>
              <select
                value={asset.type}
                onChange={(e) => handleAssetTypeChange(index, e.target.value)}
                style={{ ...inputStyle, ...selectStyle }}
              >
                <option value="" disabled>Select Asset Type</option>
                {assetTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Amount Invested:</label>
              <input
                type="number"
                placeholder="Amount Invested"
                value={asset.amount}
                onChange={(e) => handleInputChange(index, 'amount', e.target.value, true)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>CAGR:</label>
              <input
                type="number"
                placeholder="CAGR"
                value={asset.cagr}
                onChange={(e) => handleInputChange(index, 'cagr', e.target.value, true)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Year of Purchase:</label>
              <input
                type="number"
                placeholder="Year of Purchase"
                value={asset.year}
                onChange={(e) => handleInputChange(index, 'year', e.target.value, true)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Current Value:</label>
              <input
                type="number"
                placeholder="Current Value"
                value={asset.currentValue}
                onChange={(e) => handleInputChange(index, 'currentValue', e.target.value, true)}
                style={inputStyle}
                readOnly
              />
            </div>

            <div>
              <button  style={inputStyle} onClick={() => handleRemoveAsset(index)}>Remove</button>
            </div>
          </div>
        ))}

        {liabilities.map((liability, index) => (
          <div key={index} style={containerStyle}>
            <div>
              <label style={labelStyle}>Type of Liability:</label>
              <select
                value={liability.type}
                onChange={(e) => handleLiabilityTypeChange(index, e.target.value)}
                style={{ ...inputStyle, ...selectStyle }}
              >
                <option value="" disabled>Select Liability Type</option>
                {liabilityTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Amount Owed:</label>
              <input
                type="number"
                placeholder="Amount Owed"
                value={liability.amount}
                onChange={(e) => handleInputChange(index, 'amount', e.target.value, false)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Interest Rate:</label>
              <input
                type="number"
                placeholder="Interest Rate"
                value={liability.interestRate}
                onChange={(e) => handleInputChange(index, 'interestRate', e.target.value, false)}
                style={inputStyle}
              />
            </div>

            <div>
		      <label style={labelStyle}>Tenure:</label>
		      <input
		        type="number"
		        placeholder="Tenure"
		        value={liability.tenure}
		        onChange={(e) => handleInputChange(index, 'tenure', e.target.value, false)}
		        style={inputStyle}
		      />
		    </div>

            <div>
              <label style={labelStyle}>Monthly Installement:</label>
              <input
                type="number"
                placeholder="Monthly Installement"
                value={liability.monthlyInstallement}
                onChange={(e) => handleInputChange(index, 'monthlyInstallement', e.target.value, false)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Year of Purchase:</label>
              <input
                type="number"
                placeholder="Year of Purchase"
                value={liability.year}
                onChange={(e) => handleInputChange(index, 'year', e.target.value, false)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Balance Amount:</label>
              <input
                type="number"
                placeholder="Balance Amount"
                value={liability.currentValue}
                onChange={(e) => handleInputChange(index, 'currentValue', e.target.value, false)}
                style={inputStyle}
                readOnly
              />
            </div>

            <div>
              <button style={inputStyle} onClick={() => handleRemoveLiability(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default NetWorth;
