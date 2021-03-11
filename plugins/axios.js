export default function ({ $axios }) {
  $axios.onResponse(response => {
    return response.data?.message ?? response.data;
  })
}
