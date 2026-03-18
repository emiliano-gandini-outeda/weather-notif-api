import fastify from "./app.js"

const start = async (): Promise<void> => {
  try {
	await fastify.listen({ port: 3000 })
	const address = fastify.server.address()
	const port = typeof address === "string" ? address : address?.port
	fastify.log.info(`Server is running at http://localhost:${port}`)
  } catch (err) {
	fastify.log.error(err)
	process.exit(1)
  }
}

start()