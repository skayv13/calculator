import React, { useEffect, useState } from 'react';
import { getLatestRates } from '../apis/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

const ExchangeRates = () => {
    const [rates, setRates] = useState();
    const [baseRates, setBaseRates] = useState('IDR');
    const [nextBaseRates, setNextBaseRates] = useState('IDR');
    const [value, setValue] = useState(1);
    const [currency] = useState([{ value: 'CAD', label: 'CAD' }, { value: 'CHF', label: 'CHF' }, { value: 'EUR', label: 'EUR' }, { value: 'IDR', label: 'IDR' }, { value: 'JPY', label: 'JPY' }, { value: 'USD', label: 'USD' }])

    const handleGetLatestRates = (val, nextCurrency) => {
        if (nextCurrency) {
            setBaseRates(nextCurrency)
            getLatestRates(val, nextCurrency)
                .then(data => {
                    const currencyInterestRate = 0.005;
                    let arr = [];
                    let keynya = Object.keys(data.rates);
                    let values = Object.values(data.rates);
                    console.log(keynya);
                    console.log(values);
                    keynya.forEach((element, indexKey) => {
                        values.forEach((value, indexVal) => {
                            if (indexKey === indexVal) {
                                arr.push({ currency: element, rates: value, sell: (value + (value * currencyInterestRate)), buy: (value - (value * currencyInterestRate)) });
                            }
                        });
                    });
                    setBaseRates(data.base)
                    setRates(arr)
                })
                .catch(error => console.log(error))
        } else {
            getLatestRates(value, baseRates)
                .then(data => {
                    const currencyInterestRate = 0.005;
                    let arr = [];
                    let keynya = Object.keys(data.rates);
                    let values = Object.values(data.rates);
                    console.log(keynya);
                    console.log(values);
                    keynya.forEach((element, indexKey) => {
                        values.forEach((value, indexVal) => {
                            if (indexKey === indexVal) {
                                arr.push({ currency: element, rates: value, sell: (value + (value * currencyInterestRate)), buy: (value - (value * currencyInterestRate)) });
                            }
                        });
                    });
                    setBaseRates(data.base)
                    setRates(arr)
                })
                .catch(error => console.log(error))
        }

    }

    useEffect(() => {
        handleGetLatestRates()
    }, [])// eslint-disable-line

    useEffect(() => {
        console.log('value', value);
        console.log('nextBaseRates', nextBaseRates);
    }, [value, nextBaseRates])// eslint-disable-line

    function rounded6(x) {
        return Number.parseFloat(x).toFixed(6);
    }

    console.log(rates);
    return (
        <div className="app">
            <FontAwesomeIcon className='icon' style={{ fontSize: '50px', margin: '0 10px 0 0', }} icon={faMoneyBill} />
            <FontAwesomeIcon className='icon' style={{ fontSize: '50px', margin: '0 10px', }} icon={faExchangeAlt} />
            <FontAwesomeIcon className='icon' style={{ fontSize: '50px', margin: '0 10px', }} icon={faMoneyBill} />
            <div className='title'>Exchange Rates</div>
            <div className='subtitle'>Exchange rates at competitive prices</div>
            <hr />
            <div className='subtitle-small row'><div className='col'>Base Currency: {baseRates}</div></div>
            <div className='row mb-3'>
                <input className='col-3 ml-3 input' placeholder='1' onChange={e => setValue(e.target.value)} />
                <Select className='col-3' onChange={val => setNextBaseRates(val.value)} options={currency} defaultValue={currency[3]} />
                <button className='col-3 button' onClick={() => handleGetLatestRates(value, nextBaseRates)}>Calculate</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ borderColor: 'black' }} scope="col">Currency</th>
                        <th style={{ borderColor: 'black' }} scope="col">Rates</th>
                        <th style={{ borderColor: 'black' }} scope="col">Sell</th>
                        <th style={{ borderColor: 'black' }} scope="col">Buy</th>
                    </tr>
                </thead>
                <tbody>
                    {rates && rates.map((data, index) => (
                        <tr key={index}>
                            <th style={{ borderColor: 'black' }} >{data.currency}</th>
                            <td style={{ borderColor: 'black' }} >{rounded6(data.rates)}</td>
                            <td style={{ borderColor: 'black' }} >{rounded6(data.sell)}</td>
                            <td style={{ borderColor: 'black' }} >{rounded6(data.buy)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ExchangeRates;
