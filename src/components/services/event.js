import ApiService from "../../utils/api-service"

export function fetchEventJobData(data) {
  const options = {
    method: 'POST',
    url: 'sync-server/sync/getEventsByStatus',
    data: data,
  }
  return ApiService(options)
}
export function fetchChangedEventData(data) {
    const options = {
      method: 'POST',
      url: 'sync-server/sync/events',
      data: data,
    }
    return ApiService(options)
  }