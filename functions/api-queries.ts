import axios from 'axios'

export const getPoolAddress = async (): Promise<string> => {
  try {
    const response = await axios.get(`/api/poolAddress`)

    if (!(response && response.data)) return ""

    return response.data.address
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return "";
}

export const rolling = async (): Promise<any> => {
  try {
    const response = await axios.get(`/api/rolling`)

    if (!(response && response.data)) return null

    return response.data.item
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return null;
}

export const getCredit = async (wallet: string): Promise<number> => {
  try {
    const response = await axios.post(`/api/core/user/credit`, { wallet }, {withCredentials: true})

    if (!(response && response.data)) return 0;

    return response.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return 0;
}

export const getDepositAddress = async (wallet: string): Promise<string> => {
  try {
    const response = await axios.post(`/api/core/user/depositAddress`, { wallet }, {withCredentials: true})

    if (!(response && response.data)) return ""

    return response.data.address
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return "";
}
export const createNonce = async (wallet: string): Promise<string> => {
  try {
    const response = await axios.post(`/api/core/nonce/create`, { wallet }, {withCredentials: true})

    if (!(response && response.data)) return ""

    return response.data.nonce
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return "";
}

export const authorizeUser = async (data: any): Promise<number> => {
  try {
    const response = await axios.post(`/api/core/user/authorize`, data, {withCredentials: true})

    return response.status
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return -1;
}

export const depositCredit = async (wallet: string, amount: number, nonce: string, isBonk: boolean = false): Promise<string> => {
  try {
    const response = await axios.post(`/api/core/credit/deposit`, {wallet,amount,nonce,isBonk}, {withCredentials: true})
    return response.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return "failed";
}

export const withdrawCredit = async (wallet: string, amount: number, nonce: string, isBonk: boolean = false): Promise<string> => {
  try {
    const response = await axios.post(`/api/core/credit/withdraw`, {wallet,amount,nonce,isBonk}, {withCredentials: true})
    return response.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return "failed";
}


export const play = async (body: any): Promise<any> => {
  try {
    const response = await axios.post(`/api/play`, body , {withCredentials: true})
    return response.data.result
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return null;
}
