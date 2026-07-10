import { contextBridge, ipcRenderer } from 'electron'
import handlers from '../main/handlers'

const toCamelCase = (channel) => channel.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())

const api = Object.fromEntries(
  Object.keys(handlers).map((channel) => [
    toCamelCase(channel),
    (...args) => ipcRenderer.invoke(channel, ...args)
  ])
)

contextBridge.exposeInMainWorld('api', api)
