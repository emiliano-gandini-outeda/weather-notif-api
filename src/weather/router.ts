import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import weatherData from "../services/openmeteo.js"

const fastify: FastifyInstance = Fastify(
  {
  logger: true
  }
)

// Get weather data with openmeteo


fastify.get("/weather-day", async (request: FastifyRequest, reply : FastifyReply) => {
return {
    real_temp_min : weatherData.daily.temperature_2m_min[0], 
    real_temp_max : weatherData.daily.temperature_2m_max[0],
    real_feel_min : weatherData.daily.apparent_temperature_min[0],
    real_feel_max : weatherData.daily.apparent_temperature_max[0],
    uv_index_max : weatherData.daily.uv_index_max[0],
    precipitation_sum : weatherData.daily.precipitation_sum[0],
    precipitation_hours : weatherData.daily.precipitation_hours[0],
    precipitation_probability_max : weatherData.daily.precipitation_probability_max[0]
  }  
})

fastify.get("/weather-week", async (request: FastifyRequest, reply : FastifyReply) => {
return {
    real_temp_min : weatherData.daily.temperature_2m_min, 
    real_temp_max : weatherData.daily.temperature_2m_max,
    real_feel_min : weatherData.daily.apparent_temperature_min,
    real_feel_max : weatherData.daily.apparent_temperature_max,
    uv_index_max : weatherData.daily.uv_index_max,
    precipitation_sum : weatherData.daily.precipitation_sum,
    precipitation_hours : weatherData.daily.precipitation_hours,
    precipitation_probability_max : weatherData.daily.precipitation_probability_max
  }  
})

export default fastify