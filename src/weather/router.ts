import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

import fastify from "../app.js"
import weatherData from "../services/openmeteo.js"


export default async function weatherRouter(fastify: FastifyInstance) {
  fastify.get("/get-day", async () => {
    return {
      real_temp_min: weatherData.daily.temperature_2m_min[0],
      real_temp_max: weatherData.daily.temperature_2m_max[0],
      real_feel_min: weatherData.daily.apparent_temperature_min[0],
      real_feel_max: weatherData.daily.apparent_temperature_max[0],
      uv_index_max: weatherData.daily.uv_index_max[0],
      precipitation_sum: weatherData.daily.precipitation_sum[0],
      precipitation_hours: weatherData.daily.precipitation_hours[0],
      precipitation_probability_max: weatherData.daily.precipitation_probability_max[0]
    }
  })

  fastify.get("/get-week", async () => {
    return {
      real_temp_min: weatherData.daily.temperature_2m_min,
      real_temp_max: weatherData.daily.temperature_2m_max,
      real_feel_min: weatherData.daily.apparent_temperature_min,
      real_feel_max: weatherData.daily.apparent_temperature_max,
      uv_index_max: weatherData.daily.uv_index_max,
      precipitation_sum: weatherData.daily.precipitation_sum,
      precipitation_hours: weatherData.daily.precipitation_hours,
      precipitation_probability_max: weatherData.daily.precipitation_probability_max
    }
  })
}

