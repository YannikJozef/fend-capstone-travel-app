//async function to get data from open weather api
const getCity = async (baseURL, city, key) => {
    console.log(baseURL + city + key);
    const res = await fetch(baseURL + city + key);
    try {
        const data = await res.json();
        console.log(data);
        if (data.totalResultsCount !== 0) {
        return data } else { Client.noNameFound() }
    } catch (error) {
        console.log('Error', error);
        // appropriately handle the error
    }
}

export {
    getCity
}