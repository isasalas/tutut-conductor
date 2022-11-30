import io from 'socket.io-client'
import { urlSocket } from '../utils/apiData'

let socket = io(urlSocket)

export default socket