import axios from 'axios';

interface IpAddress {
  ip: string;
}

export const getClientIpAddress = async (): Promise<string | never> => {
  try {
    const response = await axios.get<IpAddress>('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.dir(error);
    throw new Error('failed to get client ip address')
  }
};
