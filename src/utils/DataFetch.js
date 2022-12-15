import axios from 'axios';
const dataFetch = async (url, setContent) => {
    const rsp = await axios
        .get(url)
        .then((res) => res.data)
        .then((data) => {
            return data;
        });
    setContent(rsp);
};

export { dataFetch };
