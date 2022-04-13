import { useMeta } from 'vue-meta'


const setMeta = (params:{
  title?:string,
  description?:string,
  keywords?:string,
  path:string,
} = {
  path:''
}) => {
  useMeta({
    title: params.title,
    meta: [
      {vmid: 'description', name: 'description', content: params.description},
      {vmid: 'keywords', name: 'keywords', content: params.keywords},
      {vmid: 'og:title', name: 'og:title', content: params.title},
      {vmid: 'og:description', name: 'og:description', content: params.description},
      {vmid: 'og:url', name: 'og:url', content: process.env.VUE_APP_BASE_URL + params.path}
    ]
  })
}

export default setMeta;