import got from 'got';

const ipStack = {
    uri: 'http://api.ipstack.com',
    access_key: '349774d9f79a2120f98efb71a191eb29'
}

export default async function ipStackCall(ip) {
    const ipStackApiUrl = `${ipStack.uri}/${ip}?access_key=${ipStack.access_key}`;
    const ipStackResponse = await got(ipStackApiUrl);
    return ipStackResponse;
}
