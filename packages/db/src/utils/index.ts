import crypto from 'crypto-js'

export const randomKey = (length = 8) => crypto.lib.WordArray.random(length).toString(crypto.enc.Hex)