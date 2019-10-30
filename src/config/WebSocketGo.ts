import BaseWebSocket from 'ws'
import { Server } from 'http'
import { verifyToken } from '@/utils/jwt'
import Token from '@/interfaces/Token'
import logger from '@/utils/logger'
import EquipmentModel from '@/models/Equipment'
import UserModel from '@/models/User'

class WebSocket extends BaseWebSocket {
  userId?: string
  owners?: string[]
}

const WebSocketServer = WebSocket.Server

let wss: BaseWebSocket.Server

const onMessage = (ws: WebSocket) => async (data: BaseWebSocket.Data) => {
  sendMessage(ws.owners, data)
}

const onClose = () => {
  console.log('onClose')
}

const onError = (err: Error) => {
  logger.error(err)
}

const sendMessage = (userIds: string[] = [], data: BaseWebSocket.Data) => {
  wss.clients.forEach((ws: WebSocket) => {
    if (ws.userId && userIds.includes(ws.userId)) {
      ws.send(data)
    }
  })
}

const checkToken = async (token: string) => {
  let result: any = await verifyToken(token)
  let tokenData: Token = result.data
  if (tokenData && tokenData.userId) {
    return tokenData
  }
  return null
}

const onConnection = async (ws: WebSocket) => {
  console.log(onConnection, ws)
  const token = await checkToken(ws.protocol)
  if (token) {
    ws.userId = token.userId
    const user = await UserModel.findOne({ _id: token.userId })
    if (user && user.eqId) {
      const eqModel = await EquipmentModel.findOne({ eqId: user.eqId })
      if (eqModel && eqModel.owner) {
        ws.owners = eqModel.owner
      }
    }
    ws.on('message', onMessage(ws))
    ws.on('close', onClose)
    ws.on('error', onError)
  }
}

function connectSocket(server: Server) {
  wss = new WebSocketServer({ server })
  wss.on('connection', onConnection)
}

export default connectSocket
