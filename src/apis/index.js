import axios from 'axios';

export const getLatestRates = (value, baseRates) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `https://api.exchangerate.host/latest?base=${baseRates}&symbols=IDR,CAD,JPY,CHF,EUR,USD&amount=${value}`,
            timeout: 1000 * 10, // Wait for 10 seconds
        })
            .then(function (response) {
                if (response.data.success) {
                    resolve(response.data)
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
};