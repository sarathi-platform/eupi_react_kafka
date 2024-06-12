import axios from 'axios'
import { API_PATH } from '../components/config/path'
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPMkFkal9oTm5aQ0wwLVV6VlVwQ3pqNWhsR2hjYy1ZdzRZZ1d3VVExZHl3In0.eyJleHAiOjE3MTgwOTI4MDMsImlhdCI6MTcxODA5MjUwMywianRpIjoiY2M0ODFmMTktYTJjYi00OTNmLTkyMzItZjhlODliY2Y0Zjk2IiwiaXNzIjoiaHR0cDovLzEwLjE1NC4zMi4xMDo4MDgwL3JlYWxtcy9xYV9ldXBpIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImY6NWY5YjY4NDktNjNiYy00ZDg0LWI5OWQtMDE2ZWE2ZjE0OTFhOmNoYW5kcmEuODk1OTg0NDg2NUBnbWFpbC5jb20iLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJxYV9ldXBpIiwic2Vzc2lvbl9zdGF0ZSI6IjE1ZDMzNGVlLTI0ODctNDJhMy04ZTM4LTVmODVkNWU0MzRjMyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIxNWQzMzRlZS0yNDg3LTQyYTMtOGUzOC01Zjg1ZDVlNDM0YzMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInVzZXJfaWQiOiI2NjUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI4OTU5ODQ0ODY1IiwiZW1haWwiOiJjaGFuZHJhLjg5NTk4NDQ4NjVAZ21haWwuY29tIn0.KxTMhk7MjUvPdms6zkZLIXyQaFec_6Zy_fW_ktwu2AEAAMy0k6UnEqkdgyJ5GBKRiu_2sUkvdtdniGUZz-jO3QwvvgfQS4nCvERV-uuRXJS-McX9kTkKvzV1BEBE-C44RbgA8FIXCRVj3IqNGgf0SrgiHnQIgxZYthFPTZzx8Wp3WYkNfp6EA1BitYtxnWhtlMQQRqniSdUVuKZ12YQl0BK0QZk1SgV_LeykjOR9x7_IPX3912hwUgM2hieLKtu5-x_1aUpKkRZUVuao0AZMC4aYLXzv2KVDMgU-TZ5kGVcgCQE4Jzqso7tCTeMBRWsHnxAZ4DZgWtvRTA4caaiRFQ'

export default function ApiService(config) {
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   }
  config.url = `${API_PATH.development.API_ROOT}/${config.url}`
//   config.headers = headers
  return axios(config)
    .then(function (_response) {
      return new Promise((resolve) => {
        return resolve(_response.data)
      })
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        if (err && err.response && err.response.status >= 400 && err.response.status < 500) {
          return reject(err.response.data)
        }
        return reject(err)
      })
    })
}
