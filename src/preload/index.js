import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS } from '../shared/ipcChannels'

const toCamelCase = (channel) => channel.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())

const api = Object.fromEntries(
  IPC_CHANNELS.map((channel) => [
    toCamelCase(channel),
    (...args) => ipcRenderer.invoke(channel, ...args)
  ])
)

contextBridge.exposeInMainWorld('api', api)
