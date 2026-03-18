import Fastify, { FastifyInstance } from "fastify"
import weatherRouter from "./weather/router.js"

const fastify: FastifyInstance = Fastify(
  {
  logger: true
  }
)

await fastify.register(weatherRouter, {prefix : "/weather"})

export default fastify