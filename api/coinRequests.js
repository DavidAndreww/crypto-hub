export const getAllCoins = async() => {
  const response = await fetch('https://api.livecoinwatch.com/coins/list', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY
    },
    body: JSON.stringify({
      currency: 'USD',
      sort: 'rank',
      order: 'ascending',
      meta: true
    })
  })

  const json = await response.json()
  return json
}

export const getSingleCoin = async (coinCode) => {
  const response = await fetch("https://api.livecoinwatch.com/coins/single", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
    body: JSON.stringify({
      currency: "USD",
      code: coinCode,
      meta: true,
    }),
  });

  const json = await response.json()
  return json
}

export const getSingleCoinHistory = async (coinCode) => {
  const response = await fetch("https://api.livecoinwatch.com/coins/single/history", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
    body: JSON.stringify({
      currency: "USD",
      code: coinCode,
      start: 1617035100000,
      end: 1617035400000,
      meta: true,
    }),
  });

  const json = await response.json()
  return json
}

